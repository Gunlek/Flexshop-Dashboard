<template>
    <div style="padding: 15px 15px;">
        <h1>Crédits</h1><br/>
        <p>Sur une idée originale de Adrien Van Gorp, projet porté et développé par Fabien AUBRET et Grégoire NIAU</p>
        <br/><br/>
        <h3>Contacts</h3>
        <ul>
            <li>Fabien AUBRET
                <ul>
                    <li>Responsable de projet, Développeur</li>
                    <li>Etudiant ingénieur (Mécanique, Fabrication, Industrialisation)</li>
                    <li>Arts et Métiers ParisTech - Promotion Li218</li>
                    <li>Développeur amateur (FullStack)</li>
                    <li>Contact: <a href="fabien.aubret@gadz.org">fabien.aubret@gadz.org</a></li>
                </ul>
            </li>

            <li>Grégoire NIAU
                <ul>
                    <li>Co-Leader projet, Développeur</li>
                    <li>Etudiant ingénieur (Mécanique, Fabrication, Industrialisation)</li>
                    <li>Arts et Métiers ParisTech - Promotion Li218</li>
                    <li>Développeur amateur (Python, Flutter, Web)</li>
                    <li>Contact: <a href="gregoire.niau@gadz.org">gregoire.niau@gadz.org</a></li>
                </ul>
            </li>
        </ul>
        <p>Avec la participation bienveillante et le conseil éclairé de Jérôme Gavois et Adrien Van Gorp</p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Credits extends Vue {

    }
</script>