<template>
    <ion-page>
        <ion-split-pane when="(min-width: 720px)" content-id="main">
            <ion-menu content-id="main" class="menu-pane-config">
                <div class="menu-switch"></div>
                <div class="custom-menu-config">

                    <ion-img src="/Logo_large.png" class="logo-config"></ion-img>
                    <ion-list :inset="true" class="menu-button-config">
                        <ion-item
                            class="ion-activatable ripple-parent"
                            router-link="/dashboard"
                            :button="true"
                            >
                            <ion-label>Dashboard</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            router-link="transactions"
                            :button="true"
                            >
                            <ion-label>Transactions</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            :button="true"
                            >
                            <ion-label>RVM</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            router-link="/user"
                            :button="true">
                            <ion-label>Users</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                    </ion-list>
                </div>
            </ion-menu>

            <div id="main">
                <ion-header class="ion-no-border">
                    <div class="main-view-header">
                        <ion-avatar>
                            <img src="/pp_placeholder.png"/>
                        </ion-avatar>
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
    IonAvatar,
    IonRippleEffect
} from '@ionic/vue';
</script>

<style scoped>
/* .menu-pane-config{
    --max-width: 230px !important;
} */
ion-avatar{

    border-radius: 4px;
}
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


/* 
    IonRippleEffect Styling
*/
.rounded-rectangle {
    width: 185px;
    height: 65px;
    border-radius: 8px;
}

.ripple-parent {
    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;
}
</style>