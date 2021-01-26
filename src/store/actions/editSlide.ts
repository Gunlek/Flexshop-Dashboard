import { Slide } from "@/services/Types";

const editSection = (context, payload: {
    section: Slide;
  }) => {
    context.commit("setEditedSlide", payload);
    context.commit("editionEnabled", true);
}

export default editSection;
