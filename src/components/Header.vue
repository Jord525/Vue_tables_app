<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Home</router-link>
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
                <div class="navbar-collapse" id="navbarNav">
                    <router-link
                        to="/user"
                        v-if="store.token && route.path !== '/user'"
                        >{{ store.user[0]?.name }}</router-link
                    >
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { onUpdated } from 'vue';
import { useUserStore } from '../stores/user';
import { useRoute } from 'vue-router';

const store = useUserStore();
const route = useRoute();

onUpdated(() => {
    if (route.path === '/') store.getMe();
});
</script>
<style>
.flex {
    display: flex;
}
</style>
