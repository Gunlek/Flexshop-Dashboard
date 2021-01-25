<template>
    <div>
        <input type="hidden" :name="name" :value="picto_str" class="edition_input" />
        <span v-for="(picto, index) in pictograms" :key="index">
            <input v-model="picto_list" :checked="checked(picto)" @change="update_list()" type="checkbox" name="pictos" :value="picto" :id="picto" />
            <label :for="picto">
                <img :src="picto != '' && require('@/assets/img/pictograms/' + picto)" style="width: 30px; vertical-align: middle;"/>
            </label>
        </span>
    </div>
</template>

<script lang="ts">
    import { Prop, Component, Vue } from 'vue-property-decorator';

    @Component
    export default class PictoList extends Vue {

        @Prop({default: ""})
        name!: string;

        @Prop({default: ""})
        value!: string;
        
        pictograms: string[] = ["picto_general.png", "picto_glasses.png", "picto_gloves.png", "picto_harness.png", "picto_helmet.png", "picto_mask.png", "picto_noise.png", "picto_notice.png", "picto_pedestrian.png", "picto_shoes.png", "picto_suit.png", "picto_visor.png"];
        picto_list: string[] = [];
        picto_str = "";

        mounted(){
            this.picto_str = this.value;
            this.picto_list = this.picto_str.split(';');
        }

        update_list(){
            this.picto_str = "";
            for(let k = 0; k < this.picto_list.length; k++){
                if(k < this.picto_list.length - 1){
                    this.picto_str += this.picto_list[k];
                    this.picto_str += ";";
                }
                else
                    this.picto_str += this.picto_list[k];
            }
        }

        checked(picto: string){
            if(this.picto_list.indexOf(picto) >= 0)
                return true;
            else
                return false;
        }

    }
</script>