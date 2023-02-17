<template>
  <div class="popup_wrapper">
    <div class="v-popup">
      <div class="popup__header">
        <button
          @click="closePopUpUpdate"
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
          <div class="popup_footer">
            <button @click="updateTable(table)" class="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVisibleTableUpdate: true,
    };
  },
  props: ["table", "tables", "updateTable"],
  methods: {},

  methods: {
    closePopUpUpdate() {
      this.$emit("closePopUpUpdate");
    },
  },
};
</script>
<style scoped>
.popup__contet {
  display: flex;
}
</style>