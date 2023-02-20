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
      successMessage: "",
    }
  },
  getters: {},
  actions: {
    async getAll() {
      const response = await axios.get(
        `https://server-table-app.onrender.com/tables?limit=10&page=${this.page}`
      );
      this.tables = response.data;
    },
    saveTable() {
      let data = {
        productName: this.table.productName,
        quantity: this.table.quantity,
        weight: this.table.weight,
        purchasePrice: this.table.purchasePrice,
        sellingPrice: this.table.sellingPrice,
      };
      TableDataService.create(data).then((response) => {
        this.table.productName = response.data.productName;
        this.table.quantity = response.data.quantity;
        this.table.weight = response.data.weight;
        this.table.purchasePrice = response.data.purchasePrice;
        this.table.sellingPrice = response.data.sellingPrice;
        this.getAll();
        this.table.productName = "";
        this.table.quantity = "";
        this.table.weight = "";
        this.table.purchasePrice = "";
        this.table.sellingPrice = "";
        this.successMessage = "Товар успешно добавлен!";
      });
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
          .patch(`https://server-table-app.onrender.com/table/${id._id}`, {
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
