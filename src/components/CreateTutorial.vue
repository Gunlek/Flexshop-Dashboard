<template>
    <div class="table-card full-parent-height" id="add_machine" v-if="addition">
        <h4>Créer un nouveau tutoriel</h4>
        <div class="form-group">
            <select v-model="tutorialMachine" class="form-control">
                <option value="-1" selected disabled>Choisissez une machine</option>
                <option v-for="machine in $store.state.machines" :value="machine.machine_id" :key="machine.machine_id">{{ machine.machine_brand }} {{ machine.machine_reference }}</option>
            </select>
        </div>

        <div class="form-group">
            <label>Titre de la slide</label>
            <input type="text" class="form-control" v-model="slideTitle"/>
        </div>
        <!-- <ImageUploader ....... /> --> 
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="5" v-model="slideDescription"></textarea>
        </div>

        <button type="button" @click="createTutorial()" class="content-fluid btn btn-outline-green">Créer</button>
    </div>
</template>

<script lang="ts">
    import { POSTRequest } from '@/services/APIRequest';
import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class CreateTutorial extends Vue {

        slideTitle = "";
        slideDescription = "";
        tutorialMachine = "-1";

        mounted(){
            this.$store.dispatch("refreshMachines");
        }

        get addition(){
            return this.$store.state.enableAdding;
        }

        createTutorial(){
            POSTRequest('slides/add', {
                slide_number: 0,
                slide_machine: this.tutorialMachine,
                slide_title: this.slideTitle,
                slide_description: this.slideDescription,
                slide_image: ""
            }, () => { this.$store.dispatch("refreshTutorials") })
        }

    }
</script>