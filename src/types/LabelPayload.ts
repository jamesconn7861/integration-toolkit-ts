export interface LabelPayload {
  user: string;
  table: string;
  columns: string[];
  rows: [string[]];
}
