export function getUserId(): Promise<any>;
export function getIPFSCodeToLoad(): Promise<{
    code: string;
    url: string;
    versions: any;
    transpiled: string;
    html: string;
}>;
export function getCodeToLoad(): Promise<{
    code: any;
    transpiled: any;
    html: any;
    versions: any;
}>;
export function getProjects(): Promise<any>;
export function saveCode(opts: {
    code: any;
    url?: any;
    html?: any;
    transpiled?: any;
    versions?: any;
    i?: any;
}, counter: number): Promise<null | undefined>;
