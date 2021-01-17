export const buildInlinePayload = (payload: any) => {
    console.log(payload.machine_title);
    console.log("title", payload["machine_title"]);
    const payloadReducer = (accumulator: string, currentKey: string) => accumulator + currentKey + "=" + payload[currentKey] + "&";
    const inlinePayload = Object.keys(payload).reduce(payloadReducer, "");
    return inlinePayload.slice(0, inlinePayload.length-1);
}