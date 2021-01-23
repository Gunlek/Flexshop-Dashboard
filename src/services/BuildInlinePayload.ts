export const buildInlinePayload = (payload: any) => {
    const payloadReducer = (accumulator: string, currentKey: string) => accumulator + currentKey + "=" + payload[currentKey] + "&";
    const inlinePayload = Object.keys(payload).reduce(payloadReducer, "");
    return inlinePayload.slice(0, inlinePayload.length-1);
}