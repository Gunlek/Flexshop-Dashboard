<template>
    <div :class="!vertical && 'table-card'">
        <h4>Créer une nouvelle machine</h4>
        <input type="text" class="content-fluid form-control" v-model="machineTitle" placeholder="Nom de la nouvelle machine..."/>
        <select v-model="machineCategory" class="form-control content-fluid" v-if="fixedCategory < 0">
            <option disabled value="">Choisissez une catégorie</option>
            <option v-for="category in existingCategories" :key="category.category_id" :value="category.category_id">{{category.category_title}}</option>
        </select>
        <input type="text" class="content-fluid form-control" v-model="machineBrand" placeholder="Marque de la nouvelle machine..."/>
        <input type="text" class="content-fluid form-control" v-model="machineReference" placeholder="Référence de la nouvelle machine..."/>
        <!-- // TODO: Image Uploader -->
        <!-- <ImageUploader /> -->
        <!-- <div class="file-selector">
            <img :src="image_render" style="width: 100%; height: auto;"/>
            <label for="add_image" class="btn btn-outline-blue">${image_name}</label>
            <input type="file" @change="processFile" id="add_image" class="form-control"/>
            <input type="hidden" class="image_editor" />
        </div> -->
        <button type="button" @click="createMachine()" class="content-fluid btn btn-outline-green">Créer</button>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Category } from '@/services/Types';
    import { GETRequest, POSTRequest } from '@/services/APIRequest';

    @Component
    export default class CreateMachine extends Vue {
        machineTitle = "";
        machineBrand = "";
        machineReference = "";
        machineCategory = "";
        machineImage = "";

        existingCategories: Category[] = [];

        @Prop({default: false})
        vertical: boolean;

        @Prop({ default: -1 })
        fixedCategory: number;

        createMachine(): void {
            if(this.fixedCategory > 0)
                this.machineCategory = this.fixedCategory.toString();
            POSTRequest('machines/add', {
                "machine_title": this.machineTitle,
                "machine_brand": this.machineBrand,
                "machine_reference": this.machineReference,
                "machine_category": this.machineCategory,
                "machine_image": this.machineImage
            }, () => {
                this.$store.dispatch("refreshMachines");
            });
        }

        mounted(): void {
            GETRequest('category/list', (status: number, results: Category[]) => {
                this.existingCategories = results;
            });
        }
    }
</script>