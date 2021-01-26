<template>
    <transition name="fade" mode="out-in">
        <div class="modal">
            <div class="bg" @click="hideEditCard()"></div>
            <div class="modal-content">
                <h2>{{ slide.slide_title }}</h2><br/>
                <p class="subtitle">Edition de la slide</p>
                <br/><br/>
                <div class="form-group">
                    <label>Titre de la slide:</label>
                    <input type="text" class="form-control" v-model="slideTitle">
                </div>
                <!-- // TODO -->
                <!-- <div class="form-group">
                    <label>Image associée</label>
                    <img v-if="!updateImage" v-bind:src="edit_data.slide_image" style="width: 100%; height: auto;" />
                    <div class="file-selector">
                        <label v-bind:for="edit_data_slide_img" class="btn btn-outline-blue">{{ new_slide_image_name }}</label>
                        <input type="file" @change="processFile" v-bind:id="edit_data_slide_img" class="form-control" />
                    </div>
                </div> -->
                <div class="form-group">
                    <label></label>
                    <textarea rows="5" class="form-control" name="update_slide_description" v-model="slideDescription"></textarea>
                </div>
                <br/><br/>
                <button class="btn btn-outline-green content-fluid" @click="updateSlide(slide.slide_id)">Mettre à jour</button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { PUTRequest } from '@/services/APIRequest';
import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class EditSlide extends Vue {

        slideTitle = this.slide.slide_title;
        slideDescription = this.slide.slide_description;

        hideEditCard() {
            this.$store.dispatch("stopEdition")
        }

        get slide(){
            return this.$store.state.editedSlide;
        }

        updateSlide(slideId: number) {
            PUTRequest(`slides/update/${slideId}`, {
                slide_title: this.slideTitle,
                slide_image: "",        // TODO
                slide_description: this.slideDescription
            }, () => {
                this.$store.dispatch("refreshTutorials");
                this.$store.dispatch("stopEdition");
            });
        }

    }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>