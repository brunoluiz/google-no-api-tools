import axios from "axios";
import { parse } from "csv-parse/sync";

/**
 * Convert a public Google Sheets into a CSV Payload
 *
 * @remarks
 * The Google Sheet needs to be public
 *
 * @param id - The Google Sheet ID in https://docs.google.com/spreadsheets/d/${id}
 * @returns Converted sheet into CSV
 */
export const csvFromSheetURL = async (id: string) => {
  const res = await axios.get(
    `https://docs.google.com/spreadsheets/d/${id}/gviz/tq`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
      },
      params: {
        tqx: "out:csv",
      },
    }
  );

  return res.data;
};

/**
 * Convert a public Google Sheets into a JSON Payload
 *
 * @remarks
 * The Google Sheet needs to be public
 *
 * @param id - The Google Sheet ID in https://docs.google.com/spreadsheets/d/${id}
 * @returns Converted sheet into JSON
 */
export const jsonFromSheetURL = async (id: string) => {
  const csv = await csvFromSheetURL(id);

  // This could be done in stream or something similar, but it can be refactored later on
  const output = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }).map((l: any) => {
    Object.keys(l).forEach((k) => {
      if (l[k] === "TRUE") l[k] = true;
      if (l[k] === "FALSE") l[k] = false;
      return l;
    });

    return l;
  });

  return output;
};
