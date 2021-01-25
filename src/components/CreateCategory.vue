<template>
    <div class="card align-parent">
        <div class="card-header align-parent">
            <strong class="card-title">Ajouter une catégorie</strong>
        </div>
        <input type="text" class="form-control content-fluid" v-model="categoryTitle" placeholder="Nom de la catégorie..." />
        <button type="button" @click="createCategory()" class="content-fluid btn btn-outline-green">Créer</button>
    </div>
</template>

<script lang="ts">
    import { POSTRequest } from '@/services/APIRequest';
    import { Prop, Component, Vue } from 'vue-property-decorator';

    @Component
    export default class CreateCategory extends Vue {

        categoryTitle = "";

        @Prop()
        workshopId!: number;

        createCategory(){
            POSTRequest("category/add", {
                category_workshop: this.workshopId,
                category_title: this.categoryTitle
            }, () => {
                this.$store.dispatch("refreshCategories");
            })
        }

    }
</script>