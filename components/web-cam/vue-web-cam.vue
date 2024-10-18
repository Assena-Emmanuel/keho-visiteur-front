<template>

  <client-only>
    <web-cam
      :resolution="{ width: 1280, height: 720 }"
      @started="onStarted"
      @stopped="onStopped"
      @error="onError"
      ref="webcamRef"
    />
    <button @click="capturePhoto">Capturer une photo</button>
    <img v-if="photo" :src="photo" alt="Captured Image"/>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';
import WebCam from 'vue-web-cam';

const photo = ref(null);
const webcamRef = ref(null);

const onStarted = () => {
  console.log('Webcam started');
};

const onStopped = () => {
  console.log('Webcam stopped');
};

const onError = (error) => {
  console.error('Webcam error:', error);
};

const capturePhoto = () => {
  photo.value = webcamRef.value.capture();
};
</script>

