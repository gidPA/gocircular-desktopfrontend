<template>
    <base-layout>
        <ion-text class="page-title">
            <h1>Point Exchange Requests List</h1>
        </ion-text>
        <div class="table-no-overflow">
            <ion-grid>
                <ion-row>
                    <ion-col size="2">
                        <p>Exchange Code</p>
                    </ion-col>
                    <ion-col size="3">
                        <ion-input v-model="enteredRequestCode" fill="outline">
                        </ion-input>
                    </ion-col>
                    <ion-col size="2">
                        <ion-button @click="fetchData">
                            Search
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-grid class="point-exchange-list">
                <ion-row class="table-header">
                    <ion-col size="1">ID</ion-col>
                    <ion-col size="2">Creation Timestamp</ion-col>
                    <ion-col size="1">User ID</ion-col>
                    <ion-col size="1">Amount</ion-col>
                    <ion-col size="1">Status</ion-col>
                    <ion-col size="2">Last Modified</ion-col>
                    <ion-col size="1">Actions</ion-col>
                </ion-row>

                <ion-row v-for="transaction in transactionItem" :key="transaction.transactionID">
                    <ion-col size="1">{{ transaction.transactionID }}</ion-col>
                    <ion-col size="2">{{ transaction.transactionDate }}</ion-col>
                    <ion-col size="1">{{ transaction.userID }}</ion-col>
                    <ion-col size="1">{{ transaction.requested_point }}</ion-col>
                    <ion-col size="1">{{ transaction.status }}</ion-col>
                    <ion-col size="2">{{ transaction.modified_at ? transaction.modified_at : "Never" }}</ion-col>
                    <ion-col size="1">
                        <ion-icon :icon="eye" @click="seeActions(transaction.transactionID)"></ion-icon>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </div>


        <div class="table-detail">
            <div>
                <ion-text>
                    Page {{ currentPage }} out of {{ pageCount }} pages <br>
                    Showing {{ itemCount }} items out of {{ totalItemCount }} items
                </ion-text>
            </div>


            <div>
                <ion-button :disabled="currentPage - 1 === 0 ? true : false" @click="fetchPreviousPage()">
                    Previous
                </ion-button>
                <ion-button :disabled="currentPage === pageCount ? true : false" @click="fetchNextPage()">
                    Next
                </ion-button>
            </div>
        </div>

    </base-layout>

</template>

<script setup lang="ts">
import {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonInput
} from '@ionic/vue';
import { eye } from "ionicons/icons"
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted } from 'vue';
import { apiRequest, ApiRequestMethods } from "../../utils/http";
import { convertTZ } from '@/utils/convertDateStringTimezone';
import { AxiosResponse } from 'axios';
import {useRouter} from 'vue-router';


interface TransactionData {
    transactionID: number,
    transactionDate: string,
    status: string,
    userID: number,
    requested_point: number,
    modified_at: string,
}

const router = useRouter();

const transactionItem = ref([] as Array<TransactionData>);
const pageSize = ref(8);
const itemCount = ref<number>(0);
const totalItemCount = ref<number>(0);
const pageCount = ref<number>(0);
const currentPage = ref<number>(0);

const enteredRequestCode = ref<string>("");

const seeActions = (id: number) => {
    router.replace(`/point_exchange/${id}`);
}

const fetchData = async (page = 1, pageSize = 8) => {
    try {
        console.log("clicked");
        let response: AxiosResponse<any, any>;
        if (enteredRequestCode.value.length > 0) {
            response = await apiRequest(`/point_exchange/list?requestid=${enteredRequestCode.value}&page=${page}&size=${pageSize}`, ApiRequestMethods.GET);
        } else {
            response = await apiRequest(`/point_exchange/list?page=${page}&size=${pageSize}`, ApiRequestMethods.GET);
        }

        console.log(response);

        const responseData = response.data.items;
        itemCount.value = response.data.itemCount;
        totalItemCount.value = response.data.totalItemCount;
        pageCount.value = response.data.pageCount;
        currentPage.value = response.data.page;

        responseData.forEach((data: TransactionData) => {
            data.transactionDate = convertTZ(data.transactionDate, "Asia/Jakarta");
            if (data.modified_at) {
                data.modified_at = convertTZ(data.modified_at, "Asia/Jakarta");
            }
        })
        transactionItem.value = responseData;
    } catch (error) {
        console.log(`Failed to retrieve point exchange information. \n Response code: ${error.code}`);
    }
}

const fetchNextPage = async () => {
    try {
        currentPage.value += 1;
        fetchData(currentPage.value, pageSize.value);
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

const fetchPreviousPage = async () => {
    try {
        currentPage.value -= 1;
        fetchData(currentPage.value, pageSize.value);
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

onMounted(async () => {
    console.log("testing heughaeughe");
    await fetchData();
});
</script>

<style scoped>
ion-input{
    height: 44px
}

.input-fill-outline.sc-ion-input-md-h {
    min-height: 0;
}

.point-exchange-list {
    --ion-grid-columns: 9;
}

.point-exchange-filter{
    --ion-grid-columns: 7;
}

.point-exchange-list ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}

.page-title h1 {
    margin-bottom: 20px;
}

.table-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
}

.table-detail {
    margin-top: 20px;
    margin-right: 50px;
    display: flex;
    justify-content: space-between;
}

.table-no-overflow {
    max-width: 98%;
    max-height: 60%;
    overflow: auto;
}
</style>