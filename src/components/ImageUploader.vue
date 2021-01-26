<template>
    <div class="form-group">
        <input v-if="input" type='hidden' :name='inputName' :value='imageValue' class='edition_input'/>
        <label>{{ label }}</label>
        <div class="file-selector">
            <img :src="imageChanged ? imageRender : imageValue" style="width: 100%; height: auto;"/>
            <label for="image" class="btn btn-outline-blue">{{ imageName }}</label>
            <input type="file" name="image" @change="processFile" id="image" class="form-control" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class ImageUploader extends Vue {

        @Prop({ default: "" })
        label!: string;

        @Prop({ default: "" })
        defaultValue!: string;

        @Prop({ default: false })
        input!: boolean;

        @Prop({ default: "" })
        inputName!: string;

        image;
        imageRender: string|ArrayBuffer|null = "";
        imageName = "Fichier";
        imageValue: string|ArrayBuffer|null = "";
        imageChanged = false;

        mounted(){
            this.imageValue = this.defaultValue != '' ? this.baseAPIPath + this.defaultValue : "";
        }

        processFile(event){
            this.image = event.target.files[0];
            this.imageName = this.image.name;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageRender = e.target != null ? e.target.result : null;
                console.log("loaded");
                this.imageChanged = true;
            };
            reader.readAsDataURL(this.image);

            this.$emit("update:imageName", this.imageName);
            this.$emit("update:image", this.image);
        }

        @Watch("imageName")
        imageNameChange(){
            this.imageValue = "uploads/img/" + this.imageName;
        }

        get baseAPIPath(){
            return process.env.VUE_APP_API;
        }

    }
</script>
