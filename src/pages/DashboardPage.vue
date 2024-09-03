<template>
    <ion-split-pane when="(min-width: 720px)" content-id="main">
        <ion-menu content-id="main" class="menu-pane-config">
            <div class="menu-switch"></div>
            <div class="custom-menu-config">

                <ion-img src="/Logo_large.png" class="logo-config"></ion-img>
                <ion-list :inset="true" class="menu-button-config">
                    <ion-item>
                        <ion-label>Dashboard</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Transactions</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>RVM</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Users</ion-label>
                    </ion-item>
                </ion-list>
            </div>
        </ion-menu>

        <div class="ion-page" id="main">
            <ion-header>
                <div class="main-view-header">

                </div>
            </ion-header>
            <ion-content class="ion-padding content-margin">
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
                        <ion-col size="2">{{ transaction.username}}</ion-col>
                        <ion-col size="2">{{ transaction.rvmID }}</ion-col>
                        <ion-col size="1">{{ transaction.item_amount }}</ion-col>
                        <ion-col size="2">{{ transaction.total_point }}</ion-col>
                        <ion-col size="4">Actions</ion-col>
                    </ion-row>
                </ion-grid>

            </ion-content>
        </div>
    </ion-split-pane>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonMenu,
    IonSplitPane,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonImg,
    IonLabel,
    IonItem
} from '@ionic/vue';

import axios from 'axios';
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

export default{
    components:{
        IonContent,
        IonHeader,
        IonMenu,
        IonSplitPane,
        IonText,
        IonGrid,
        IonRow,
        IonCol,
        IonList,
        IonImg,
        IonLabel,
        IonItem
    },
    data(){
        return{
            transactionData: [] as Array<TransactionData>
        }
    },

    methods:{
        async fetchData(){
            const response = await axios.get("http://127.0.0.1:4001/api/transaction/list");

            response.data.forEach((data: TransactionData) => {
                data.transactionDate = convertTZ(data.transactionDate, "Asia/Jakarta");
            })
            this.transactionData = response.data;
        }
    },

    mounted(){
        this.fetchData();
    }
}

</script>

<style scoped>
/* .menu-pane-config{
    --max-width: 230px !important;
} */

ion-split-pane {
    --side-min-width: 220px;
    --side-max-width: 220px;
}

ion-menu {
    --max-width: 220px;
}

ion-grid {
    --ion-grid-columns: 18;
}

ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}

.custom-menu-config {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

}

.logo-config {
    width: 150px;
    /* filter: invert(100%); */
    margin-top: 5px;
    margin-bottom: 20px;
}

.menu-button-config {
    align-self: stretch;
}

.menu-switch {
    height: 56px;
}

.main-view-header {
    height: 56px;
}
</style>