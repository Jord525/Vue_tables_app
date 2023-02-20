<template>
  <select class="form-select" @change="sortSelect">
    <option disabled value="">Выберите один из вариантов</option>
    <option v-for="value in selected" :key="value">
      {{ value.value }}
    </option>
  </select>
</template>
<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useTableStore } from "../stores/table";
export default {
  methods: {
    ...mapActions(useTableStore, ["sortSelect"]),
  },
  computed: {
    ...mapState(useTableStore, ["selected"]),
    ...mapWritableState(useTableStore, ["sel"]),
  },
};
</script>