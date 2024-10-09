<script>
    export default{
        data(){
            return{
            title: 'Liste des Services',
            data: [
                { Code: 'DEP001', Libelle: 'Informatique', Département: 'Technologie', 'Ajouté le': '2024-01-10', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP002', Libelle: 'Ressources Humaines', Département: 'Administration', 'Ajouté le': '2024-02-15', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP003', Libelle: 'Marketing', Département: 'Commercial', 'Ajouté le': '2024-03-22', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP004', Libelle: 'Comptabilité', Département: 'Finance', 'Ajouté le': '2024-04-05', Actions: 'Modifier/Supprimer' },
                { Code: 'DEP005', Libelle: 'Développement', Département: 'Technologie', 'Ajouté le': '2024-05-18', Actions: 'Modifier/Supprimer' }
            ],
            fields: [
                {
                key: "Code",
                },
                {
                key: "Libelle",

                },{
                key: "Département",

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