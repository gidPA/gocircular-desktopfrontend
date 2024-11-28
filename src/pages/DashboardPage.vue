<template>
    <base-layout>
        <ion-text>
            <h1>Dashboard</h1>
        </ion-text>
        <ion-grid>
            <ion-row>
                <ion-col size="1">
                    <ion-card class="ion-text-center">
                        <ion-card-header>
                            <h1>1000</h1>
                        </ion-card-header>
                        <ion-card-subtitle>
                            Submitted Recyclables
                        </ion-card-subtitle>
                    </ion-card>
                </ion-col>
                <ion-col size="1">
                    <ion-card class="ion-text-center">
                        <ion-card-header>
                            <h1>1000</h1>
                        </ion-card-header>
                        <ion-card-subtitle>
                            Submitted Recyclables
                        </ion-card-subtitle>
                    </ion-card>
                </ion-col>
                <ion-col size="1">
                    <ion-card class="ion-text-center">
                        <ion-card-header>
                            <h1>1000</h1>
                        </ion-card-header>
                        <ion-card-subtitle>
                            Submitted Recyclables
                        </ion-card-subtitle>
                    </ion-card>
                </ion-col>
            </ion-row>

        </ion-grid>

    </base-layout>
</template>
<script setup lang="ts">
import {
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonCol,
    IonRow,
    //IonContent,
} from '@ionic/vue';
import BaseLayout from '@/components/BaseLayout.vue';
</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 3;
}
</style>