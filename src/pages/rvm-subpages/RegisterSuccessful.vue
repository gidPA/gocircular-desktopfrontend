<template>
    <base-layout>
        <div class="title-and-button">
            <ion-back-button text="back" default-href="/rvm">
            </ion-back-button>
        </div>
        <ion-text>
            <h1>RVM Successfully Registered</h1>
        </ion-text>
        <div class="qr-code-generator">
            <div v-if="qrCodeImageUrl">
                <img :src="qrCodeImageUrl" alt="QR Code" />
                <a :href="qrCodeImageUrl" download="qrcode.png">Download QR Code</a>
            </div>
        </div>
    </base-layout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import {
    IonText,
    IonBackButton,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    onIonViewWillEnter
    // IonIcon
} from '@ionic/vue';
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

const text = ref('')
const qrCodeImageUrl = ref(null)

const generateQRCode = async () => {
    try {
        qrCodeImageUrl.value = await QRCode.toDataURL(text.value || ' ', {
            width: 200,
            margin: 1,
        })
    } catch (error) {
        console.error('Error generating QR code:', error)
    }
}

// Watch text input and update QR code whenever the text changes
watch(text, generateQRCode)
</script>

<style scoped>
.qr-code-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

input {
    padding: 8px;
    font-size: 16px;
}

img {
    width: 200px;
    height: 200px;
    margin-top: 10px;
}

a {
    margin-top: 10px;
    font-size: 16px;
    color: blue;
    text-decoration: underline;
}
</style>