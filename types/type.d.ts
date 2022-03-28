declare global {
    interface Window {
        attachEvent: any;
    }
}
export interface ErrorMsg {
    url: string;
    type: number | string;
    error?: string;
    file?: string;
    line?: number;
    column?: number;
}
export interface Config {
    ignoreCrossScriptError?: boolean;
    reportError: (err: ErrorMsg) => void;
}
