<template>
    <div id="list">
        <table>
            <tr v-for="table in tables">
                <td>
                    <span v-if="!table.edit">{{ table.productName }}</span>
                    <input type="text" class="form-control" v-model="table.productName" v-if="table.edit" />
                </td>
                <td>
                    <span v-if="!table.edit">{{ table.quantity }}</span>
                    <input type="text" class="form-control" v-model="table.quantity" v-if="table.edit" />
                </td>
                <td>
                    <span v-if="!table.edit">{{ table.purchasePrice }}</span>
                    <input type="text" class="form-control" v-model="table.purchasePrice" v-if="table.edit" />
                </td>
                <td>
                    <span v-if="!table.edit">{{ table.purchasePrice }}</span>
                    <input type="text" class="form-control" v-model="table.purchasePrice" v-if="table.edit" />
                </td>
                <td>
                    <span v-if="!table.edit">{{ table.sellingPrice }}</span>
                    <input type="text" class="form-control" v-model="table.sellingPrice" v-if="table.edit" />
                </td>
                <td>
                    <button v-if="!table.edit" v-on:click="editPerson(table)">edit</button>
                    <button v-if="table.edit" v-on:click="updateTable(table)">cancel</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            tables: [],
        }
    },
    computed: {},
    methods: {
        async getAll() {
            const response = await axios.get(`https://server-table-app.onrender.com/tables`)
            this.tables = response.data.posts
        },
        editPerson: function (table) {
            table.edit = true
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
                    this.isVisibleTableUpdate = true
                    this.getAll()
                })
        },

        cancelPerson: function (table) {
            table.edit = false
        },
    },
    mounted() {
        this.getAll()
    },
}
</script>
<style>
table {
    width: 100%;
}
table td {
    border: 1px solid #ccc;
}
</style>
