import { Category } from "@/services/Types";

const getWorkshopsCategories = async (state) => {
    const workshopsCategories: {
        [workshopId: number]: Category[];
    } = {};
    const promise = new Promise(resolve => {
    state.categories.map((category: Category, index) => {
        if(category.category_workshop in workshopsCategories)
        workshopsCategories[category.category_workshop].push(category);
        else
        workshopsCategories[category.category_workshop] = [category];

        if(index == state.categories.length - 1)
        resolve(workshopsCategories);
    });
    });

    await promise;

    state.workshopsCategories = workshopsCategories;
}

export default getWorkshopsCategories;
