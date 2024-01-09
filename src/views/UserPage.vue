<template>
    <form @submit.prevent="cancelUser">
        <ul v-for="user in store.user" class="list-group list">
            <li class="list-group-item">
                email пользователья:
                <input type="text" v-model="user.email" class="form-control" />
            </li>
            <li class="list-group-item">
                Имя пользователя:
                <input type="text" class="form-control" v-model="user.name" />
            </li>
            <li class="list-group-item">
                Время создания аккаунта: <strong>{{ user.createdAt }}</strong>
            </li>
        </ul>
        <!-- <button class="btn btn-secondary">Выйти</button> -->
        <button class="btn btn-primary">Сохранить</button>
    </form>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';
const store = useUserStore();

function cancelUser() {
    store.updateUser(store.user[0].email, store.user[0].name).then(() => {
        store.getMe();
    });
}
onMounted(() => {
    store.getMe();
});
</script>

<style scoped>
.list {
    width: 450px;
}
.btn {
    margin: 10px;
}
</style>
