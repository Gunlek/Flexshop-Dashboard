<template>
    <nav>
        <h2 class="brand-name">Flexshop</h2>
        <hr>
        <ul>
            <li :class="currentPage == 'Workshops' && 'active'"><router-link to="/workshops">Ateliers</router-link></li>
            <li :class="currentPage == 'Machines' && 'active'"><router-link to="/machines">Machines</router-link></li>
            <li :class="currentPage == 'Tutorials' && 'active'"><router-link to="/tutorials">Tutoriels</router-link></li>
        </ul>

        <div class="bottom">
            <ul>
                <li :class="currentPage == 'Options' && 'active'"><router-link to="/settings">Options</router-link></li>
                <li :class="currentPage == 'Credits' && 'active'"><router-link to="/credits">Crédits</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Watch, Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Sidebar extends Vue {

        currentPage = this.$route.name;
        
        @Watch("$route.name")
        routeChange(to: string){
            this.currentPage = to;
        }

    }
</script>