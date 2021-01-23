import { GETRequest, POSTRequest } from "@/services/APIRequest"
import sectionConfig from '@/components/MachineCard/functions/sections_description';

export const createSection = (sectionMachine: number, sectionType: string): Promise<void> =>
    new Promise(resolve => {
        POSTRequest('sections/add', {
            section_machine: sectionMachine,
            section_type: sectionType
        }, () => {
            GETRequest('sections/list', async (status: number, results: any) => {
                const newId = results[results.length - 1].section_id;
                const parametersPromises = sectionConfig[sectionType].parameters.forEach((parameter: any) => {
                        POSTRequest('parameters/add', {
                            parameter_section: newId,
                            parameter_name: parameter.name,
                            parameter_value: ""
                        }, () => {resolve()});
                    }
                );
                });
            }
        );
    });