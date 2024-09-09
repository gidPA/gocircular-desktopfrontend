<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">

import {
  IonApp,
  IonRouterOutlet,
} from "@ionic/vue";

import { onMounted } from "vue";

import { useAuthStore } from "./stores/useAuthStore";

const authStore = useAuthStore();

onMounted(async () => {
  console.log("Hello")
  await authStore.checkAuth();
})

</script>
