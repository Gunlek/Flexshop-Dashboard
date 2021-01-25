import { Machine } from "@/services/Types";

const categoriesMachines = async (state) => {
    const categoriesMachines: {
        [categoryId: number]: Machine[];
    } = {};
    const promise = new Promise(resolve => {
        state.machines.map((machine: Machine, index) => {
            if(machine.machine_category in categoriesMachines)
            categoriesMachines[machine.machine_category].push(machine);
            else
            categoriesMachines[machine.machine_category] = [machine];

            if(index == state.machines.length - 1)
            resolve(categoriesMachines);
        });
    });

    await promise;
    
    state.categoriesMachines = categoriesMachines;
}

export default categoriesMachines;
