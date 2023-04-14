<template>
    <div class="register">
        <div>
            Уже есть аккаунт?  
        </div>
        <router-link to="/login" > жми сюда</router-link>
        <form @submit.prevent="register">
            <input class="form-control input" v-model="name" placeholder="Имя" />
            <input class="form-control input" type="email" v-model="email" placeholder="email" />
            <input
                class="form-control input"
                type="password"
                v-model="password"
                placeholder="пароль"
            />
            <button type="submit" class="btn btn-success">Войти</button>
        </form> 
        <p 
           v-if="store.error" 
           v-for=' error in store.error.errors' 
           class="alert alert-danger error">
           {{ error.msg || error.code }}
        </p>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'


const store = useUserStore()
const router = useRouter()
const signUp = store.signUp

const name = ref('Egor')
const email = ref('test4.@gmail.com')
const password = ref('asdasf1f')

function register() {
    signUp(name.value, email.value, password.value)
    .then(()=>{
      if(!store.error){
      router.push('/login')
     store.message = 'вы успешно зарегистрировались'
    }
    })
  
}
</script>
<style scoped>
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
</style>
