import { defineStore } from "pinia";
import axios from "axios";
import TableDataService from "../service/apiCals.js";
import { BASE_URL } from "../service/api.js";
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
        // `https://server-table-app.onrender.com/tables?${this.sortBy}limit=10&page=${this.page}`
        `${BASE_URL}/tables?limit=10&page=${this.page}&${this.sortBy}`
      );
      this.tables = response.data;
    },
    saveTable() {
      let data = {
        productName: this.table.productName,
        quantity: Number(this.table.quantity),
        weight: Number(this.table.weight),
        purchasePrice: Number(this.table.purchasePrice),
        sellingPrice: Number(this.table.sellingPrice),
      };
      TableDataService.create(data).then((response) => {
        this.table.productName = response.data.productName;
        this.table.quantity = Number(response.data.quantity);
        this.table.weight = Number(response.data.weight);
        this.table.purchasePrice = Number(response.data.purchasePrice);
        this.table.sellingPrice = Number(response.data.sellingPrice);
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
          value: this.sortBy = 'sortByProductName=desc',
          url: this.getAll()
        };
      } else if (this.sel === "по количеству") {
        return {
          value: this.sortBy = 'sortByQuantity=desc',
          url: this.getAll()
        };
      }
    },

    deleteTable(post) {
      TableDataService.delete(post.id)
        .then(() => {
          this.getAll();
        })
    },
    updateTable(id) {
      axios
        .patch(`${BASE_URL}/table/${id.id}`, {
          productName: id.productName,
          quantity: Number(id.quantity),
          weight: Number(id.weight),
          purchasePrice: Number(id.purchasePrice),
          sellingPrice: Number(id.sellingPrice),
        })
        .then(() => {
          this.getAll();
        })
    },
  },
});
