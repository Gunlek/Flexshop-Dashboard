<template>
    <div class="tutorials">
        <div class="table-body vertical-table">
            <div class="row">
                <div class="col-4"><h1 class="table-title">Gestion des tutoriels</h1></div>
                <div class="col-2"></div>
                <div class="col-3" style="position: relative;">
                    <button type="button" @click="updateDelete()" class="btn btn-outline-red" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer la suppresion</button>
                </div>
                <div class="col-3" style="position: relative;">
                    <button type="button" @click="updateAdding()" class="btn btn-outline-green" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer l'ajout</button>
                </div>
            </div>
            <div v-for="(tutorial, index) in $store.state.tutorials" :key="index" class="table-card">
                <div class="align-parent" style="width: 100%">
                    <h4 class="card-title">{{ tutorial.machine_name }}</h4>
                    <br/><br/>
                </div>
                <div style="position: relative;">
                    <!-- <draggable :list="tutorial.slides" @change="" style="display: inline;"> -->
                        <div class="card align-parent card-hover" v-for="slide in tutorial.machine_slides" :key="slide.slide_id">
                            <div class="card-header align-parent" style="line-break: auto; white-space: normal;" @click="editCard(slide)">
                                <div class="row">
                                    <div class="col-11">
                                        <strong class="card-title">{{ slide.slide_title }}</strong>
                                    </div>

                                    <div class="col-1">
                                        <button type="button" class="btn btn-outline-red align-right" v-if="deletion" @click="deleteSlide(slide.slide_id)"><VueFeather type="trash" /></button>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <img v-bind:src="slide.slide_image" style="width: 100%; height: auto;"/>
                                <br/>
                                <p>{{ slide.slide_description }}</p>
                            </div>
                        </div>
                    <!-- </draggable> -->

                    <CreateSlide v-if="addition" :machineId="tutorial.machine_id" :slideIndex="tutorial.machine_slides.length"/>
                </div>
            </div>

            <!-- <div class="table-card full-parent-height" id="add_machine" v-if="enableAdding">
                <h4>Créer un nouveau tutoriel</h4>
                <div class="form-group">
                    <select v-model="new_tutorial_machine" class="form-control">
                        <option value="-1" selected disabled>Choisissez une machine</option>
                        <option v-for="machine in machine_list" v-bind:value="machine.machine_id">${machine.machine_brand} ${machine.machine_reference}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Titre de la slide</label>
                    <input type="text" class="form-control" v-model="new_slide_title"/>
                </div>
                <div class="form-group">
                    <label>Image associée</label>
                    <div class="file-selector">
                        <label for="new_slide_image" class="btn btn-outline-blue">${new_slide_image_name}</label>
                        <input type="file" name="new_slide_image" @change="processFile" id="new_slide_image" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" rows="5" v-model="new_slide_description"></textarea>
                </div>

                <button type="button" @click="add_new_tutorial()" class="content-fluid btn btn-outline-green">Créer</button>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import VueFeather from 'vue-feather';
    import { DELETERequest } from '@/services/APIRequest';
    import CreateSlide from '@/components/CreateSlide.vue';
import { Slide } from '@/services/Types';

    @Component({
        components: {
            VueFeather,
            CreateSlide
        }
    })
    export default class Tutorials extends Vue {

        mounted(){
            this.$store.dispatch("refreshTutorials");
        }

        updateAdding(): void {
            this.$store.dispatch("setAddition", !this.$store.state.enableAdding);
        }

        updateDelete(): void {
            this.$store.dispatch("setDeletion", !this.$store.state.enableDelete);
        }

        deleteSlide(slideId: number): void {
            DELETERequest(`slides/delete/${slideId}`, () => {
                this.$store.dispatch("refreshTutorials");
            })
        }

        editSlide(slide: Slide): void {
            // TODO
        }

        get addition(){
            return this.$store.state.enableAdding;
        }

        get deletion(){
            return this.$store.state.enableDelete;
        }

    }
</script>