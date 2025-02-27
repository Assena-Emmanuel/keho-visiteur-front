<template>
    <DashboardCommonStat v-model:stat="stat" />
    <BRow>
        <BCol lg="6">
            <DashboardCommonDiagramme />
        </BCol>
        <BCol lg="6">
            <DashboardCommonHistogramme />
        </BCol>
    </BRow>
    <DashboardCommonTendanceVisite />
</template>
<script setup>
import { reject } from 'lodash-es';
import apiClient from '../api/intercepteur';
import { useAuthStore } from "~/stores/auth.js";

const authStore = useAuthStore()
const visites = ref([])

const stat = ref({recu:0, rejeter:0, total:0})

// Appel initial pour charger les données
onMounted( async () => {
    let params = {}

    if(authStore.user.role_id == 1){
        params = {
            page: 1,
            limit: 5,
            sort_type: 1,
        }
    }else{
        params = {
            page: 1,
            limit: 5,
            sort_type: 2,
            code_employe: authStore.user.visite?.code_visite,
        }
    }
    
    const response = await apiClient.get("/fvisites/lvisite", {
      params: params,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },

    });
    

    if(!response.data.error){
        visites.value = response.data.data
        let annuler = []
        let recu = []
        
        visites.value.data.forEach(element => {
            if(element.statut == 3){
                
                annuler.push(element)
            }
            if(element.statut == 4){
                recu.push(element)
            }
        });
        
        stat.value.recu = recu.length,
        stat.value.rejeter = annuler.length
        stat.value.total = visites.value.total
        console.log("-----------: "+JSON.stringify(stat.value))

    }else{
        console.error("Menu error: "+response.message)

    }
  
});


</script>