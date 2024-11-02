<template>
    <div id="msg">
    <BCard
        no-body 
        class="mx-3 border-0"
        title="Je m'identifie"
        style="background-color: white; width: 300px;"
        id="qr-topbar"
    >
        <BCardBody>
            
            <div class="d-flex justify-content-center">
                <div>
                    <img src="/images/total.jpg" alt="logo-light" height="150" />
                </div>
            </div>
            <div class="text-center text-secondary" style="margin: 2em 0 5em 0;">
                <h5 class="text-secondary fw-bold">Merci pour votre <br> visite chaleureuse.</h5>
                <div style="margin-top: 3em;">
                    <h4 class="text-secondary">AUREVOIR</h4>
                </div>
            </div>
        </BCardBody>
    </BCard>
    </div>
</template>
  
<script>
    definePageMeta({
        layout: "utility"
    });
    export default {
       
    };

</script>

<style>
.bg-card {
    background-color: rgba(204, 200, 200, 0.5); /* Gris avec 50% de transparence */
}
#qr-topbar{
    margin-top: 8em;
}

#msg{
    height: 80vh;

}

@media (max-width: 576px) {
  #qr-topbar{
    margin-top: 10em;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #qr-topbar{
    margin-top: 8em;
  }
}

@media (min-width: 992px) {
 
}

</style>

