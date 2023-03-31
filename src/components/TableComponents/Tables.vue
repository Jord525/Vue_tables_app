<template>
    <table class="table table-bordered">
        <thead>
            <Tr />
        </thead>
        <tbody class="thead-light" v-for="table in tables.tables" :key="table.id">
            <tr class="tr">
                <td scope="row">
                    <span v-if="!table.edit">{{ table.productName }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="table.productName"
                        v-if="table.edit"
                    />
                </td>
                <td scope="col">
                    <span v-if="!table.edit">{{ table.quantity }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="table.quantity"
                        v-if="table.edit"
                    />
                </td>
                <td scope="col">
                    <span v-if="!table.edit">{{ table.purchasePrice }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="table.purchasePrice"
                        v-if="table.edit"
                    />
                </td>
                <td scope="col">
                    <span v-if="!table.edit">{{ table.purchasePrice }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="table.purchasePrice"
                        v-if="table.edit"
                    />
                </td>
                <td scope="col">
                    <span v-if="!table.edit">{{ table.sellingPrice }}</span>
                    <input
                        type="text"
                        class="form-control"
                        v-model="table.sellingPrice"
                        v-if="table.edit"
                    />
                </td>
                <button @click="deleteTable(table)" type="button" class="btn btn-outline-primary">
                    Удалить
                </button>
                <button
                    v-if="!table.edit"
                    class="btn btn-outline-warning"
                    @:click="editPerson(table)"
                >
                    edit
                </button>
                <button
                    v-if="table.edit"
                    class="btn btn-outline-warning"
                    @:click="updateTable(table)"
                >
                    Сохранить
                </button>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import Tr from './Tr.vue'
import { useTableStore } from '../../stores/table'
export default {
    data() {
        return {
            edit: false,
        }
    },
    components: {
        Tr,
    },
    methods: {
        ...mapActions(useTableStore, ['updateTable', 'deleteTable']),

        editPerson: function (table) {
            table.edit = true
        },
        cancelPerson: function (table) {
            table.edit = false
        },
    },
    computed: {
        ...mapState(useTableStore, ['tables']),
    },
}
</script>
