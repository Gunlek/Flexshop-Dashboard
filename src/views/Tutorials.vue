<template>
    <div class="tutorials">
        <div :class="$store.state.edition ? 'table-body vertical-table modal-open' : 'table-body vertical-table '">
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
                            <div class="card-header align-parent" style="line-break: auto; white-space: normal;" @click="editSlide(slide)">
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
                                <img :src="slide.slide_image != '' && baseAPIPath + slide.slide_image" style="width: 100%; height: auto;"/>
                                <br/>
                                <p>{{ slide.slide_description }}</p>
                            </div>
                        </div>
                    <!-- </draggable> -->

                    <CreateSlide v-if="addition" :machineId="tutorial.machine_id" :slideIndex="tutorial.machine_slides.length"/>
                </div>
            </div>

            <CreateTutorial />
        </div>

        <EditSlide v-if="$store.state.edition" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import VueFeather from 'vue-feather';
    import { DELETERequest } from '@/services/APIRequest';
    import CreateSlide from '@/components/CreateSlide.vue';
    import { Slide } from '@/services/Types';
    import EditSlide from '@/components/EditSlide.vue';
    import CreateTutorial from '@/components/CreateTutorial.vue';

    @Component({
        components: {
            VueFeather,
            CreateSlide,
            EditSlide,
            CreateTutorial
        }
    })
    export default class Tutorials extends Vue {

        editedSlide: Slide|null = null;

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
            this.$store.dispatch("editSlide", {
                slide: slide
            });
        }

        get addition(){
            return this.$store.state.enableAdding;
        }

        get deletion(){
            return this.$store.state.enableDelete;
        }

        get baseAPIPath(){
            return process.env.VUE_APP_API;
        }

    }
</script>