<template>
    <!-- <div>
      <p class="decode-result">
        Last result: <b>{{ result }}</b>
      </p>
  
      <div>
        <qrcode-stream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        />
      </div>
    </div> -->
    <div class="qr-page">
      <div class="text-center instruction">
        Veuillez scanner le QR-Code en maintenant l'image au centre
        <p class="decode-result">
        Last result: <b>{{ result }}</b>
      </p>
  
      </div>
      <div class="qr-container">
        <div class="camera-box">
          <qrcode-stream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        />
        </div>
      </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
  
  /*** detection handling ***/
  definePageMeta({
    layout: "utility"
  });
  
  const result = ref('')
  
  function onDetect(detectedCodes) {
    console.log(detectedCodes)
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
  }
  
  /*** select camera ***/
  
  const selectedConstraints = ref({ facingMode: 'environment' })
  const defaultConstraintOptions = [
    { label: 'rear camera', constraints: { facingMode: 'environment' } },
    { label: 'front camera', constraints: { facingMode: 'user' } }
  ]
  const constraintOptions = ref(defaultConstraintOptions)
  
  async function onCameraReady() {
    // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
    // camera access permission. `QrcodeStream` internally takes care of
    // requesting the permissions. The `camera-on` event should guarantee that this
    // has happened.
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')
  
    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label} (ID: ${deviceId})`,
        constraints: { deviceId }
      }))
    ]
  
    error.value = ''
  }
  
  /*** track functons ***/
  
  function paintOutline(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
  
      ctx.strokeStyle = 'red'
  
      ctx.beginPath()
      ctx.moveTo(firstPoint.x, firstPoint.y)
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y)
      }
      ctx.lineTo(firstPoint.x, firstPoint.y)
      ctx.closePath()
      ctx.stroke()
    }
  }
  function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height }
      } = detectedCode
  
      ctx.lineWidth = 2
      ctx.strokeStyle = '#007bff'
      ctx.strokeRect(x, y, width, height)
    }
  }
  function paintCenterText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const { boundingBox, rawValue } = detectedCode
  
      const centerX = boundingBox.x + boundingBox.width / 2
      const centerY = boundingBox.y + boundingBox.height / 2
  
      const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
  
      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.textAlign = 'center'
  
      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(detectedCode.rawValue, centerX, centerY)
  
      ctx.fillStyle = '#5cb984'
      ctx.fillText(rawValue, centerX, centerY)
    }
  }
  const trackFunctionOptions = [
    { text: 'nothing (default)', value: undefined },
    { text: 'outline', value: paintOutline },
    { text: 'centered text', value: paintCenterText },
    { text: 'bounding box', value: paintBoundingBox }
  ]
  const trackFunctionSelected = ref(trackFunctionOptions[1])
  
  /*** barcode formats ***/
  
  const barcodeFormats = ref({
    aztec: false,
    code_128: false,
    code_39: false,
    code_93: false,
    codabar: false,
    databar: false,
    databar_expanded: false,
    data_matrix: false,
    dx_film_edge: false,
    ean_13: false,
    ean_8: false,
    itf: false,
    maxi_code: false,
    micro_qr_code: false,
    pdf417: false,
    qr_code: true,
    rm_qr_code: false,
    upc_a: false,
    upc_e: false,
    linear_codes: false,
    matrix_codes: false
  })
  const selectedBarcodeFormats = computed(() => {
    return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
  })
  
  /*** error handling ***/
  
  const error = ref('')
  
  function onError(err) {
    error.value = `[${err.name}]: `
  
    if (err.name === 'NotAllowedError') {
      error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
      error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
      error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
      error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
      error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
      error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
      error.value +=
        'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      error.value += err.message
    }
  }
  </script>

<style scoped>
.qr-page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  
}

.instruction {
  margin-top: 3em;
  font-size: 2.5rem;
  color: white;

  @media (max-width: 1200px) {
    font-size: 2.5rem; 
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }

  @media (max-width: 320px) {
    font-size: 25px;
}
}

.qr-container {
  display: flex;
  justify-content: center;
}

.camera-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  border: 4px solid #ccc;
  margin-top: 3em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(172, 171, 171, 0.1); /* Slight shadow for depth */

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
    margin-top: 4em;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    margin-top: 6em;
  }

  /* @media (max-width: 320px) {
    width: 200px;
    height: 200px;
    margin-top: 3em;
} */
}

.error {
    font-weight: bold;
    color: red;
  }
  .barcode-format-checkbox {
    margin-right: 10px;
    white-space: nowrap;
    display: inline-block;
  }


</style>

  
