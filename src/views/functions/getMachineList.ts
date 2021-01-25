import { GETRequest } from "@/services/APIRequest";
import { Machine } from "@/services/Types";

export const getMachineList = async (): Promise<Machine[]> => {
    let machineList: Machine[] = [];
    const requestPromise = new Promise((resolve, reject) => {
        GETRequest('machines/list', (status: number, results: Machine[]) => {
            machineList = results
            resolve(machineList);
        });
    });

    await Promise.all([requestPromise]);

    return machineList;
}