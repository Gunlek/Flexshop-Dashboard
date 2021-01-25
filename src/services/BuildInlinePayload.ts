export const buildInlinePayload = (payload: {
    [key: string]: string|number|null;
}) => {
    const payloadReducer = (accumulator: string, currentKey: string) => accumulator + currentKey + "=" + payload[currentKey] + "&";
    const inlinePayload = Object.keys(payload).reduce(payloadReducer, "");
    return inlinePayload.slice(0, inlinePayload.length-1);
}