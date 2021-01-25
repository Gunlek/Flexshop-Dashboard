import { GETRequest, POSTRequest } from "@/services/APIRequest"
import sectionConfig from '@/components/MachineCard/functions/sections_description';
import { ParameterDescription, Section } from "@/services/Types";

export const createSection = (sectionMachine: number, sectionType: string): Promise<void> =>
    new Promise(resolve => {
        POSTRequest('sections/add', {
            section_machine: sectionMachine,
            section_type: sectionType
        }, () => {
            GETRequest('sections/list', async (status: number, results: Section[]) => {
                const newId = results[results.length - 1].section_id;
                sectionConfig[sectionType].parameters.forEach((parameter: ParameterDescription) => {
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