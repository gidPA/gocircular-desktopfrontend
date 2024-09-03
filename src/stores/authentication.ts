import axios, { AxiosResponse } from "axios";
import {defineStore} from "pinia";
import storage from "@/utils/storage";

export interface Credential{
    email: string,
    password: string
}

interface AuthStoreState{
    apiRefreshToken: string | null,
    apiAccessToken: string | null,
    userid: string | null
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthStoreState => ({
        apiRefreshToken: null,
        apiAccessToken: null,
        userid: null,
    }),
    actions: {
        async login(credentials: Credential){
            try{
                const response: AxiosResponse = await axios({
                    method: "post",
                    url: "http://localhost:4001/api/user/login",
                    data: credentials
                })

                this.apiAccessToken = response.data.apiKey;

                await storage.set("authDetails",
                    {
                        apiRefreshToken: this.apiRefreshToken,
                        apiAccessToken: this.apiAccessToken,
                        userid: this.userid,
                    }
                )
            } catch(err) {
                console.log(`Response failed with error: \n${err}`);
            }
        },

        async logout(){
            this.apiAccessToken = null;
            this.apiRefreshToken = null;
            this.userid = null;
        }
    }
})