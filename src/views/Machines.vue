<template>
    <transition name="slide">
        <div class="machines">
            <div class="horizontal-table table-body">
                <div class="row">
                    <div class="col-4"><h1 class="table-title">Gestion des machines</h1></div>
                    <!-- <div class="col-2" style="position: relative;">
                        <button type="button" @click="updateDelete()" class="btn btn-outline-red" style="position: absolute;top:50%;transform: translateY(-50%);">Activer la suppresion</button>
                    </div>
                    <div class="col-2" style="position: relative;">
                        <button type="button" @click="updateAdding()" class="btn btn-outline-green" style="position: absolute;top:50%;transform: translateY(-50%);">Activer l'ajout</button>
                    </div>
                    <div class="col-4"></div> -->
                </div>
                
                
                <MachineCard 
                    v-for="machine in machineList" 
                    v-bind:key="machine.machine_id" 
                    :machineId="machine.machine_id" 
                    :machineTitle="machine.machine_title" 
                    :machineBrand="machine.machine_brand" 
                    :machineReference="machine.machine_reference" 
                />
                
                <CreateMachine />
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CreateMachine from '@/components/CreateMachine/CreateMachine.vue';
    import MachineCard from '@/components/MachineCard/MachineCard.vue';
    import { Machine } from '@/services/Types';
    import { getMachineList } from './functions/getMachineList';

    @Component({
        components: {
            CreateMachine,
            MachineCard
        }
    })
    export default class Machines extends Vue {

        machineList: Machine[] = [];

        async mounted(): Promise<void> {
            this.machineList = await getMachineList();
        }

    }
</script>