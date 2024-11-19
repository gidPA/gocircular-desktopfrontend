<template>
    <base-layout>
        <div class="title-and-button">
            <ion-text>
                <h1>RVM List</h1>
            </ion-text>
            <ion-button size="default" @click="registerNewRVM()">
                Register New RVM
            </ion-button>
        </div>


        <ion-grid>
            <ion-row class="table-header">
                <ion-col size="1">RVM ID</ion-col>
                <ion-col size="3">Registration Date</ion-col>
                <ion-col size="2">Transaction Count</ion-col>
                <ion-col size="2">Total Transaction Point</ion-col>
                <ion-col size="2">Status</ion-col>
            </ion-row>

            <ion-row v-for="rvm in rvmData" :key="rvm.rvmID">
                <ion-col size="1">{{ rvm.rvmID }}</ion-col>
                <ion-col size="3">{{ rvm.registrationDate }}</ion-col>
                <ion-col size="2">{{ rvm.transactionCount }}</ion-col>
                <ion-col size="2">{{ rvm.totalRVMPoint }}</ion-col>
                <ion-col size="2">{{ verboseStatus(rvm.status) }}</ion-col>
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
import {useRouter} from 'vue-router';
import { ApiRequestMethods, apiRequest } from '@/utils/http';
import { convertTZ } from '@/utils/convertDateStringTimezone';

interface RVMData {
    rvmID: number,
    registrationDate: string,
    transactionCount: number,
    totalRVMPoint: number,
    status: string
}


const router = useRouter();
const rvmData = ref([] as Array<RVMData>);

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

const registerNewRVM = () => {
    console.log("registering...")
    router.push('/rvm/register');
}

const verboseStatus = (status: string) => {
    switch(status){
        case "OFFLINE":
            return "Offline";
        case "ONLINE_IDLE":
            return "Online - Idle";
        case "ONLINE_BUSY":
            return "Online - Busy";
        case "ERROR_BIN_FULL":
            return "Error - Bin is currently full";
        case "ERROR_COIN_EMPTY":
            return "Error - Ran out of coins";
        case "ERROR_OTHER":
            return "Error - Unknown error reported";
        default:
            return "Error - invalid error reported";
    }
}

onMounted(async () => {
    console.log("testing hehehaha");
    await fetchData();
})

</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 10;
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

.table-header{
    font-weight: bold;
}
</style>