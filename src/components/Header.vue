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
                <div class="navbar-collapse" id="navbarNav">
                    <span v-if="store.token && route.path !== '/user'">{{ store.user?.name }}</span>
                </div>
           </div>
        </div>
  </nav>
</template>
<script setup>
import {  onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRoute } from 'vue-router'

const store = useUserStore()
const route = useRoute()

onMounted(()=>{
if(store.token !== null){
  store.getMe()
}
})

</script>
<style>
.flex {
    display: flex;
}
</style>
