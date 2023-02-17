import { defineStore } from "pinia";
import axios from "axios";
import TableDataService from "../service/apiCals.js";

export const useTableStore = defineStore("Table", {
  state: () => {
    return {
      tables: [],
      page: 1,
      sel: "",
      selected: [
        { value: "по умолчанию" },
        { value: "по алфавиту" },
        { value: "по количеству" },
      ],

      isVisibleTableUpdate: false,
      isVisible: false,
      table: {
        productName: "",
        quantity: "",
        weight: "",
        purchasePrice: "",
        sellingPrice: "",
      },
    }
  },
  getters: {},
  actions: {
    async getAll() {
      const response = await axios.get(
        `http://localhost:3333/tables?limit=10&page=${this.page}`
      );
      this.tables = response.data;
    },
    PaginateHandler: function (pageNum) {
      this.page = pageNum;
      this.getAll();
    },
    sortSelect() {
      if (this.sel === "по умолчанию") {
        return;
      } else if (this.sel === "по алфавиту") {
        return this.sortByProductName();
      } else if (this.sel === "по количеству") {
        return this.sortByQuantity();
      }
    },
    sortByQuantity() {
      this.tables.posts.sort((a, b) => {
        return b.quantity - a.quantity;
      });
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
  },
});
