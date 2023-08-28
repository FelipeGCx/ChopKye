export type command = {
  keywords: Array<string>;
  key: string;
};
export type commandResponse = {
  [key: string]: { response: string };
};
