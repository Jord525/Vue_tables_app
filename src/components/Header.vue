<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="flex">
                <!-- <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link active" aria-current="page" to="/"
                                >Home</router-link
                            >
                        </li>
                    </ul>
                </div> -->
                <div class="navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" v-for="user in users">
                        <li class="nav-item">{{ user.id }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useTableStore } from '../stores/table'
import axios from 'axios'
export default {
    data() {
        return {
            users: [],
        }
    },

    methods: {
        ...mapState(useTableStore, ['tables']),

        async getUser() {
            const response = await axios.get('http://localhost:3000/users')
            this.users = response.data
        },
    },
    mounted() {
        this.getUser()
    },
}
</script>
<style>
.flex {
    display: flex;
}
</style>
