<template>
  <Header />
  <div>
    <Select
      :selected="selected"
      :sortSelect="sortSelect"
      :sel="sel"
      @input="sel = $event.target.value"
    />
    {{ count }}
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
import axios from "axios";
import Header from "../components/Header.vue";
import TableDataService from "../service/apiCals.js";
import AddTable from "../components/AddTable.vue";
import UpdateTable from "../components/UpdateTable.vue";
import Select from "../components/Select.vue";
import Tables from "../components/TableComponents/Tables.vue";
import { useCounterStore } from "../stores/counter.js";
import { mapState } from "pinia";
export default {
  components: {
    Header,
    AddTable,
    UpdateTable,
    Select,
    Tables,
    Paginate,
  },

  data() {
    return {
      page: 1,
      sel: "",
      selected: [
        { value: "по умолчанию" },
        { value: "по алфавиту" },
        { value: "по количеству" },
      ],
      tables: [],
      isVisibleTableUpdate: false,
      isVisible: false,
      table: {
        productName: "",
        quantity: "",
        weight: "",
        purchasePrice: "",
        sellingPrice: "",
      },
    };
  },
  methods: {
    sortSelect() {
      if (this.sel === "по умолчанию") {
        return;
      } else if (this.sel === "по алфавиту") {
        return this.sortByProductName();
      } else if (this.sel === "по количеству") {
        return this.sortByQuantity();
      }
    },
    PaginateHandler: function (pageNum) {
      this.page = pageNum;
      this.getAll();
    },
    deleteTable(post) {
      this.tables.posts.find(
        (id) => id._id !== post._id,
        console.log(post),
        TableDataService.delete(post._id).then(() => {
          this.getAll();
        })
      );
    },
    updateTable(id) {
      this.tables.posts.find(
        (des) => des._id !== id._id,
        console.log(id),
        axios
          .patch(`http://localhost:3333/table/${id._id}`, {
            productName: id.productName,
            quantity: id.quantity,
            weight: id.weight,
            purchasePrice: id.purchasePrice,
            sellingPrice: id.sellingPrice,
          })
          .then(() => {
            this.isVisibleTableUpdate = true;
            this.getAll();
          })
      );
    },
    async getAll() {
      const response = await axios.get(
        `http://localhost:3333/tables?limit=10&page=${this.page}`
      );
      this.tables = response.data;
    },
    sortByProductName() {
      this.tables.posts.sort((a, b) => {
        let nameA = a.productName.toLowerCase();
        let nameB = b.productName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },
    sortByQuantity() {
      this.tables.posts.sort((a, b) => {
        return b.quantity - a.quantity;
      });
    },
  },

  computed: {
    ...mapState(useCounterStore, ["count"]),
  },
  mounted() {
    this.getAll();
  },
};
</script>

