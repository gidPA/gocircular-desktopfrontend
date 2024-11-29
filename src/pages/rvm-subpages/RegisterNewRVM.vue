<template>
    <base-layout>
        <div class="title-and-button">
            <ion-back-button text="back" default-href="/rvm">
            </ion-back-button>
        </div>

        <ion-text>
            <h1>Register New RVM</h1>
        </ion-text>

        <ion-grid>
            <ion-row class="table-header">
                <ion-col size="2">
                    <p>RVM ID</p>
                </ion-col>
                <ion-col size="5">
                    <ion-input v-model="newID" fill="outline">
                    </ion-input>
                </ion-col>
            </ion-row>

            <ion-row class="table-header">
                <ion-col size="2">
                    <p>Security Key</p></ion-col>
                <ion-col size="5">
                    <ion-input fill="outline" v-model="securityKey">
                    </ion-input>
                </ion-col>
            </ion-row>

            <ion-row>
                <ion-col size="6">
                    <p>&nbsp;</p>
                </ion-col>
                <ion-col size="1">
                    <ion-button expand="full" @click="submitRVM()">
                        Submit
                    </ion-button>
                </ion-col>
            </ion-row>

        </ion-grid>


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
// import {eye} from "ionicons/icons";
import {ref, } from "vue";
import { useRouter } from 'vue-router';
import { ApiRequestMethods, apiRequest } from '@/utils/http';
// import { convertTZ } from '@/utils/convertDateStringTimezone';

// interface RVMData {
//     rvmID: number,
//     registrationDate: string,
//     transactionCount: number,
//     totalRVMPoint: number,
// }

// const rvmData = ref([] as Array<RVMData>)
const router = useRouter();

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
const newID = ref(0);
const securityKey = ref("");

const submitRVM = async () => {
    try{
        const result = await apiRequest("/rvm/register", ApiRequestMethods.POST, {
            data: {
                newID: newID.value,
                securityKey: securityKey.value
            }
        });
        console.log(result);

        router.replace('/rvm');
    } catch(err){
        console.log(err);
    }
}

onIonViewWillEnter(async () => {
    try{
        const result = await apiRequest("/rvm/latestid", ApiRequestMethods.GET);
        newID.value = result.data.nextId;
    } catch(err){
        console.log(`Cannot retrieve next ID with error: ${err}`);
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

ion-input{
    height: 40px
}

.input-fill-outline.sc-ion-input-md-h {
    min-height: 0;
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