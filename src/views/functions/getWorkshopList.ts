import { GETRequest } from "@/services/APIRequest";
import { Workshop } from "@/services/Types";

export const getWorkshopList = async (): Promise<Workshop[]> => {
    let workshopList: Workshop[] = [];
    const requestPromise = new Promise((resolve, reject) => {
        GETRequest('workshops/list', (status: number, results: Workshop[]) => {
            workshopList = results
            resolve(workshopList);
        });
    });

    await Promise.all([requestPromise]);

    return workshopList;
}