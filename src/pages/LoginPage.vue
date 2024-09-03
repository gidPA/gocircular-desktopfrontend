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
                                <ion-input label="Email Address" label-placement="floating" type="email"
                                    required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input label="Password" label-placement="floating" type="password"
                                    required></ion-input>
                            </ion-item>
                        </ion-list>
                    </form>
                    <ion-button type="submit" expand="full">
                        Login
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>

    </ion-page>

</template>

<script lang="ts">
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
} from '@ionic/vue'

export default {
    components: {
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
    },
    data() {
        return {
            enteredEmailAddress: "",
            enteredPassword: ""
        }
    },

    methods: {
        submitCredentials() {

        }
    }
}
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