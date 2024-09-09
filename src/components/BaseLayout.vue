<template>
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

        <div class="ion-page" id="main">
            <ion-header class="ion-no-border">
                <div class="main-view-header">

                </div>
            </ion-header>
            <ion-text>
                <h1>Transaction History</h1>
            </ion-text>
            <ion-content>
                <slot>
                </slot>
            </ion-content>
        </div>
    </ion-split-pane>
</template>

<script>
export default{
    components:{
        IonContent,
        IonHeader,
        IonMenu,
        IonSplitPane,
        IonText,
        IonList,
        IonImg,
        IonLabel,
        IonItem
    },
}

</script>