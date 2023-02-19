<template>
  <Header />
  Проверка комита
  <div>
    <Select
      :selected="selected"
      :sortSelect="sortSelect"
      :sel="sel"
      @input="sel = $event.target.value"
    />
    <Tables
      :updateTable="updateTable"
      :deleteTable="deleteTable"
      :tables="tables"
    />
    <div class="wrapperUpdateTable" v-if="isVisibleTableUpdate">
      <UpdateTable
        v-for="table in tables.posts"
        :key="table._id"
        :tables="tables"
        @closePopUpUpdate="isVisibleTableUpdate = false"
        :table="table"
        :updateTable="updateTable"
        :page-class="'page-item'"
      />
    </div>
  </div>
  <add-table
    @closePopup="isVisible = false"
    v-if="isVisible"
    :table="table"
    :getAll="getAll"
  >
  </add-table>
  <button @click="isVisible = true" class="btn btn-outline-primary">
    Добавить
  </button>
  <Paginate
    :page-count="this.tables.totalPages"
    :click-handler="PaginateHandler"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
  />
</template>
<script  >
import Paginate from "vuejs-paginate-next";
import Header from "../components/Header.vue";
import AddTable from "../components/AddTable.vue";
import UpdateTable from "../components/UpdateTable.vue";
import Select from "../components/Select.vue";
import Tables from "../components/TableComponents/Tables.vue";
import { useTableStore } from "../stores/table.js";
import { mapState, mapActions, mapWritableState } from "pinia";
export default {
  components: {
    Header,
    AddTable,
    UpdateTable,
    Select,
    Tables,
    Paginate,
  },
  methods: {
    ...mapActions(useTableStore, [
      "getAll",
      "sortSelect",
      "deleteTable",
      "updateTable",
      "PaginateHandler",
    ]),
  },

  computed: {
    ...mapState(useTableStore, ["tables", "selected", "table"]),
    ...mapWritableState(useTableStore, [
      "isVisibleTableUpdate",
      "isVisible",
      "sel",
    ]),
  },
  mounted() {
    this.getAll();
  },
};
</script>

