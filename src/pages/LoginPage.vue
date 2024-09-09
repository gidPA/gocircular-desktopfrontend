<template>
    <ion-page class="change-flex-spacing">
        <ion-img src="Logo_large.png" class="custom-img-prop">
        </ion-img>

        <ion-grid class="disable-flex">
            <ion-row>
                <ion-col class="custom-padding ion-padding-end">
                    <ion-text class="ion-text-end">
                        <h1>GoCircular<br>Management Suite</h1>
                    </ion-text>
                </ion-col>
                <ion-col class="custom-padding ion-padding-start">
                    <form>
                        <ion-list>
                            <ion-item>
                                <ion-input
                                    label="Email Address"
                                    label-placement="floating"
                                    type="email"
                                    v-model="enteredEmailAddress"
                                    required>
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input 
                                    label="Password"
                                    label-placement="floating"
                                    type="password"
                                    v-model="enteredPassword"
                                    required>
                                </ion-input>
                            </ion-item>
                        </ion-list>
                    </form>
                    <ion-button type="submit" expand="full" @click="handleLogin">
                        Login
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>

    </ion-page>

</template>

<script setup lang="ts">
import {
    IonPage,
    IonText,
    //IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonGrid,
    IonImg,
    IonRow,
    IonCol
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

//login entry states
const enteredEmailAddress = ref("");
const enteredPassword = ref("");
//end

//login method
const handleLogin = async () => {
    try{
        await authStore.login({
        email: enteredEmailAddress.value,
        password: enteredPassword.value
        })

        if(authStore.accessToken){
            const redirectPath = route.query.redirect || "/";
            router.push(redirectPath);
        }
    }catch(err){
        console.log(err);
    }

}
//end


</script>

<style scoped>
.change-flex-spacing {
    justify-content: center;
}

.custom-padding {
    --ion-padding: 24px;
}

.custom-img-prop {
    height: 200px;
    margin-bottom: 50px;
}

.stretch-to-bottom {
    height: 100vh;
    display: flex;
    align-items: center
}

.disable-flex {
    flex: none;
}
</style>