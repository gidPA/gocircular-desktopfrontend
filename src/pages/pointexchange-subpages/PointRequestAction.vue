<template>
    <base-layout>
        <ion-toast
            :is-open="isToastOpen"
            :message="toastMessage"
            :color="toastColor"
            @didDismiss="setToastState(false)"
            duration="4000"
            position="top"
        >
        </ion-toast>
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
                    <ion-button 
                        color="success" 
                        :disabled="pointExchangeDetails?.status!=='PENDING'"
                        @click="approveExchange"
                    >
                        Approve
                    </ion-button>
                    <ion-button color="danger" :disabled="pointExchangeDetails?.status!=='PENDING'">
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
    IonToast,
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
const isToastOpen = ref(false);
const toastMessage = ref("");
const toastColor=ref("");

const setToastState = (isOpen: boolean, message: string = "", colorTheme: string = "success") => {
    if (!isOpen){
        isToastOpen.value = false;
    } else {
        isToastOpen.value = true;
        toastMessage.value = message;
        toastColor.value = colorTheme;
    }
}

const approveExchange = async () => {
    try{
        if(!pointExchangeDetails.value?.transactionID){
            throw new Error("Transaction ID was not fetched from API");
        }

        const response = await apiRequest('/point_exchange/approve', ApiRequestMethods.PUT, 
            {
                data : {
                    exchangeID: pointExchangeDetails.value.transactionID
                }
            }
        )

        if(response.status === 204){
            setToastState(true, "Successfully approved");
        }
    }catch(err){
        console.log(`Cannot retrieve details with error: ${err}`);
        setToastState(true, "Failed to approve exchange", "danger");
    }
}

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