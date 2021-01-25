import { Machine } from "@/services/Types";

const getMachineSections = async (state): Promise<void> => {
    const sections = {};
    console.log(state);
    const promises = state.machines.map((machine: Machine) => 
    new Promise(resolve => {
        getMachineSections(machine.machine_id)
        .then((section) => {
            sections[machine.machine_id] = section;
            resolve(state.machineSections);
        });
    })
    );
    
    await Promise.all(promises);
    state.machineSections = sections;
}

export default getMachineSections;
