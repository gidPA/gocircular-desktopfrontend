<template>
    <base-layout>
    <ion-text>
            <h1>User List</h1>
        </ion-text>

        <ion-grid>
            <ion-row>
                <ion-col size="1">User ID</ion-col>
                <ion-col size="3">Email Address</ion-col>
                <ion-col size="2">Username</ion-col>
                <ion-col size="3">Registration Date</ion-col>
                <ion-col size="1">Role</ion-col>
                <ion-col size="2">Actions</ion-col>
            </ion-row>

            <ion-row v-for="user in userData" :key="user.userid">
                <ion-col size="1">{{ user.userid }}</ion-col>
                <ion-col size="3">{{ user.email }}</ion-col>
                <ion-col size="2">{{ user.username }}</ion-col>
                <ion-col size="3">{{ user.createdAt }}</ion-col>
                <ion-col size="1">{{ user.role }}</ion-col>
                <ion-col size="2">
                    <ion-icon :icon="eye"></ion-icon>
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue';
import {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
} from '@ionic/vue';
import {eye} from "ionicons/icons";
import {ref, onMounted} from "vue";
import { ApiRequestMethods, apiRequest } from '@/utils/http';
import { convertTZ } from '@/utils/convertDateStringTimezone';

interface UserData {
    userid: number,
    email: string
    username: string,
    createdAt: string,
    role: string
}

const userData = ref([] as Array<UserData>)

const fetchData = async () => {
    try {
        const response = await apiRequest("/user/list", ApiRequestMethods.GET);

        response.data.forEach((data: UserData) => {
            data.createdAt = convertTZ(data.createdAt, "Asia/Jakarta");
        })
        userData.value = response.data;
    } catch (error) {
        console.log(`Failed to retrieve transaction information. \n Response code: ${error.code}`);
    }
}

onMounted(async () => {
    console.log("testing hehehaha");
    await fetchData();
})

</script>

<style scoped>
ion-grid {
    --ion-grid-columns: 12;
}

ion-col {
    border: solid 1px #ffffff;
    text-align: center;
}
</style>