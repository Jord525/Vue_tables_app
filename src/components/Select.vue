<template>
  <select class="form-select" @change="sortSelect">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="value in selected" :key="value">
      {{ value.value }}
    </option>
  </select>
</template>
<script>
export default {
  props: ["selected", "sortSelect", "sel"],
};
</script>