import { useStore } from '@/stores/store';
import type { LabelPayload } from '@/types';
import type Handsontable from 'handsontable';

/**
 * Retrieves users labels from the server.
 *
 * @param {string} table The table that corresponds to the selected label type
 * @param {string} user The user requesting label data
 *
 * @returns {Promise<[{}]>} Returns an array of row objects
 */
async function getUserLabels(table: string, user: string): Promise<[{}]> {
  return new Promise((resolve) => {
    useStore()
      .axiosInst.get(`/labels/${table}/${user}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        resolve([[]]);
      });
  });
}

/**
 * Uploads the table data to the SQL server.
 *
 * @param {LabelPayload} payload An object containing the payload data.
 */
async function uploadLabels(payload: LabelPayload) {
  const formattedData = await prepareLabels(payload);

  useStore()
    .axiosInst.post('/labels/upload', formattedData)
    .then(() => {
      useStore().showTempMsg({ msg: 'Labels uploaded.', closeTime: 5000 });
    })
    .catch(() => {
      useStore().showTempMsg({
        msg: 'Unable to upload data. Please try again later.',
        closeTime: 5000,
      });
    });
}

/**
 * Removes trailing empty rows and adds current user to the username column.
 *
 * @param {LabelPayload} payload An object containing the payload data.
 *
 * @returns {Promise<string>} A json string of the complete payload.
 */
async function prepareLabels(payload: LabelPayload): Promise<{}> {
  // Remove trailing empty rows.
  while (
    payload.rows[payload.rows.length - 1].every((d) => {
      return d === null;
    })
  ) {
    payload.rows.pop();
  }

  const usernameCol = payload.columns.findIndex((column) => column == 'username');
  payload.rows.forEach((row) => (row[usernameCol] = payload.user));

  return payload;
}

export { getUserLabels, uploadLabels };
