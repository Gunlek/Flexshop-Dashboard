import { GETRequest } from "@/services/APIRequest";
import { Workshop } from "@/services/Types";

const getWorkshops = async (state): Promise<void> => {
    let workshopList: Workshop[] = [];
    const requestPromise = new Promise(resolve => {
        GETRequest('workshops/list', (status: number, results: Workshop[]) => {
            workshopList = results
            resolve(workshopList);
        });
    });

    await Promise.all([requestPromise]);

    state.workshops = workshopList;
}

export default getWorkshops;
