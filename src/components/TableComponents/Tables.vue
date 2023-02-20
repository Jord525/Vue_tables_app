<template>
  <table class="table table-bordered">
    <thead>
      <Tr />
    </thead>
    <tbody class="thead-light" v-for="table in tables.posts" :key="table.id">
      <tr class="tr">
        <td scope="row">{{ table.productName }}</td>
        <td scope="col">{{ table.quantity }}</td>
        <td scope="col">{{ table.weight }} - гр</td>
        <td scope="col">{{ table.purchasePrice }} - руб</td>
        <td scope="col">{{ table.sellingPrice }} - руб</td>
        <button
          @click="deleteTable(table)"
          type="button"
          class="btn btn-outline-primary"
        >
          Удалить
        </button>
        <button
          @click="updateTable(table)"
          type="button"
          class="btn btn-outline-warning"
        >
          Редактировать
        </button>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapState } from "pinia";
import Tr from "./Tr.vue";
import { useTableStore } from "../../stores/table";
export default {
  components: {
    Tr,
  },
  methods: {
    ...mapActions(useTableStore, ["updateTable", "deleteTable"]),
  },
  computed: {
    ...mapState(useTableStore, ["tables"]),
  },
};
</script>