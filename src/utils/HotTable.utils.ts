// This file is a bit messy. It's being converted over from JS.
// Handsontable isn't built for TS and that makes some otherwise simple functions difficult.

import type { TableRecord } from '@/types';
import type Handsontable from 'handsontable';
import type { Selection } from 'handsontable/plugins/contextMenu';
import type { ColumnSettings } from 'handsontable/settings';
import { capitalizeCell, lowercaseCell, removeFirstChar, removeLastChar, removeLetters, removeNumbers, removeSymbols } from './QuickEditor';

/**
 * Returns the default table options for creating the label tables.
 *
 * @returns {Handsontable.GridSettings}
 */
// These will be the default settings going forward for any new tables.
function getDefaultTableSettings(): Handsontable.GridSettings {
  return {
    duplicateColumn: undefined,
    rowHeaders: false,
    height: '100%',
    width: 'auto',
    minSpareRows: 1,
    comments: {
      displayDelay: 250,
    },
    contextMenu: {
      items: {
        undo: {},
        redo: {},
        sp1: {
          name: '---------',
        },
        row_above: {},
        row_below: {},
        sp2: {
          name: '---------',
        },
        remove_row: {},
        alignment: {},
        sp3: {
          name: '---------',
        },
        quickEdits: {
          name: 'Quick Editor',
          key: 'openQuickEdits',
          submenu: {
            items: [
              {
                name: 'Remove Special Characters',
                key: 'openQuickEdits:remove_symbols',
                callback(key, selection, e) {
                  massEdit(this, selection, removeSymbols);
                },
              },
              {
                name: 'Remove Letters',
                key: 'openQuickEdits:remove_letters',
                callback(key, selection, e) {
                  massEdit(this, selection, removeLetters);
                },
              },
              {
                name: 'Remove Numbers',
                key: 'openQuickEdits:remove_numbers',
                callback(key, selection, e) {
                  massEdit(this, selection, removeNumbers);
                },
              },
              {
                name: 'Remove First Character',
                key: 'openQuickEdits:remove_first_character',
                callback(key, selection, e) {
                  massEdit(this, selection, removeFirstChar);
                },
              },
              {
                name: 'Remove Last Character',
                key: 'openQuickEdits:remove_last_character',
                callback(key, selection, e) {
                  massEdit(this, selection, removeLastChar);
                },
              },
              {
                name: 'Capitalize',
                key: 'openQuickEdits:capitalize',
                callback(key, selection, e) {
                  massEdit(this, selection, capitalizeCell);
                },
              },
              {
                name: 'Lowercase',
                key: 'openQuickEdits:lowercase',
                callback(key, selection, e) {
                  massEdit(this, selection, lowercaseCell);
                },
              },
            ],
          },
        },
        highlight_duplicates: {
          name: 'Highlight Duplicates',
          key: 'highlight_duplicates',
          callback() {
            const selected = this.getSelected();
            if (!selected) return;

            const newColumn = selected[0][1];
            const currentColumn: number | undefined = this.getSettings().duplicateColumn;

            if (currentColumn == undefined) {
              this.updateSettings({ duplicateColumn: newColumn });
              this.addHook('beforeChangeRender', duplicateHook);
              this.runHooks('beforeChangeRender', duplicateHook);
              this.render();
            } else if (currentColumn == newColumn) {
              this.removeHook('beforeChangeRender', duplicateHook);
              clearValidation.call(this, newColumn);
              this.updateSettings({ duplicateColumn: undefined });
            } else {
              clearValidation.call(this, currentColumn);
              this.updateSettings({ duplicateColumn: newColumn });
              this.runHooks('beforeChangeRender', duplicateHook);
              this.render();
            }
          },
        },
      },
    },
    customBorders: true,
    licenseKey: 'non-commercial-and-evaluation',
  };
}

function massEdit(hot: Handsontable.Core, selection: Selection[], formatter: Function) {
  hot.batchExecution(() => {
    selection.forEach((range) => {
      for (let rowIndex = range.start.row; rowIndex <= range.end.row; rowIndex += 1) {
        for (let columnIndex = range.start.col; columnIndex <= range.end.col; columnIndex += 1) {
          var cellVal = hot.getDataAtCell(rowIndex, columnIndex);
          if (!cellVal || cellVal == null || cellVal.length == 0) continue;
          cellVal = cellVal.toString();
          hot.setDataAtCell(rowIndex, columnIndex, formatter(cellVal));
        }
      }
    });
  }, false);
}

