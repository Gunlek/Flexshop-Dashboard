<template>
    <div class="card">
        <div class="card-header align-parent">
            <strong class="card-title">Ajouter une slide</strong>
        </div>
        <div class="form-group">
            <label>Titre de la slide</label>
            <input type="text" class="form-control" v-model="slideTitle"/>
        </div>
        <div class="form-group">
            <label>Image associée</label>
            <div class="file-selector">
                <label :for="machineId" class="btn btn-outline-blue">{{ slideImageName }}</label>
                <!-- // TODO Image uploader -->
                <!-- <input type="file" @change="processFile" :id="machineId" class="form-control" /> -->
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="5" v-model="slideDescription"></textarea>
        </div>
        <button type="button" @click="createSlide()" class="content-fluid btn btn-outline-green">Ajouter</button>
    </div>
</template>

<script lang="ts">
    import { POSTRequest } from '@/services/APIRequest';
import { Prop, Component, Vue } from 'vue-property-decorator';

    @Component
    export default class CreateSlide extends Vue {

        @Prop({ default: -1 })
        machineId!: number;

        @Prop({ default: 0 })
        slideIndex!: number;

        slideImageName = "Ajouter une image";
        slideDescription = "";
        slideTitle = "";

        createSlide(){
            POSTRequest('slides/add', {
                slide_machine: this.machineId,
                slide_number: this.slideIndex,
                slide_title: this.slideTitle,
                slide_image: this.slideImageName,
                slide_description: this.slideDescription
            }, () => {
                this.$store.dispatch("refreshTutorials");
            });
        }

    }
</script>
