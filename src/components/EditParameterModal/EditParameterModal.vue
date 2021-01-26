<template>
    <transition name="fade" mode="out-in">
        <div v-if="$store.state.edition" class="modal">
            <div class="bg" @click="hideEditCard()"></div>
            <div class="modal-content">
                <h2>{{ section.section_display_name }}</h2><br/>
                <p class="subtitle">Edition des paramètres</p>
                <br/><br/>
                <div v-for="parameter in parameters" :key="parameter.parameter_id">
                    <label>{{parameter.parameter_display_name}}</label>
                    <div v-if="parameter.parameter_type=='picto_list'">
                        <PictoList :name="parameter.parameter_id" :value="parameter.parameter_value"></PictoList>
                    </div>

                    <div v-else-if="parameter.parameter_type=='text'">
                        <input type="text" v-bind:name="parameter.parameter_id" v-bind:value="parameter.parameter_value" class="edition_input form-control content-fluid" />
                    </div>

                    <div v-else-if="parameter.parameter_type=='block_text'" class="form-group">
                        <textarea  :name="parameter.parameter_id" :value="parameter.parameter_value" class="edition_input form-control content-fluid" rows="10"></textarea>
                    </div>

                    <div v-else-if="parameter.parameter_type=='text_list'" id="text_list">
                        <TextList :name="parameter.parameter_id" :value="parameter.parameter_value"></TextList>
                    </div>

                    <div v-else-if="parameter.parameter_type=='link_list'" id="text_list">
                        <LinkList :name="parameter.parameter_id" :value="parameter.parameter_value"></LinkList>
                    </div>

                    <div v-else-if="parameter.parameter_type=='image'">
                        <ImageUploader :input="true" :inputName="parameter.parameter_id" :defaultValue="parameter.parameter_value" :imageName.sync="uploadImageNameChange" :image.sync="image"/>
                    </div>

                </div>
                    
                <button class="btn btn-outline-green content-fluid" @click="updateSection()">Mettre à jour</button>
                <br/><br/>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import PictoList from './EditingComponents/PictoList.vue';
    import TextList from './EditingComponents/TextList.vue';
    import LinkList from './EditingComponents/LinkList.vue';
    import { PUTRequest } from '@/services/APIRequest';
    import ImageUploader from '@/components/ImageUploader.vue';

    @Component({
        components: {
            PictoList,
            TextList,
            LinkList,
            ImageUploader
        }
    })
    export default class EditParameterModal extends Vue {

        imageName = "Ajouter une image";
        uploadImageNameChange = "";
        image = null;
        imageUpdated = false;

        hideEditCard() {
            this.$store.dispatch("stopEdition")
        }

        get section(){
            return this.$store.state.editedSection;
        }

        get parameters(){
            return this.$store.state.editedParameters;
        }

        updateSection(){
            document.querySelectorAll(".edition_input").forEach((el) => {
                const update_id = el.getAttribute("name");
                const update_value = (el as HTMLInputElement).value;

                PUTRequest("parameters/update/" + update_id, {
                    parameter_value: update_value
                });
            });

            this.$store.dispatch("refreshMachineSections");
            this.hideEditCard();
        }

        @Watch("image")
        imageChange(){
            this.imageUpdated = true;
        }

        @Watch("uploadImageNameChange")
        imageNameChange(name){
            this.imageName = "uploads/img/" + name;
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