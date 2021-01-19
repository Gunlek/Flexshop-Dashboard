import { getMachineList } from '@/views/functions/getMachineList';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enableDelete: true,
    enableAdding: true,
    machines: []
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
    }
  },
  modules: {
  }
})
