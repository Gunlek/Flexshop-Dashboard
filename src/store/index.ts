import { Category, Machine, Parameter, Section, Tutorial, Workshop } from '@/services/Types';
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';

import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enableDelete: true,
    enableAdding: true,
    workshops: [] as Workshop[],
    workshopsCategories: {} as {
      [workshopID: number]: Category[];
    },
    categoriesMachines: {} as {
      [categoryId: number]: Machine[];
    },
    machines: [] as Machine[],
    machineSections: {} as {
      [sectionId: number]: Machine[];
    },
    categories: [] as Category[],
    editedSection: null as Section|null,
    editedParameters: null as Parameter[]|null,
    edition: false,
    tutorials: {} as {
      [machineId: number]: Tutorial;
    }
  },
  mutations,
  actions
})
