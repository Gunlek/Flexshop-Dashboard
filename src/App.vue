<template>
  <div id="app">
    <header>
        <nav>
            <h2 class="brand-name">Flexshop</h2>
            <hr>
            <ul>
              <li><router-link to="/workshops">Ateliers</router-link></li>
              <li><router-link to="/categories">Catégories</router-link></li>
              <li><router-link to="/machines">Machines</router-link></li>
            </ul>

            <div class="bottom">
                <ul>
                    <li><router-link to="/settings">Options</router-link></li>
                    <li><router-link to="/credits">Crédits</router-link></li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

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
