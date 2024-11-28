<template>
    <ion-page>
        <ion-split-pane when="(min-width: 720px)" content-id="main">
            <ion-menu content-id="main" class="menu-pane-config">
                <div class="menu-switch"></div>
                <div class="custom-menu-config">

                    <ion-img :src="logoSource" class="logo-config"></ion-img>
                    <ion-list :inset="true" class="menu-button-config">
                        <ion-item
                            class="ion-activatable ripple-parent ion-no-border"
                            @click="switchTabView('/dashboard')"
                            :button="true"
                            lines="none"
                            >
                            <ion-label>Dashboard</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            @click="switchTabView('/transactions')"
                            :button="true"
                            lines="none"
                            >
                            <ion-label>Transactions</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            @click="switchTabView('/rvm')"
                            :button="true"
                            lines="none"
                            >
                            <ion-label>RVM</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            @click="switchTabView('/user')"
                            :button="true"
                            lines="none"
                        >
                            <ion-label>Users</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                        <ion-item
                            class="ion-activatable ripple-parent"
                            @click="switchTabView('/point_exchange')"
                            :button="true"
                            lines="none"
                        >
                            <ion-label>Point Exchange</ion-label>
                            <ion-ripple-effect></ion-ripple-effect>
                        </ion-item>
                    </ion-list>
                </div>
            </ion-menu>

            <div id="main">
                <ion-header class="ion-no-border">
                    <div class="main-view-header">
                        <ion-avatar @click="openPopover">
                            <img src="/src/assets/pp_placeholder.png"/>
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
    //IonPopover,
    IonRippleEffect,
    popoverController
} from '@ionic/vue';
import { ref } from 'vue';
import {useRouter} from 'vue-router';
import CustomPopover from './CustomPopover.vue';

const router = useRouter();
/**
 * TODO: This still has "desktop" in the path. TODO: Resolve this
 */
const logoSource = ref("/desktop/src/assets/Logo_large.png");

async function openPopover(ev: Event){
    const popover = await popoverController.create({
        component: CustomPopover,
        event: ev
    });
    await popover.present();

    const role = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
}

async function switchTabView(view: string){
    router.replace(view);
}
</script>

<style scoped>
/* .menu-pane-config{
    --max-width: 230px !important;
} */
ion-avatar{
    margin-top: 10px;
    border-radius: 4px;
}

ion-avatar img{
    height: 40px;
    width: 40px;
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
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
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
}
</style>