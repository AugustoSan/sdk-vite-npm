export interface IInteractionContract {
    functionName: string;
    params: Array<any>;
}

export interface IInteractionAPIGET {
    endpoint: string;
    token: string;
}

export interface IInteractionAPIPOST {
    endpoint: string;
    token: string;
    data: any;
}

export interface IDataPropsAPI {
    baseURL: string;
    port: string;
    raiz: string
}