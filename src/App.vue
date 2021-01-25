<template>
  <div id="app">
    <header>
        <Sidebar />
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer>Développé par Hard Win's 58Li218 et Squall's 4Li218</footer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Sidebar from '@/components/Sidebar.vue';

  @Component({
    components: {
      Sidebar
    }
  })
  export default class App extends Vue {

  }
</script>

<style>
  @import 'assets/css/style.css';

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
