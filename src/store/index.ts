import { getMachineSections } from '@/components/MachineCard/functions/getMachineSections';
import { Category, Machine, Parameter, Section, Tutorial, Workshop } from '@/services/Types';
import { getCategoryList } from '@/views/functions/getCategoryList';
import { getMachineList } from '@/views/functions/getMachineList';
import { getWorkshopList } from '@/views/functions/getWorkshopList';
import Vue from 'vue'
import Vuex from 'vuex'

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
    tutorials: [] as Tutorial[]
  },
  mutations: {
    setDeletion(state, val): void {
      state.enableDelete = val;
    },
    
    setAddition(state, val): void {
      state.enableAdding = val;
    },

    async getWorkshops(state): Promise<void> {
      state.workshops = await getWorkshopList();
    },

    async getCategoriesMachines(state): Promise<void> {
      const categoriesMachines: {
        [categoryId: number]: Machine[];
      } = {};
      const promise = new Promise(resolve => {
        state.machines.map((machine: Machine, index) => {
          if(machine.machine_category in categoriesMachines)
            categoriesMachines[machine.machine_category].push(machine);
          else
            categoriesMachines[machine.machine_category] = [machine];

          if(index == state.machines.length - 1)
            resolve(categoriesMachines);
        });
      });

      await promise;
      state.categoriesMachines = categoriesMachines;
    },

    async getWorkshopsCategories(state): Promise<void> {
      const workshopsCategories: {
        [workshopId: number]: Category[];
      } = {};
      const promise = new Promise(resolve => {
        state.categories.map((category: Category, index) => {
          if(category.category_workshop in workshopsCategories)
            workshopsCategories[category.category_workshop].push(category);
          else
            workshopsCategories[category.category_workshop] = [category];

          if(index == state.categories.length - 1)
            resolve(workshopsCategories);
        });
      });

      await promise;
      state.workshopsCategories = workshopsCategories;
    },

    async getCategories(state): Promise<void> {
      state.categories = await getCategoryList();
    },

    async getMachines(state): Promise<void> {
      state.machines = await getMachineList();
    },

    async getMachineSections(state): Promise<void> {
      const sections = {};
      const promises = state.machines.map((machine: Machine) => 
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
      section: Section;
      parameters: Parameter[];
    }): void {
      state.editedSection = payload.section;
      state.editedParameters = payload.parameters;
    },

    editionEnabled(state, enabled): void {
      state.edition = enabled;
    }
  },
  actions
})
