<template>
    <ion-page>
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

            <div id="main">
                <ion-header class="ion-no-border">
                    <div class="main-view-header">

                    </div>
                </ion-header>
                <ion-content class="ion-padding content-margin">
                    <slot></slot>
                </ion-content>
            </div>
        </ion-split-pane>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonHeader,
    IonMenu,
    IonSplitPane,
    IonList,
    IonImg,
    IonLabel,
    IonItem,
} from '@ionic/vue';
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

ion-text {
    margin-left: 30px;
    margin-bottom: 10px;
}

h1 {
    font-size: 26pt;
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