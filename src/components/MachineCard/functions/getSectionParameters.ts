import { GETRequest } from "@/services/APIRequest";
import { ParameterDescription, ParameterExtended, Section, SectionParametersInterface } from "@/services/Types";
import sectionDescription from "./sections_description";

interface SectionWithParameters extends Section {
    parameters: {
        [parameterName: string]: ParameterExtended;
    };
}

export const getSectionParameters = async (sections: Section[]): Promise<SectionParametersInterface> => {

    const sectionParameters: SectionParametersInterface = {};

    const promises = sections.map((section) => {
        return new Promise((resolve) => {
            GETRequest('sections/get/'+section.section_id, (status: number, results: SectionWithParameters) => {
                const parametersInSection = sectionDescription[section.section_type].parameters;
                const parameters = results.parameters;
                const extendedParameters: ParameterExtended[] = Object.keys(results.parameters).map((key: string) => {
                    let parameter: ParameterExtended = parameters[key];
                    parametersInSection.forEach((parameterDescription: ParameterDescription) => {
                        if(parameterDescription.name === parameter.parameter_name){
                            parameter = { 
                                ...parameter,
                                parameter_display_name: parameterDescription.display_name,
                                parameter_type: parameterDescription.type
                            }
                        }
                    });
                    return parameter;
                })
                sectionParameters[section.section_id] = extendedParameters;
                resolve(sectionParameters);
            });
        })
    });
    
    await Promise.all(promises);
    return sectionParameters;

}
