<template>
    <ion-content>
        <ion-list>
            <ion-text>
                Logged in as
            </ion-text>
        </ion-list>
        <ion-list>
            <ion-item :button="true" :detail="false">Log Out</ion-item>
        </ion-list>
    </ion-content>
</template>

<script setup lang="ts">
    import {
        IonContent,
        IonList,
        IonText,
        IonItem,
    } from '@ionic/vue';
</script>
