<script>
import Header from './components/Header.vue'
export default {
    components: {
     Header,
    },
};
</script>



<template>
<Header />

  <div class="wrapper">
    <RouterLink to="/"></RouterLink>
</div>
<router-view></router-view>
</template>
