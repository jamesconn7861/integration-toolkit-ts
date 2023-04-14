interface TableRecord {
  id: string;
  displayName: string;
  notes: string | undefined;
  paths: string[];
  columns: ColumnProperties[];
}

interface ColumnProperties {
  id: string;
  displayName: string;
  dataType: string;
  source: [] | undefined;
  nullable: boolean | undefined;
  defaultValue: any | undefined;
  hidden: boolean | undefined;
}

export type { TableRecord, ColumnProperties };
