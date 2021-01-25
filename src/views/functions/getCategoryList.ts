import { GETRequest } from "@/services/APIRequest";
import { Category } from "@/services/Types";

export const getCategoryList = async (): Promise<Category[]> => {
    let categoryList: Category[] = [];
    const requestPromise = new Promise(resolve => {
        GETRequest('category/list', (status: number, results: Category[]) => {
            categoryList = results
            resolve(categoryList);
        });
    });

    await Promise.all([requestPromise]);

    return categoryList;
}