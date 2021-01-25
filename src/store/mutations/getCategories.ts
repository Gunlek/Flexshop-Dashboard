import { GETRequest } from "@/services/APIRequest";
import { Category } from "@/services/Types";

const getCategories = async (state): Promise<void> => {
    let categoryList: Category[] = [];
    const requestPromise = new Promise(resolve => {
        GETRequest('category/list', (status: number, results: Category[]) => {
            categoryList = results
            resolve(categoryList);
        });
    });

    await Promise.all([requestPromise]);

    state.categories = categoryList;
}

export default getCategories;
