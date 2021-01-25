import { GETRequest } from "@/services/APIRequest";
import { Machine } from "@/services/Types";

const getMachines = async (state): Promise<void> => {
    let machineList: Machine[] = [];
    const requestPromise = new Promise(resolve => {
        GETRequest('machines/list', (status: number, results: Machine[]) => {
            machineList = results
            resolve(machineList);
        });
    });

    await Promise.all([requestPromise]);

    state.machines = machineList;
}

export default getMachines;
