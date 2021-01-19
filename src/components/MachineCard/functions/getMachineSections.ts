import { GETRequest } from "@/services/APIRequest";
import { Section, SectionExtended } from "@/services/Types";
import sectionDescription from "./sections_description";

export const getMachineSections = async (machineId: number): Promise<SectionExtended[]> => {
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