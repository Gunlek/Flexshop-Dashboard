<template>
    <div>
        <input type='hidden' v-bind:name='name' v-bind:value='list_value' class='edition_input'/>
        <div class='row'>
            <div class='col-8' style='padding-right: 5px;'>
                <input type='text' v-model='new_text' class='form-control content-fluid' style='margin: 0;' placeholder='Ajouter à la liste...'/>
            </div>
            <div class='col-4' style='padding-left: 5px;'>
                <button class='content-fluid btn btn-outline-green' @click='insert_value()'>Ajouter</button>
            </div>
        </div>
        <div>
            <ul v-for='(text, index) in text_list' :key="index">
                <li>
                    {{text}}&nbsp;&nbsp;<button class='btn btn-outline-red' @click='remove_value(index)'><VueFeather type="trash" /></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { Prop, Component, Vue } from 'vue-property-decorator';
    import VueFeather from 'vue-feather';

    @Component({
        components: {
            VueFeather
        }
    })
    export default class TextList extends Vue {

        @Prop({default: ""})
        name: string;

        @Prop({default: ""})
        value: string;

        new_text = "";
        text_list: string[] = [];
        list_value = "";

        mounted(){
            this.list_value = this.value;
            this.text_list = this.list_value.split(';');
        }

        insert_value(){
            if(this.new_text != ""){
                this.text_list.push(this.new_text);
                this.new_text = "";

                this.list_value = "";
                for(let k=0; k < this.text_list.length; k++){
                    if(k < this.text_list.length - 1) {
                        this.list_value += this.text_list[k];
                        this.list_value += ";";
                    }
                    else
                        this.list_value += this.text_list[k];
                }
            }
        }

        remove_value(index: number){
            this.text_list.splice(index, 1);
            
            this.list_value = "";
            for(let k=0; k < this.text_list.length; k++){
                if(k < this.text_list.length - 1) {
                    this.list_value += this.text_list[k];
                    this.list_value += ";";
                }
                else
                    this.list_value += this.text_list[k];
            }
        }
    }
</script>