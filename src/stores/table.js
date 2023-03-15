import { defineStore } from "pinia";
import axios from "axios";
import TableDataService from "../service/apiCals.js";

export const useTableStore = defineStore("Table", {
  state: () => {
    return {
      sortBy: '',
      tables: [],
      page: 1,
      sel: "",
      selected: [
        { value: "по умолчанию" },
        { value: "по алфавиту" },
        { value: "по количеству" },
      ],
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
        `https://server-table-app.onrender.com/tables?${this.sortBy}limit=10&page=${this.page}`
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
        return {
          value: this.sortBy = '',
          url: this.getAll()
        };
      } else if (this.sel === "по алфавиту") {
        return {
          value: this.sortBy = 'sort=productName:1&',
          url: this.getAll()
        };
      } else if (this.sel === "по количеству") {
        return {
          value: this.sortBy = 'sort=quantity:-1&',
          url: this.getAll()
        };
      }
    },

    deleteTable(post) {
      TableDataService.delete(post._id)
        .then(() => {
          this.getAll();
        })
    },
    updateTable(id) {
      axios
        .patch(`https://server-table-app.onrender.com/table/${id._id}`, {
          productName: id.productName,
          quantity: id.quantity,
          weight: id.weight,
          purchasePrice: id.purchasePrice,
          sellingPrice: id.sellingPrice,
        })
        .then(() => {
          this.getAll();
        })
    },
  },
});
