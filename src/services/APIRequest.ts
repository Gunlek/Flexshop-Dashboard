import { buildInlinePayload } from '@/services/BuildInlinePayload';

const baseAPI = process.env.VUE_APP_API;

interface PlainJSON {
    [key: string]: string|number|null;
}

export const PUTRequest = (path: string, payload: PlainJSON, callback? : (status?: number) => void) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback != null && callback(httpRequest.status);
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

export const POSTRequest = (path: string, payload: PlainJSON, callback? : (status?: number) => void) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback != null && callback(httpRequest.status);
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

export const DELETERequest = (path: string, callback? : (status?: number) => void) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback != null && callback(httpRequest.status);
            }
        }
    };
    httpRequest.open('DELETE', baseAPI + path);
    httpRequest.send();
}

export const GETRequest = (path: string, callback? : (status, results) => void) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === 4){
            if(httpRequest.status >= 200 && httpRequest.status <= 300){
                callback != null && callback(httpRequest.status, JSON.parse(httpRequest.responseText));
            }
        }
    };
    httpRequest.open('GET', baseAPI + path);
    httpRequest.send();
}

export const uploadImage = (image) => {
    const data = new FormData();
    data.append('file', image);

    const imgRequest = new XMLHttpRequest();
    imgRequest.open('POST', baseAPI + 'upload-file');
    /* imgRequest.addEventListener('load', () => {
    }); */
    imgRequest.send(data);
}