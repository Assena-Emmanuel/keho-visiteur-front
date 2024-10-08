<script>
import { title } from 'process';


export default{
    data(){
        return{
            title: 'Visites enregistrées'
            ,
            fields: [
                {
                key: "Date",

                },
                {
                key: "Nom & Prénoms",

                },
                {
                key: "Société",

                },
                {
                key: "Employé",

                },
                {
                key: "Visite",
                },
                {
                key: "H entrée",
                },
                {
                key: "Statut",
                },
                {
                key: "H statut",
                },
                {
                key: "H sortie",
                },
                {
                key: "écart",
                },
            ]
        }
    }
}
</script>

<template>
    <Tableau :fields="fields" :title="title" />
</template>