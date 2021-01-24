import { getMachineSections } from '@/components/MachineCard/functions/getMachineSections';
import { getMachineList } from '@/views/functions/getMachineList';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enableDelete: true,
    enableAdding: true,
    machines: [],
    machineSections: {},
    editedSection: null,
    editedParameters: null,
    edition: false
  },
  mutations: {
    setDeletion(state, val): void {
      state.enableDelete = val;
    },
    
    setAddition(state, val): void {
      state.enableAdding = val;
    },

    async getMachines(state): Promise<void> {
      state.machines = await getMachineList();
    },

    async getMachineSections(state): Promise<void> {
      const sections = {};
      const promises = state.machines.map((machine) => 
        new Promise(resolve => {
          getMachineSections(machine.machine_id)
            .then((section) => {
              sections[machine.machine_id] = section;
              resolve(state.machineSections);
            });
        })
      );
      
      await Promise.all(promises);
      state.machineSections = sections;
    },

    setEditedSection(state, payload: {
      section: any;
      parameters: any;
    }): void {
      state.editedSection = payload.section;
      state.editedParameters = payload.parameters;
    },

    editionEnabled(state, enabled): void {
      state.edition = enabled;
    }
  },
  actions: {
    setDeletion(context, val): void {
      context.commit("setDeletion", val);
    },

    setAddition(context, val): void {
      context.commit("setAddition", val);
    },

    refreshMachines(context): void {
      context.commit("getMachines");
    },

    refreshMachineSections(context): void {
      context.commit("getMachineSections");
    },

    editSection(context, payload: {
      section: any;
      parameters: any;
    }): void {
      context.commit("setEditedSection", payload);
      context.commit("editionEnabled", true);
    },

    stopEdition(context): void {
      context.commit("editionEnabled", false);
    }
  },
  modules: {
  }
})
