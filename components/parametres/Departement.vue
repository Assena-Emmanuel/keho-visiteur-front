<script>
    export default{
        data(){
            return{
            title: 'Liste des Départements'
            ,
            fields: [
                {
                key: "Code",
                },
                {
                key: "Libelle",

                },
                {
                key: "Ajouté le",

                },
                {
                key: "Actions",

                },
            ]
            }
        }
    }
</script>
<template>
    <Tableau :fields="fields" :title="title" :show-addbtn="true" :typeForme="'departement'" />
</template>