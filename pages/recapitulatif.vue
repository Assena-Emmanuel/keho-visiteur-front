<template>
    <div id="msg">
        <div class="d-flex justify-content-center" id="id-logo">
            <div>
                <img src="/images/total-removebg.png" id="img-log" alt="logo-light" />
            </div>
        </div>
      <BCard
        border-variant="secondary"
        class="rounded-0"
        style="background-color: white; width: 350px; margin-top: 1em;"
      >
        <div class="">
            <div><span>Code Visiteur :</span> ---------------</div>
            <div><span>Nom & Prénoms :</span> KOFFI Jean Luc</div>
            <div><span>Pièce :</span> CNI</div>
            <div><span>N° CNI :</span> C0076453691</div>
            <div><span>Société :</span> Keho Groupe</div>
            <div><span>Contact :</span> +225 07 07 14 25 36</div>
        </div>
      </BCard>
      <BCard
        border-variant="secondary"
        class="rounded-0 mt-3"
        style="background-color: white; width: 350px; margin-top: 1em;"
      >
        <div class="">
            <div><span>Code Visiteur :</span> ---------------</div>
            <div><span>Nom & Prénoms :</span> ZIE Jean Luc</div>
            <div><span>Pièce :</span> CNI</div>
            <div><span>N° CNI :</span> C0076453691</div>
            <div><span>Société :</span> Keho Groupe</div>
            <div><span>Contact :</span> +225 07 07 14 25 36</div>
        </div>
      </BCard>
    </div>
  </template>
  
  <script>
  definePageMeta({
        layout: "recap"
    });

  
  export default {

    setup() {
      return {  };
    },
    data() {
      return {
        
      };
    },
    methods: {
     
    }

  }
</script>


<style>
    #id-logo {
  @media (max-width: 576px) {
    margin-top: 2em;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    margin-top: 3em;
  }

  @media (min-width: 992px) {
    margin-top: 3em;
  }
}
#img-log {
  @media (max-width: 576px) {
    height: 90px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    height: 110px;
  }

  @media (min-width: 992px) {
    height: 130px;
  }
}
</style>