<template>
    <div class="table-card">
            <div class="align-parent" style="width: 100%">
                <h4 class="card-title">{{ machineTitle }}</h4>
                <!-- <button type="button" class="btn btn-outline-red align-right" v-if="enableDelete"><i class="fas fa-trash"></i></button> -->
            </div>
            <p>{{ machineReference }} - {{ machineBrand }}</p>
            <!-- <draggable :list="machineSections" @change="/* move_section_in_machine */"> -->
                <div class="card align-parent card-hover" v-for="section in machineSections" :key="section.section_id" @click="/* editCard(section) */">
                    <div class="card-header align-parent">
                        <strong class="card-title">{{ section.section_display_name }}</strong>
                        <!-- <button v-bind:key="section_index" type="button" class="btn btn-outline-red align-right" v-if="enableDelete" @click="del_section(section.section_id)"><i class="fas fa-trash"></i></button> -->
                    </div>
                    <div class="align-parent" style="margin: 5px 10px;word-wrap:normal;" v-for="parameter in sectionParameters[section.section_id]" :key="parameter.parameter_id">
                        <div class="row">
                            <div class="col-11">
                                <strong>{{ parameter.parameter_display_name }}:</strong>
                                <div v-if="parameter.parameter_type == 'picto_list'">
                                    <span v-for="picto in (parameter.parameter_value.split(';'))" :key="picto">
                                        <img :src="require('@/assets/img/pictograms/' + picto)" width="30px" />
                                    </span>
                                </div>
                                <div v-else-if="parameter.parameter_type == 'block_text'" class="pre-text">
                                    <pre>{{ parameter.parameter_value }}</pre>
                                </div>
                                <div v-else-if="parameter.parameter_type == 'text_list'" class="pre-text">
                                    <ul v-for="text in (parameter.parameter_value.split(';'))" :key="text">
                                        <li>{{ text }}</li>
                                    </ul>
                                </div>
                                <div v-else-if="parameter.parameter_type == 'link_list'" class="pre-text">
                                    <ul v-for="text in (parameter.parameter_value.split(';'))" :key="text">
                                        <li><a :href="text">{{ text }}</a></li>
                                    </ul>
                                </div>
                                <div v-else-if="parameter.parameter_type == 'image'">
                                    <img v-bind:src="parameter.parameter_value" style="width: 100%; height: auto;" />
                                </div>
                                <div v-else>
                                    {{ parameter.parameter_value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </draggable> -->

            <!-- <div class="card align-parent" v-if="enableAdding">
                <div class="card-header align-parent">
                    <strong class="card-title">Ajouter une section</strong>
                </div>
                <select class="form-control content-fluid" v-model="new_section_type">
                    <option v-for="section_entry in json_sections_data" v-bind:value="section_entry.name">${section_entry.display_name}</option>
                </select>
                <button type="button" @click="add_new_section(machine.machine_id)" class="content-fluid btn btn-outline-green">Créer</button>
            </div> -->
        </div>
</template>

<script lang="ts">
    import { Parameter, Section, SectionExtended, SectionParametersInterface } from '@/services/Types';
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { getMachineSections } from './functions/getMachineSections';
    import { getSectionParameters } from './functions/getSectionParameters';

    @Component
    export default class MachineCard extends Vue {

        @Prop({ default: -1 })
        machineId: number;

        @Prop({ default: "Machine Title"})
        machineTitle: string;

        @Prop({ default: "Machine Reference"})
        machineReference: string;

        @Prop({ default: "Machine Brand"})
        machineBrand: string;

        machineSections: SectionExtended[] = [];
        sectionParameters: SectionParametersInterface = {};

        async mounted(): Promise<void> {
            this.machineSections = await getMachineSections(this.machineId);
            this.sectionParameters = await getSectionParameters(this.machineSections);
            console.log(this.sectionParameters);
        }

    }
</script>
