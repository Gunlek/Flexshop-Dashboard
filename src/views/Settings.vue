<template>
    <div style="padding: 0 15px;">
        <h1>Options suplémentaires</h1><br/>
        <h3>Importation / Exportation des bases de données</h3>
        <div class="row">
            <div class="col-4">
                <a href="/export-json" class="btn btn-blue content-fluid">
                    <center>Exporter</center>
                </a>
            </div>
            <div class="col-8">
                <form action="/import-json" method="POST" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-6">
                            <center><input type="file" accept=".json" name="import_file" /></center>
                        </div>
                        <div class="col-6">
                            <input type="submit" class="btn btn-blue content-fluid" value="Importer" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <a href="/purge-database" class="btn btn-outline-red content-fluid"><i class="fas fa-exclamation-triangle"></i> Purger la base de données <i class="fas fa-exclamation-triangle"></i></a>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Settings extends Vue {
        // TODO
    }
</script>