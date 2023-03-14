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
    <div class="popup__contet" >
      <div class="inputTable"  >
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
  </div >
</template >
<script>
import { mapActions, mapState } from 'pinia';
import { useTableStore } from '../stores/table';
export default {
  data() {
    return { 
      isVisibleTableUpdate: true,
      flex: ''
    };
  },
  props: ["table"],
  methods: {
    ...mapActions(useTableStore, ["updateTable"]),
    ...mapState(useTableStore, ['tables']),

    closePopUpUpdate() {
      this.$emit("closePopUpUpdate");
    },
  },

};
</script>
<style scoped>
.popup__header {
  margin: 7px;
}
.popup__contet {
  display: flex;
}
.popup_wrapper {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: grey;
}
</style> 