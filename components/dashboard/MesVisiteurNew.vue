<template>
    <DashboardCommonStat />

    <BCard  style="min-height: 10em;">
        <BCardBody>
        <div>
            <div class="flex items-center justify-between mb-5">
                <h2 class="text-3xl">Visites enregistrées</h2>
            </div>
            <!-- <pre>{{ rows }}</pre> -->

            <div class="mb-5">
                <input v-model="params.search" type="text" class="form-input max-w-xs" placeholder="Search..." />
            </div>

            <vue3-datatable
                :rows="rows"
                :columns="cols"
                :loading="loading"
                :totalRows="total_rows"
                :isServerMode="true"
                :pageSize="params.limit"
                :pageSizeOptions="arrayLine"
                :showNumbersCount="3"
                class="alt-pagination"
                @change="changeServer"
            >
                <template #Actions="data">
                    <div class="d-flex flex-row align-items-center gap-2">  <!-- Ajout de la classe d-flex flex-row -->
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="text-primary justify-content-center align-items-center" @click="showDetailsModal">
                            <i class="fas fa-eye font-size-15"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="mr-1 fw-bold text-warning justify-content-center align-items-center" @click="handleEdit(row.index, data)" v-b-tooltip.hover.bottom="'rejeter'">
                            <i class="uil uil-ban font-size-15 annuler"></i>
                        </BButton>
                        <BButton style="width: 15px; height: 15px;" variant="white" size="sm" class="px-2 text-danger justify-content-center align-items-center" @click="confirmDelete(row.item.Code)">
                            <i class="uil uil-trash-alt font-size-15"></i>
                        </BButton>
                    </div>
                </template>
            </vue3-datatable>



        </div>
    </BCardBody>
    </BCard>
</template>


<script setup>
    import { ref, toRaw } from 'vue';
    import { useAuthStore } from '~/stores/auth.js';
    import apiClient from '../api/intercepteur';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
   


    const loading = ref(true);
    const total_rows = ref(0);
    const authStore = useAuthStore();
    const arrayLine = ref([5, 10, 15, 20, 25])

    const params = reactive({
        page: 1,
        limit: 5,
        sort_type: 1,
        code_employe: authStore.user.visite.code_visite,
    });


    // const params = reactive({ current_page: 1, pagesize: 10 });
    const rows= ref([]);

    const cols = ref([
        { field: 'created_at', title: 'Date', width: "8" },
        { field: 'visiteur', title: 'Nom & Prénoms', width: "8" },
        { field: 'numero_piece', title: 'CNI', width: "8" },
        { field: 'entreprise', title: 'Société', width: "8" },
        { field: 'code_visiteur', title: 'Code visiteur', width: "8" },
        { field: 'code_visite', title: 'Code visite', width: "8" },
        { field: 'employe', title: 'Employé', width: "8" },
        { field: 'lib_visite', title: 'Visite', width: "8" },
        { field: 'heure_entree', title: 'H entrée', width: "8"},
        { field: 'lib_statut', title: 'statut', width: "8"},
        { field: 'heure_fin', title: 'H Sortie', width: "8" },
        { field: 'Actions', title: 'Actions'},
    ]) || [];

    onMounted(() => {
        getVisitors();

    });
    const getVisitors = async () => {
        
        try {
            loading.value = true;

            const response = await apiClient.get('/fvisites/lvisite', {
                params: {
                    page: params.page, // Pas besoin de `.value`
                    limit: params.limit, // Pas besoin de `.value`
                    sort_type: params.sort_type, // Pas besoin de `.value`
                    code_employe: params.code_employe // Pas besoin de `.value`
                },
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });
            if(!response.data.error){
                const data = response.data.data;
                rows.value = data?.data;
                total_rows.value = response.data.data.total;

                console.log("-------Données affectées à rows.value :--------", JSON.stringify(response.data.data.total));


            }else{
                alert(3)
            }
            
        } catch(e) {
            console.error("Error lors de la recuperation des données: "+e)
        }

        loading.value = false;
    };
    const changeServer = (data) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;

        getVisitors();
    };

    // // disable first last pagination
    // const loading1: any = ref(true);
    // const total_rows1 = ref(0);

    // const params1 = reactive({ current_page: 1, pagesize: 10 });
    // const rows1: any = ref(null);

    // const cols1 =
    //     ref([
    //         { field: 'id', title: 'ID', isUnique: true, type: 'number' },
    //         { field: 'firstName', title: 'First Name' },
    //         { field: 'lastName', title: 'Last Name' },
    //         { field: 'email', title: 'Email' },
    //         { field: 'age', title: 'Age', type: 'number' },
    //         { field: 'dob', title: 'Birthdate', type: 'date' },
    //         { field: 'address.city', title: 'City' },
    //         { field: 'isActive', title: 'Active', type: 'bool' },
    //     ]) || [];

    // const getVisitors1 = async () => {
    //     try {
    //         loading1.value = true;

    //         const response = await fetch('/api/user', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(toRaw(params1)),
    //         });

    //         const data = await response.json();

    //         rows1.value = data?.data;
    //         total_rows1.value = data?.meta?.total;
    //     } catch {}

    //     loading1.value = false;
    // };
    // const changeServer1 = (data: any) => {
    //     params1.current_page = data.current_page;
    //     params1.pagesize = data.pagesize;

    //     getVisitors1();
    // };

</script>
<style>

    .alt-pagination .bh-pagination .bh-page-item {
        @apply !w-max min-w-[30px] !rounded;
    }

    .next-prev-pagination .bh-pagination .bh-page-item {
        @apply !w-max min-w-[100px] !rounded;
    }
    .next-prev-pagination .bh-pagination > div:first-child {
        @apply flex-col font-semibold;
    }
    .next-prev-pagination .bh-pagination .bh-pagination-number {
        @apply mx-auto gap-3;
    }
</style> 