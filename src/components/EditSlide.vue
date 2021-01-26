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
                <ImageUploader label="Image associée" :imageName.sync="uploadImageNameEditChange" :image.sync="slideImage"/>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="5" class="form-control" name="update_slide_description" v-model="slideDescription"></textarea>
                </div>
                <br/><br/>
                <button class="btn btn-outline-green content-fluid" @click="updateSlide(slide.slide_id)">Mettre à jour</button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { PUTRequest, uploadImage } from '@/services/APIRequest';
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import ImageUploader from '@/components/ImageUploader.vue';

    @Component({
        components: {
            ImageUploader
        }
    })
    export default class EditSlide extends Vue {

        slideTitle = this.slide.slide_title;
        slideDescription = this.slide.slide_description;
        slideImageName = "";
        uploadImageNameChange = "";
        slideImage = null;
        imageUpdated = false;

        hideEditCard() {
            this.$store.dispatch("stopEdition")
        }

        get slide(){
            return this.$store.state.editedSlide;
        }

        @Watch("$store.state.editedSlide")
        editedSlideChange(){
            this.slideImageName = "";
            this.imageUpdated = false;
        }

        updateSlide(slideId: number) {
            if(this.imageUpdated){
                uploadImage(this.slideImage);
                PUTRequest(`slides/update/${slideId}`, {
                    slide_title: this.slideTitle,
                    slide_image: this.slideImageName,
                    slide_description: this.slideDescription
                }, () => {
                    this.$store.dispatch("refreshTutorials");
                    this.$store.dispatch("stopEdition");
                });
            }
            else
                PUTRequest(`slides/update/${slideId}`, {
                    slide_title: this.slideTitle,
                    slide_description: this.slideDescription
                }, () => {
                    this.$store.dispatch("refreshTutorials");
                    this.$store.dispatch("stopEdition");
                });
        }

        @Watch("slideImage")
        slideImageEditChange(){
            this.imageUpdated = true;
        }

        @Watch("uploadImageNameChange")
        uploadImageNameEditChange(name){
            this.slideImageName = "uploads/img/" + name;
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