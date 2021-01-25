import { Parameter, Section } from "@/services/Types";

const editSection = (context, payload: {
    section: Section;
    parameters: Parameter[];
  }) => {
    context.commit("setEditedSection", payload);
    context.commit("editionEnabled", true);
}

export default editSection;
