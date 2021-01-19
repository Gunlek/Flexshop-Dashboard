<template>
    <!-- <div class="card align-parent" v-if="enableAdding"> -->
    <div class="card align-parent">
        <div class="card-header align-parent">
            <strong class="card-title">Ajouter une section</strong>
        </div>
        <select class="form-control content-fluid" v-model="sectionType">
            <option v-for="section in jsonSections" :key="section.name" :value="section.name">{{ section.display_name }}</option>
        </select>
        <button type="button" @click="createSection(machine.machine_id)" class="content-fluid btn btn-outline-green">Créer</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import jsonSectionData from '../MachineCard/functions/sections_description';

    console.log(jsonSectionData);

    @Component
    export default class CreateSection extends Vue {

        @Prop({ default: -1 })
        machineId: number;

        jsonSections = jsonSectionData;
        sectionType = "";

        mounted(): void {
            const firstSection = Object.keys(this.jsonSections)[0];
            this.sectionType = this.jsonSections[firstSection].name;
        }

        createSection(): void {
            alert("Create for " + this.machineId.toString());
        }

    }
</script>