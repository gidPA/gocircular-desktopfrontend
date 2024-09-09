<template>
    <base-layout>
        <ion-text>
            <h1>Transaction History</h1>
        </ion-text>

        <ion-grid>
            <ion-row>
                <ion-col size="2">ID</ion-col>
                <ion-col size="5">Timestamp</ion-col>
                <ion-col size="2">User</ion-col>
                <ion-col size="2">RVM</ion-col>
                <ion-col size="1">Qty.</ion-col>
                <ion-col size="2">Points Granted</ion-col>
                <ion-col size="4">Actions</ion-col>
            </ion-row>

            <ion-row v-for="transaction in transactionData" :key="transaction.transactionID">
                <ion-col size="2">{{ transaction.transactionID }}</ion-col>
                <ion-col size="5">{{ transaction.transactionDate }}</ion-col>
                <ion-col size="2">{{ transaction.username }}</ion-col>
                <ion-col size="2">{{ transaction.rvmID }}</ion-col>
                <ion-col size="1">{{ transaction.item_amount }}</ion-col>
                <ion-col size="2">{{ transaction.total_point }}</ion-col>
                <ion-col size="4">
                    <ion-icon :icon="eye"></ion-icon>
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>

</template>

<script setup lang="ts">
import {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
} from '@ionic/vue';
import {eye} from "ionicons/icons"
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted } from 'vue';
import { apiRequest, ApiRequestMethods } from "../utils/http";
import { convertTZ } from '@/utils/convertDateStringTimezone';


interface TransactionData {
    transactionID: number,
    transactionDate: string,
    status: string,
    userID: number,
    username: string,
    rvmID: number,
    item_amount: number,
    total_point: number
}

const transactionData = ref([] as Array<TransactionData>)

const fetchData = async () => {
    try {
        const response = await apiRequest("/transaction/list", ApiRequestMethods.GET);

        response.data.forEach((data: TransactionData) => {
            data.transactionDate = convertTZ(data.transactionDate, "Asia/Jakarta");
        })
        transactionData.value = response.data;
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

onMounted(async () => {
    console.log("testing heughaeughe");
    await fetchData();
})
</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 18;
}

ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}
</style>