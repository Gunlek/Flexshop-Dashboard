import { GETRequest } from "@/services/APIRequest";
import { Machine, Section, SectionExtended } from "@/services/Types";
import sectionDescription from "@/components/MachineCard/functions/sections_description";

const getMachineSectionsFromAPI = async (machineId: number): Promise<SectionExtended[]> => {
    const sections: SectionExtended[] = [];
    const requestPromise = new Promise((resolve) => {
        GETRequest('sections/list', (status: number, results: Section[]) => {
            results.forEach((section, index) => {
                if(section.section_machine === machineId){
                    sections.push({...section, section_display_name: sectionDescription[section.section_type].display_name});
                }

                if(index === results.length - 1) resolve(sections);
            })
        });
    });

    await Promise.all([requestPromise]);

    return sections;
}

const getMachineSections = async (state): Promise<void> => {
    const sections = {};
    const promises = state.machines.map((machine: Machine) => 
    new Promise(resolve => {
        getMachineSectionsFromAPI(machine.machine_id)
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
