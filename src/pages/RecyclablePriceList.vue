<template>
    <base-layout>
        <ion-toast :is-open="isToastOpen" :message="toastMessage" :color="toastColor" @didDismiss="setToastState(false)"
            duration="4000" position="top">
        </ion-toast>
        <ion-text>
            <h1>Recyclable Price List</h1>
        </ion-text>


        <ion-grid class="forms-layout">
            <ion-row>
                <ion-col size="3">
                    <ion-grid class="price-form">
                        <ion-row>
                            <ion-col size="3" class="form-title">
                                Transparent Bottle
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Small
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_transparent.small"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Medium
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_transparent.medium"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Large
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_transparent.large"></ion-input>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-col>
                <ion-col size="3">
                    <ion-grid class="price-form">
                        <ion-row>
                            <ion-col size="3" class="form-title">
                                Colored Bottle
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Small
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_colored.small"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Medium
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_colored.medium"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Large
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline"
                                    v-model.number="recyclablePriceList.plastic_colored.large"></ion-input>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-col>
                <ion-col size="3">
                    <ion-grid class="price-form">
                        <ion-row>
                            <ion-col size="3" class="form-title">
                                Metal Can
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Small
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline" v-model.number="recyclablePriceList.metal.small"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Medium
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline" v-model.number="recyclablePriceList.metal.medium"></ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="1" class="form-label">
                                Large
                            </ion-col>
                            <ion-col size="2">
                                <ion-input fill="outline" v-model.number="recyclablePriceList.metal.large"></ion-input>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="3">
                </ion-col>
                <ion-col size="3">
                </ion-col>
                <ion-col size="3">
                    <ion-button expand="full" @click="updatePriceList">Submit Changes</ion-button>
                </ion-col>
            </ion-row>

        </ion-grid>


    </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue';
import { apiRequest, ApiRequestMethods } from '@/utils/http';
import {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonToast,
    IonInput,
    onIonViewWillEnter
    // IonIcon
} from '@ionic/vue';
import { AxiosError } from 'axios';
// import {eye} from "ionicons/icons";
import { ref } from "vue";

interface PriceUpdateSchema {
    plastic_transparent: {
        small: number,
        medium: number,
        large: number
    },
    plastic_colored: {
        small: number,
        medium: number,
        large: number
    },
    metal: {
        small: number,
        medium: number,
        large: number
    },
}

const recyclablePriceList = ref<PriceUpdateSchema>({
    plastic_transparent: {
        small: 0,
        medium: 0,
        large: 0
    },
    plastic_colored: {
        small: 0,
        medium: 0,
        large: 0
    },
    metal: {
        small: 0,
        medium: 0,
        large: 0
    },
});

const isToastOpen = ref(false);
const toastMessage = ref("");
const toastColor = ref("");

const setToastState = (isOpen: boolean, message: string = "", colorTheme: string = "success") => {
    if (!isOpen) {
        isToastOpen.value = false;
    } else {
        isToastOpen.value = true;
        toastMessage.value = message;
        toastColor.value = colorTheme;
    }
}

const updatePriceList = async () => {
    try {
        //this is such an ugly hack, but my patience has run out
        for (const itemtype in recyclablePriceList.value) {
            recyclablePriceList.value[itemtype].small = Number(recyclablePriceList.value[itemtype].small);
            recyclablePriceList.value[itemtype].medium = Number(recyclablePriceList.value[itemtype].medium);
            recyclablePriceList.value[itemtype].large = Number(recyclablePriceList.value[itemtype].large);
        }

        const response = await apiRequest(`/recyclables/update`, ApiRequestMethods.PUT,{
            data: recyclablePriceList.value
        });
        console.log(response);

        if (response.status === 204) {
            setToastState(true, "Price List updated successfully", "primary");
            const response = await apiRequest(`/recyclables/list`, ApiRequestMethods.GET);
            recyclablePriceList.value = response.data;
        }
    } catch (err) {
        if(err instanceof AxiosError && err.status && err.status >= 400){
            setToastState(true, `Cannot update price list with error code: ${err.status}`, "danger");
        }
        console.log(`Cannot retrieve details with error: \n${err}`)
    }
}

onIonViewWillEnter(async () => {
    try {
        const response = await apiRequest(`/recyclables/list`, ApiRequestMethods.GET);

        recyclablePriceList.value = response.data;
    } catch (err) {
        console.log(`Cannot retrieve details with error: \n${err}`)
    }
})

</script>

<style scoped>
ion-input {
    height: 30px
}

.input-fill-outline.sc-ion-input-md-h {
    min-height: 0;
}

.price-form {
    --ion-grid-columns: 3;
}

.forms-layout {
    --ion-grid-columns: 9;
}

.form-label {
    font-size: 11.5pt;
    padding-top: 8px;
}

.form-title {
    font-size: 14pt;
    font-weight: 500;
}

ion-col p {
    margin-bottom: 5px;
    margin-top: 9px;
}
</style>