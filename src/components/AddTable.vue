<template >
  <div class="popup_wrapper">
    <div class="v-popup">
      <div class="popup__header">
        <button
          @click="closePopUp"
          class="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <div class="popup__contet">
        <div class="inputTable">
          <div class="text-primary">
            Имя продукта
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="table.productName"
              name="title"
            />
          </div>
          <div class="text-primary">
            Количество
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="table.quantity"
              name="title"
            />
          </div>
          <div class="text-primary">
            Вес
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="table.weight"
              name="title"
            />
          </div>
          <div class="text-primary">
            Цена закупки
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="table.purchasePrice"
              name="title"
            />
          </div>
          <div class="text-primary">
            Цена продажи
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="table.sellingPrice"
              name="title"
            />
          </div>
        </div>
        <div class="success inputTable" v-if="successMessage != ''">
          <p class="success__p">{{ successMessage }}</p>
        </div>
        <div class="popup_footer">
          <button @click="saveTable" class="btn btn-success">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableDataService from "../service/apiCals.js";
export default {
  data() {
    return {
      successMessage: "",
    };
  },
  props: ["table", "getAll"],
  methods: {
    closePopUp() {
      this.$emit("closePopup");
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
  },
};
</script>

<style scoped>
.popup_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgb(145, 145, 145);
}
.v-popup {
  opacity: 1 !important;
  border-radius: 15px;
  width: 500px;
  background-color: rgb(224, 224, 224);
}
.inputTable {
  width: 200px;
  margin: auto;
}
.success__p {
  color: #67a10f;
}
.popup__header {
  margin: 7px;
}
.btn {
  margin: 5px;
}
</style>