<template>
    <base-layout>
        <div class="title-and-button">
            <ion-back-button text="back" default-href="/point_exchange">
            </ion-back-button>
        </div>

        <ion-text>
            <h1>Point Exchange Request Properties</h1>
        </ion-text>

        <ion-grid>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Request ID</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{ pointExchangeDetails?.transactionID }}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">User ID</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{pointExchangeDetails?.userID}}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Username</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{pointExchangeDetails?.username}}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Email</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{pointExchangeDetails?.email}}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Requested Amount</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{ `Rp${pointExchangeDetails?.requested_point}` }}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Request Creation Date</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{ pointExchangeDetails?.transactionDate }}</p>
                </ion-col>
            </ion-row>
            <ion-row v-if="pointExchangeDetails?.modified_at">
                <ion-col size="2">
                    <p class="parameters">Last Modified</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{ pointExchangeDetails.modified_at }}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    <p class="parameters">Status</p>
                </ion-col>
                <ion-col size="5">
                    <p>{{ pointExchangeDetails?.status }}</p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="2">
                    &nbsp;
                </ion-col>
                <ion-col size="5">
                    <ion-button color="success" :disabled="pointExchangeDetails?.status==='COMPLETED'">
                        Approve
                    </ion-button>
                    <ion-button color="danger" :disabled="pointExchangeDetails?.status==='COMPLETED'">
                        Deny
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>

    </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue';
import { apiRequest, ApiRequestMethods } from '@/utils/http';
import { convertTZ } from '@/utils/convertDateStringTimezone';
import {
    IonText,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    onIonViewWillEnter
    // IonIcon
} from '@ionic/vue';
// import {eye} from "ionicons/icons";
import {ref} from "vue";
import { useRoute } from 'vue-router';
// import { ApiRequestMethods, apiRequest } from '@/utils/http';
// import { convertTZ } from '@/utils/convertDateStringTimezone';

interface PointExchangeDetails{
  "transactionID": number,
  "transactionDate": string,
  "userID": number,
  "requested_point": number,
  "status": string,
  "modified_at": string | null,
  "email": string,
  "username": string
}

const route = useRoute();
const transactionID = route.params.id;
const pointExchangeDetails = ref<PointExchangeDetails | null>(null);

// const fetchData = async () => {
//     try {
//         const response = await apiRequest("/rvm/list", ApiRequestMethods.GET);

//         response.data.forEach((data: RVMData) => {
//             data.registrationDate = convertTZ(data.registrationDate, "Asia/Jakarta");
//         })
//         rvmData.value = response.data;
//     } catch (error) {
//         console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
//     }
// }

onIonViewWillEnter(async () => {
    try{
        console.log(transactionID);
        const response = await apiRequest(`/point_exchange/list/${transactionID}`, ApiRequestMethods.GET);
        console.log(response);
        
        response.data.transactionDate = convertTZ(response.data.transactionDate, "Asia/Jakarta");
        if(response.data.modified_at){
            response.data.modified_at = convertTZ(response.data.modified_at, "Asia/Jakarta");
        }
        pointExchangeDetails.value = response.data;
    } catch (err){
        console.log(`Cannot retrieve details with error: \n${err}`)
    }
})

</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 7;
}

ion-col p{
    margin-bottom: 5px;
    margin-top: 9px;
}

.parameters{
    font-weight: 500;
}

.title-and-button {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
}

.title-and-button ion-button {
    height: 70%;

}
</style>