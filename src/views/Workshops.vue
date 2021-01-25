<template>
    <transition name="slide">
        <div class="machines">
            <div class="horizontal-table table-body">
                <div class="row">
                    <div class="col-4"><h1 class="table-title">Gestion des ateliers</h1></div>
                    <div class="col-2"></div>
                    <div class="col-3" style="position: relative;">
                        <button type="button" @click="updateDelete()" class="btn btn-outline-red" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer la suppresion</button>
                    </div>
                    <div class="col-3" style="position: relative;">
                        <button type="button" @click="updateAdding()" class="btn btn-outline-green" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer l'ajout</button>
                    </div>
                </div>

                <div v-for="workshop in $store.state.workshops" :key="workshop.workshop_id" class="table-card">
                    <div class="align-parent" style="width: 100%">
                        <h4 class="card-title">{{ workshop.workshop_title }}</h4>
                        <transition name="fade" mode="out-in">
                            <button type="button" class="btn btn-outline-red align-right" v-if="deletion" @click="deleteWorkshop(workshop.workshop_id)"><VueFeather type="trash" /></button>
                        </transition>
                    </div>
                    <div class="card align-parent" v-for="category in $store.state.workshopsCategories[workshop.workshop_id]" :key="category.category_id">
                        <div class="card-header align-parent">
                            <strong class="card-title">{{ category.category_title }}</strong>
                            <transition name="fade" mode="out-in">
                                <button type="button" class="btn btn-outline-red align-right" v-if="deletion" @click="deleteCategory(category.category_id)"><VueFeather type="trash" /></button>
                            </transition>
                        </div>
                    <div class="align-parent" style="margin: 5px 10px;word-wrap:normal;" v-for="machine in $store.state.categoriesMachines[category.category_id]" :key="machine.machine_id">
                            <div class="row">
                                <div class="col-11">
                                    <strong>{{ machine.machine_title }}</strong><br/>
                                    {{ machine.machine_brand }} - {{ machine.machine_reference }}
                                </div>

                                <div class="col-1">
                                    <transition name="fade" mode="out-in">
                                        <button type="button" class="btn btn-outline-red btn-xs align-right" v-if="deletion" @click="deleteMachine(machine.machine_id)"><VueFeather type="trash" /></button>
                                    </transition>
                                </div>
                            </div>            
                        </div>

                        <CreateMachine :vertical="true" v-if="addition" :fixedCategory="category.category_id" />
                    </div>

                    <CreateCategory v-if="addition" :workshopId="workshop.workshop_id" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import VueFeather from 'vue-feather';
    import CreateMachine from '@/components/CreateMachine/CreateMachine.vue';
    import CreateCategory from '@/components/CreateCategory.vue';
    import { DELETERequest } from '@/services/APIRequest';

    @Component({
        components: {
            VueFeather,
            CreateMachine,
            CreateCategory
        }
    })
    export default class Workshops extends Vue {

        mounted(){
            this.$store.dispatch("refreshMachines");
            this.$store.dispatch("refreshWorkshops");
        }

        @Watch("$store.state.machines")
        machineListUpdated(){
            this.$store.dispatch("refreshCategories");
        }

        @Watch("$store.state.categories")
        categoriesUpdated(){
            this.$store.dispatch("refreshWorkshopsCategories");
            this.$store.dispatch("refreshCategoriesMachines");
        }
        

        deleteWorkshop(workshopId: number){
            // TODO: Should be recursive (delete associated categories and machines)
            DELETERequest(`workshops/delete/${workshopId}`, () => {
                this.$store.dispatch("refreshWorkshops");
                this.$store.dispatch("refreshMachines");
            });
        }

        deleteCategory(categoryId: number){
            // TODO: Should be recursive (delete associated machines)
            DELETERequest(`category/delete/${categoryId}`, () => {
                this.$store.dispatch("refreshWorkshops");
                this.$store.dispatch("refreshMachines");
            });
        }

        deleteMachine(machineId: number){
            // TODO: Should be recursive
            DELETERequest(`machines/delete/${machineId}`, () => {
                this.$store.dispatch("refreshWorkshops");
                this.$store.dispatch("refreshMachines");
            });
        }

        updateAdding(): void {
            this.$store.dispatch("setAddition", !this.$store.state.enableAdding);
        }

        updateDelete(): void {
            this.$store.dispatch("setDeletion", !this.$store.state.enableDelete);
        }

        get addition(){
            return this.$store.state.enableAdding;
        }

        get deletion(){
            return this.$store.state.enableDelete;
        }

    }
</script>