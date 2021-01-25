import { Parameter, Section } from "@/services/Types";

const setEditedSection = (state, payload: {
    section: Section;
    parameters: Parameter[];
  }) => {
    state.editedSection = payload.section;
    state.editedParameters = payload.parameters;
}

export default setEditedSection;
