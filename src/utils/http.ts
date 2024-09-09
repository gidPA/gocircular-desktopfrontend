import { useAuthStore } from '@/stores/useAuthStore';
import axios, { AxiosRequestConfig } from 'axios';

export async function apiRequest(options: AxiosRequestConfig = {}) {
    const authStore = useAuthStore();

    if (authStore.isTokenExpired(authStore.accessToken as string)) {
        await authStore.refreshAccessToken();
    }

    const baseApiUrl = import.meta.env.VITE_GOCIRCULAR_API_URL;

    options.baseURL = baseApiUrl;

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authStore.accessToken}`,
    };

    axios(options)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            if(error.status === 401){
                authStore.refreshAccessToken()
                .then(function () {
                    if(options.headers?.Authorization){
                        options.headers.Authorization = `Bearer ${authStore.accessToken}`;
                    }
                    else{throw new Error("Authorization header undefined");}

                    axios(options)
                        .then(function (response) {
                            return response;
                        })
                        .catch(function (error) {
                            throw error;
                        })
                })
            } else {throw new Error("Error is not 401")}

        });

}