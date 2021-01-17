<template>
    <transition name="fade">
        <div class="workshops">
            <h1>Workshops</h1>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Workshops extends Vue {}
</script>