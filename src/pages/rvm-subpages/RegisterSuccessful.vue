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

<script setup lang="ts">
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
import { ref, computed} from 'vue';
import QRCode from 'qrcode';
import { useRoute, } from 'vue-router';

const route = useRoute();

// Define the computed property and handle potential types (array, string, null)
const queryId = computed(() => {
    const base64Text = route.query.data_b64;
    return Array.isArray(base64Text) ? base64Text[0] : base64Text; // Handle array case, return first element
});

const qrCodeImageUrl = ref(null)

// Computed property that works with the queryId
onIonViewWillEnter(async () => {
    try{
        const base64Text = queryId.value;
        console.log(base64Text)
        const data = JSON.parse(window.atob(base64Text));
        qrCodeImageUrl.value = await QRCode.toDataURL(JSON.stringify(data) || ' ', {
            width: 200,
            margin: 1,
        })

    } catch (error) {
        console.error('Error generating QR code:', error)
    }
});

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