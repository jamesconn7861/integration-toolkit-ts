import { useStore } from '@/stores/store';
import type { LabelPayload } from '@/types';

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
    .axiosInst.post(import.meta.env.VITE_API_LABELS_POST_ROUTE, formattedData)
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
 * Removes empty rows and adds current user to the username column.
 *
 * @param {LabelPayload} payload An object containing the payload data.
 *
 * @returns {Promise<string>} A json string of the complete payload.
 */
async function prepareLabels(payload: LabelPayload): Promise<{}> {
  // Remove empty rows.
  let x = 0;
  while (x <= payload.rows.length - 1) {
    const tempRow = payload.rows[x];
    tempRow.pop();
    if (tempRow.every((cell) => { return !cell })) {
      payload.rows.splice(x, 1);
    } else {
      x++;
    }
  }

  const usernameCol = payload.columns.findIndex((column) => column == 'username');
  payload.rows.forEach((row) => (row[usernameCol] = payload.user));

  return payload;
}

export { getUserLabels, uploadLabels };
