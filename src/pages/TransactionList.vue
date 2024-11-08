<template>
    <base-layout>
        <ion-text class="page-title">
            <h1>Transaction History</h1>
        </ion-text>
        <div class="table-no-overflow">
            <ion-grid>
            <ion-row class="table-header">
                <ion-col size="2">ID</ion-col>
                <ion-col size="5">Timestamp</ion-col>
                <ion-col size="2">User</ion-col>
                <ion-col size="2">RVM</ion-col>
                <ion-col size="1">Qty.</ion-col>
                <ion-col size="2">Points Granted</ion-col>
                <ion-col size="2">Actions</ion-col>
            </ion-row>

            <ion-row v-for="transaction in transactionItem" :key="transaction.transactionID">
                <ion-col size="2">{{ transaction.transactionID }}</ion-col>
                <ion-col size="5">{{ transaction.transactionDate }}</ion-col>
                <ion-col size="2">{{ transaction.username.length > 10? transaction.username.substring(0,10)+'...' : transaction.username }}</ion-col>
                <ion-col size="2">{{ transaction.rvmID }}</ion-col>
                <ion-col size="1">{{ transaction.item_amount }}</ion-col>
                <ion-col size="2">{{ transaction.total_point }}</ion-col>
                <ion-col size="2">
                    <ion-icon :icon="eye"></ion-icon>
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
                <ion-button :disabled="currentPage-1===0?true:false"
                    @click="fetchPreviousPage()"
                >
                    Previous
                </ion-button>
                <ion-button :disabled="currentPage===pageCount?true:false"
                    @click="fetchNextPage()"
                >
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
    IonButton
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

const transactionItem = ref([] as Array<TransactionData>);
const pageSize = ref(10);
const itemCount = ref<number>(0);
const totalItemCount = ref<number>(0);
const pageCount = ref<number>(0);
const currentPage = ref<number>(0);

const fetchData = async (page=1, pageSize=10) => {
    try {
        const response = await apiRequest(`/transaction/list?page=${page}&size=${pageSize}`, ApiRequestMethods.GET);
        console.log(response);

        const responseData = response.data.items;
        itemCount.value = response.data.itemCount;
        totalItemCount.value = response.data.totalItemCount;
        pageCount.value = response.data.pageCount;
        currentPage.value = response.data.page;

        responseData.forEach((data: TransactionData) => {
            data.transactionDate = convertTZ(data.transactionDate, "Asia/Jakarta");
        })
        transactionItem.value = responseData;
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

const fetchNextPage = async() =>{
    try{
        currentPage.value += 1;
        fetchData(currentPage.value, pageSize.value);
    } catch (error){
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

const fetchPreviousPage = async() =>{
    try{
        currentPage.value -= 1;
        fetchData(currentPage.value, pageSize.value);
    } catch (error){
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

onMounted(async () => {
    console.log("testing heughaeughe");
    await fetchData();
});
</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 16;
}

ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}
.page-title h1{
    margin-bottom: 20px;
}

.table-header{
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
}
.table-detail{
    margin-top: 20px;
    margin-right: 50px;
    display: flex;
    justify-content: space-between;
}

.table-no-overflow{
    max-width: 98%;
    max-height: 60%;
    overflow: auto;
}
</style>