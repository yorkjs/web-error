export interface ErrorMsg {
  url: string,
  type: number | string,
  error?: string,
  file?: string,
  line?: number,
  column?: number,
}

export interface Config {
  reportError: (err: ErrorMsg) => void,
}
