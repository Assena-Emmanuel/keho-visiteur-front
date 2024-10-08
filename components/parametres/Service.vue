<script>
    export default{
        data(){
            return{
            title: 'Liste des Services',
            data: [
                {
                    Code: 'S001',
                    Libelle: 'Service de Consultation',
                    "Ajouté le": '2024-10-01',
                },
                {
                    Code: 'S002',
                    Libelle: 'Service de Livraison',
                    "Ajouté le": '2024-10-02',
                },
                {
                    Code: 'S003',
                    Libelle: 'Service d’Assistance',
                    "Ajouté le": '2024-10-03',
                },
            ],
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
    <Tableau :fields="fields" :data="data" :title="title" :show-addbtn="true" :typeForme="'service'" />
</template>