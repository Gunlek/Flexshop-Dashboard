import { Slide } from "@/services/Types";

const setEditedSlide = (state, payload: {
    slide: Slide;
  }) => {
    state.editedSlide = payload.slide;
}

export default setEditedSlide;