/**
 * For the given table and column, clear all validation issues.
 *
 * This needs to be called using the function.call() method or the Handsontable object will need passed manually.
 *
 * @param {Handsontable.Core} this The Handsontable object
 * @param {number} colIdx The column to clear of validation issues
 *
 * @returns {Promise<boolean>}
 */
async function clearValidation(this: Handsontable.Core, colIdx: number): Promise<boolean> {
  const colData = this.getDataAtCol(colIdx);
  colData.forEach((_val: any, rowIdx: number) => {
    const cellMeta = this.getCellMeta(rowIdx, colIdx);
    cellMeta.valid = true;
    cellMeta.comments = false;
    cellMeta.comment = {};
  });
  return true;
}

// Just a helper function to pass extra params.
function duplicateHook(this: Handsontable.Core) {
  formatDuplicates.call(this, this.getSettings().duplicateColumn);
}

/**
 * Iterates through the given column and detects any duplicate values not including null values.
 *
 * For any invalid value, mark the cell as invalid and update comment to "Duplicate value"
 *
 * @param {Handsontable.Core} this The Handsontable object
 * @param {number} colIdx The column to clear of validation issues
 *
 * @returns {void}
 */
function formatDuplicates(this: Handsontable.Core, colIdx: number): void {
  const column = this.getDataAtCol(colIdx);
  const duplicateRows = getDuplicates(column);
  duplicateRows.forEach((res, rowIdx) => {
    const cellMeta = this.getCellMeta(rowIdx, colIdx);
    if (res) {
      cellMeta.valid = false;
      cellMeta.comments = true;
      cellMeta.comment = {
        value: 'Duplicate value',
        readOnly: true,
        style: { width: 150, height: 25 },
      };
    } else {
      cellMeta.valid = true;
      cellMeta.comments = false;
      cellMeta.comment = {};
    }
  });
}

/**
 * Iterates through the passed column data and detects duplicates.
 *
 * @param {{}[]} input The column values as an array to find duplicates in
 *
 * @returns {Promise<number[]>} The returned array contains boolean values that correspond to the rows.
 */
function getDuplicates(input: {}[]): number[] {
  const filterArray = [null, undefined, ''];
  const dups = input.reduce((ac: any, a: any) => ((ac[a] = (ac[a] || 0) + 1), ac), {});
  const res = input.reduce((ac: any, a: any, i: number) => {
    if (dups[a] !== 1 && !filterArray.includes(a)) {
      ac.push(true);
    } else {
      ac.push(false);
    }
    return ac;
  }, []);
  return res;
}

/**
 * Builds column properites from the passed table record.
 *
 * @param {TableRecord} table The table that corresponds to the selected label type
 *
 * @returns {Promise<Handsontable.GridSettings>}
 */
async function buildColumns(table: TableRecord): Promise<Handsontable.GridSettings> {
  return new Promise((resolve) => {
    const colHeaders: string[] = [];
    const columns: ColumnSettings[] = [];
    const hiddenColumns = {
      columns: [] as number[],
      indicators: false,
    };

    table.columns.forEach((columnItem) => {
      colHeaders.push(columnItem.displayName || columnItem.id);
      if (Object.prototype.hasOwnProperty.call(columnItem, 'hidden')) {
        hiddenColumns.columns.push(table['columns'].findIndex((x) => x == columnItem));
      }

      columns.push({
        type: columnItem.dataType,
        data: columnItem.id,
        validator: ['Quantity', 'Serialize'].includes(colHeaders[colHeaders.length - 1]) ? maxLengthValidator : undefined
      });

      if (Object.prototype.hasOwnProperty.call(columnItem, 'source')) {
        columns[columns.length].source = columnItem.source;
      }
    });

    resolve({ colHeaders, columns, hiddenColumns });
  });
}

function maxLengthValidator(value: any, callback: Function) {
    if (isNaN(value) || value > 99999) {
      callback(false);
    } else {
      callback(true);
    }
}

function deepFlat(arr: any[], d = 1): [] {
  return d > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? deepFlat(val, d - 1) : val), [])
    : arr.slice();
}

export { getDefaultTableSettings, buildColumns, deepFlat };
