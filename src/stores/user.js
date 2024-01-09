import { defineStore } from 'pinia';
import TableDataService from '../service/apiCals.js';
import axios from 'axios';
import { BASE_URL } from '../service/api.js';

export const useUserStore = defineStore('User', {
    state: () => {
        return {
            user: [],
            token: sessionStorage.getItem('TOKEN'),
            error: '',
            message: '',
        };
    },
    actions: {
        async getMe() {
            try {
                let config = {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                };
                await axios.get(`${BASE_URL}/auth/me`, config).then((me) => {
                    this.user = me.data;
                });
            } catch (err) {
                console.log(err);
            }
        },

        async getUser() {
            const res = await TableDataService.getAllUsers();
            this.user = res.data;
        },
        async signUp(name, email, password) {
            try {
                const res = await axios.post(`${BASE_URL}/auth/register`, {
                    name,
                    email,
                    password,
                });
                this.user = res.data;
            } catch (error) {
                this.error = error.response.data;
            }
        },
        async signIn(email, password) {
            try {
                const res = await axios.post(`${BASE_URL}/auth/login`, {
                    email,
                    password,
                });
                this.user = res.data;
            } catch (error) {
                this.error = error;
            }
        },
        async updateUser(email, name) {
            try {
                const res = await axios.patch(`${BASE_URL}/user/${this.user[0].id}`, {
                    email,
                    name,
                });
                this.user = res.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
});
