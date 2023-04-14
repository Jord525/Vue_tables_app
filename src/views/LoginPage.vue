<template>
    <div class="register">
        <router-link to="/register">регистрация</router-link>
        <form @submit.prevent="login">
            <input class="form-control input" type="email" v-model="email" placeholder="email" />
            <input
                class="form-control input"
                type="password"
                v-model="password"
                placeholder="пароль"
            />
            <button type="submit" class="btn btn-success">Войти</button>
        </form>
        <span class='alert alert-success' v-if='store.message'> {{store.message}}</span>
        <p v-if="store.error" class="alert alert-danger error">{{ store.error.message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const store = useUserStore() 

const { signIn } = store

const email = ref('test4@gmail.com')
const password = ref('asdasf1f')

const router = useRouter()

async function login() {
    await signIn(email.value, password.value)
    if (store.user.token) {
        store.token = store.user.token
        sessionStorage.setItem('TOKEN', store.user.token)
        router.push({ name: 'Main' })
        store.message = ''
    }
}
</script>
<style>
.register {
    width: 250px;
    display: flex;
    flex-direction: column;
   align-items: center;
    margin: auto;
}
.input {
    margin: 5px;
}
.alert{
  margin: 10px;
}
.error {
    width: 200px;
    margin: 20px;
    text-align: center;
}
</style>
