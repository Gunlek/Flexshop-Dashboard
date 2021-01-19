import { buildInlinePayload } from '@/services/BuildInlinePayload';

const baseAPI = "http://127.0.0.1:58/";

export const PUTRequest = (path: string, payload: any, callback? : any) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback(httpRequest.status);
            }
        }
    };
    httpRequest.open('PUT', baseAPI + path);
    httpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded",
    );

    httpRequest.send(buildInlinePayload(payload));
}

export const POSTRequest = (path: string, payload: any, callback? : any) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                if(callback)
                    callback(httpRequest.status);
            }
        }
    };
    httpRequest.open('POST', baseAPI + path);
    httpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded",
    );
    
    httpRequest.send(buildInlinePayload(payload));
}

export const DELETERequest = (path: string, callback? : any) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback(httpRequest.status);
            }
        }
    };
    httpRequest.open('DELETE', baseAPI + path);
    httpRequest.send();
}

export const GETRequest = (path: string, callback? : any) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback(httpRequest.status, JSON.parse(httpRequest.responseText));
            }
        }
    };
    httpRequest.open('GET', baseAPI + path);
    httpRequest.send();
}