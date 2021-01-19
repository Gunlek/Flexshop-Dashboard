import { GETRequest } from "@/services/APIRequest";
import { Section } from "@/services/Types";

export const getMachineSections = async (machineId: number): Promise<Section[]> => {
    const sections: Section[] = [];
    const requestPromise = new Promise((resolve, reject) => {
        GETRequest('sections/list', (status: number, results: Section[]) => {
            results.forEach((section, index) => {
                if(section.section_machine === machineId){
                    sections.push(section);
                }

                if(index === results.length - 1) resolve(sections);
            })
        });
    });

    await Promise.all([requestPromise]);

    return sections;
}