import { GETRequest, POSTRequest } from "@/services/APIRequest"
import sectionConfig from '@/components/MachineCard/functions/sections_description';

export const createSection = (sectionMachine: number, sectionType: string): void => {
    POSTRequest('sections/add', {
        section_machine: sectionMachine,
        section_type: sectionType
    }, () => {
        GETRequest('sections/list', (status: number, results: any) => {
            const newId = results[results.length - 1].section_id;
            sectionConfig[sectionType].parameters.forEach((parameter: any) => {
                POSTRequest('parameters/add', {
                    parameter_section: newId,
                    parameter_name: parameter.name,
                    parameter_value: ""
                });
            });
        });
    });


}