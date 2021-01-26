<template>
    <div class="card">
        <div class="card-header align-parent">
            <strong class="card-title">Ajouter une slide</strong>
        </div>
        <div class="form-group">
            <label>Titre de la slide</label>
            <input type="text" class="form-control" v-model="slideTitle"/>
        </div>
        <!-- <ImageUploader label="Image associée" :imageName.sync="uploadImageNameChange" :image.sync="slideImage"/> -->
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="5" v-model="slideDescription"></textarea>
        </div>
        <button type="button" @click="createSlide()" class="content-fluid btn btn-outline-green">Ajouter</button>
    </div>
</template>

<script lang="ts">
    import { POSTRequest, uploadImage } from '@/services/APIRequest';
    import { Prop, Component, Vue, Watch } from 'vue-property-decorator';
    import ImageUploader from '@/components/ImageUploader.vue';

    @Component({
        components: {
            ImageUploader
        }
    })
    export default class CreateSlide extends Vue {

        @Prop({ default: -1 })
        machineId!: number;

        @Prop({ default: 0 })
        slideIndex!: number;

        slideDescription = "";
        slideTitle = "";

        slideImageName = "Ajouter une image";
        uploadImageNameChange = "";
        slideImage = null;
        imageUpdated = false;

        createSlide(){
            this.imageUpdated && uploadImage(this.slideImage);
            POSTRequest('slides/add', {
                slide_machine: this.machineId,
                slide_number: this.slideIndex,
                slide_title: this.slideTitle,
                slide_image: this.imageUpdated ? this.slideImageName : "",
                slide_description: this.slideDescription
            }, () => {
                this.$store.dispatch("refreshTutorials");
            });
        }

        @Watch("slideImage")
        slideImageChange(){
            this.imageUpdated = true;
        }

        @Watch("uploadImageNameChange")
        slideImageNameChange(name){
            this.slideImageName = "uploads/img/" + name;
        }

    }
</script>
