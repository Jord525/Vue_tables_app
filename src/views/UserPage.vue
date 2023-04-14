<template>
  <ul class="list-group list" v-for='user in store.user'>
    <li class='list-group-item'>
      Имя пользователя: <strong>{{user.name}}</strong>
    </li >
    <li class='list-group-item'>
      email пользователя: <strong>{{user.email}}</strong>
    </li>
    <li class='list-group-item'>
     Время создания аккаунта: <strong>{{user.createdAt}}</strong>
    </li>
  </ul>
</template>

<script setup>
import { useUserStore } from '../stores/user' 
import { onMounted, ref } from 'vue'
const store = useUserStore()


</script>

<style>
.list{
  width: 450px
}

</style>
