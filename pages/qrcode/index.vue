<template>
    <div>
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
      <p>Résultat du QR Code : {{ decodedResult }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        decodedResult: ''
      }
    },
    methods: {
      onDecode(result) {
        this.decodedResult = result
      },
      onInit(promise) {
        promise.catch(error => {
          console.error(error)
          alert('Impossible d’accéder à la caméra.')
        })
      }
    }
  }
  </script>