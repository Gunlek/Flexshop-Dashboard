import { GETRequest } from "@/services/APIRequest";

import { Machine, Slide, Tutorial } from '@/services/Types';

const getMachineFromId = (state, machineId): Machine|null => {
    let returnMachine = null;
    state.machines.forEach(machine => {
        if(machine.machine_id == machineId)
            returnMachine = machine;
    });

    return returnMachine;
}

const getTutorials = (state) => {
    const tutorials: {
        [machineId: number]: Tutorial;
    } = {};

    GETRequest('slides/list', (status, slides: Slide[]) => {
        slides.map(slide => {
            if(slide.slide_machine in tutorials)
                tutorials[slide.slide_machine].machine_slides.push(slide);
            else {
                const machine = getMachineFromId(state, slide.slide_machine);
                tutorials[slide.slide_machine] = {
                    machine_id: slide.slide_machine,
                    machine_name: machine != null ? machine.machine_reference + " - " + machine.machine_brand : "Dummy machine",
                    machine_slides: [slide]
                };
            }
        });

        state.tutorials = tutorials;
    });
}

export default getTutorials;
