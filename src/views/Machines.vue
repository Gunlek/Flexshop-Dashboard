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

                <CreateMachine />
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CreateMachine from '@/components/CreateMachine/CreateMachine.vue';

    @Component({
        components: {
            CreateMachine
        }
    })
    export default class Machines extends Vue {}
</script>