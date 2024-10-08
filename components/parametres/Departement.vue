<script>
    export default{
        data(){
            return{
            title: 'Liste des Départements',
            data: [
                {
                    Code: "DPT001",
                    Libelle: "Informatique",
                    "Ajouté le": "2024-09-30",
                },
                {
                    Code: "DPT002",
                    Libelle: "Ressources Humaines",
                    "Ajouté le": "2024-10-01",
                },
                {
                    Code: "DPT003",
                    Libelle: "Marketing",
                    "Ajouté le": "2024-10-05",
                }
            ]
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
    <Tableau :fields="fields" :data="data" :title="title" :show-addbtn="true" :typeForme="'departement'" />
</template>