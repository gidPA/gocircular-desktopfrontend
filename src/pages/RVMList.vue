<template>
    <base-layout>
        <div class="title-and-button">
            <ion-text>
                <h1>RVM List</h1>
            </ion-text>
            <ion-button size="default">
                Register New RVM
            </ion-button>
        </div>


        <ion-grid>
            <ion-row>
                <ion-col size="1">RVM ID</ion-col>
                <ion-col size="3">Registration Date</ion-col>
                <ion-col size="2">Transaction Count</ion-col>
                <ion-col size="2">Total Transaction Point</ion-col>
            </ion-row>

            <ion-row v-for="rvm in rvmData" :key="rvm.rvmID">
                <ion-col size="1">{{ rvm.rvmID }}</ion-col>
                <ion-col size="3">{{ rvm.registrationDate }}</ion-col>
                <ion-col size="2">{{ rvm.transactionCount }}</ion-col>
                <ion-col size="2">{{ rvm.totalRVMPoint }}</ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue';
import {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
    // IonIcon
} from '@ionic/vue';
// import {eye} from "ionicons/icons";
import {ref, onMounted} from "vue";
import { ApiRequestMethods, apiRequest } from '@/utils/http';
import { convertTZ } from '@/utils/convertDateStringTimezone';

interface RVMData {
    rvmID: number,
    registrationDate: string,
    transactionCount: number,
    totalRVMPoint: number,
}

const rvmData = ref([] as Array<RVMData>)

const fetchData = async () => {
    try {
        const response = await apiRequest("/rvm/list", ApiRequestMethods.GET);

        response.data.forEach((data: RVMData) => {
            data.registrationDate = convertTZ(data.registrationDate, "Asia/Jakarta");
        })
        rvmData.value = response.data;
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

onMounted(async () => {
    console.log("testing hehehaha");
    await fetchData();
})

</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 8;
}

ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}

.title-and-button{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
}

.title-and-button ion-button{
    height: 70%;

}
</style>