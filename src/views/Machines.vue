<template>
    <transition name="slide">
        <div class="machines">
            <div :class="$store.state.edition ? 'table-body horizontal-table modal-open' : 'table-body horizontal-table '">
                <div class="row">
                    <div class="col-4"><h1 class="table-title">Gestion des machines</h1></div>
                    <div class="col-2"></div>
                    <div class="col-3" style="position: relative;">
                        <button type="button" @click="updateDelete()" class="btn btn-outline-red" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer la suppresion</button>
                    </div>
                    <div class="col-3" style="position: relative;">
                        <button type="button" @click="updateAdding()" class="btn btn-outline-green" style="max-width: 100%; position: absolute; top: 50%; transform: translateY(-50%);">Activer l'ajout</button>
                    </div>
                </div>
                
                
                <MachineCard 
                    v-for="machine in $store.state.machines" 
                    :key="machine.machine_id" 
                    :machineId="machine.machine_id" 
                    :machineTitle="machine.machine_title" 
                    :machineBrand="machine.machine_brand" 
                    :machineReference="machine.machine_reference" 
                />
                
                <CreateMachine />
            </div>

            <EditParameterModal />
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CreateMachine from '@/components/CreateMachine/CreateMachine.vue';
    import MachineCard from '@/components/MachineCard/MachineCard.vue';
    import { Machine } from '@/services/Types';
    import EditParameterModal from '@/components/EditParameterModal/EditParameterModal.vue';

    @Component({
        components: {
            CreateMachine,
            MachineCard,
            EditParameterModal
        }
    })
    export default class Machines extends Vue {

        machineList: Machine[] = [];

        async mounted(): Promise<void> {
            this.$store.dispatch("refreshMachines");
        }

        updateAdding(): void {
            this.$store.dispatch("setAddition", !this.$store.state.enableAdding);
        }

        updateDelete(): void {
            this.$store.dispatch("setDeletion", !this.$store.state.enableDelete);
        }
    }
</script>