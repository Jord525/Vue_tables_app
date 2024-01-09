<template>
    <Select
        :selected="selected"
        :sortSelect="sortSelect"
        :sel="sel"
        @input="sel = $event.target.value"
    />
    <div class="TalblesWrapper">
        <Tables v-if="this.tables.tables" />
        <Loader v-else class="loader" />
    </div>
    <AddTable @closePopup="isVisible = false" v-if="isVisible" />
    <div style="display: flex; align-items: center; margin;: 5px, 5px, 5px, 5px">
        <Paginate
            v-if="this.tables.tables"
            :page-count="this.tables.totalPages"
            :click-handler="PaginateHandler"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
        />
        <button
            v-if="this.tables.tables && this.token"
            @click="isVisible = true"
            class="btn btn-outline-primary"
            style="height: 40px"
        >
            Добавить
        </button>
    </div>
</template>
<script>
import Paginate from 'vuejs-paginate-next';
import Header from '../components/Header.vue';
import AddTable from '../components/AddTable.vue';
import UpdateTable from '../components/UpdateTable.vue';
import Select from '../components/Select.vue';
import Tables from '../components/TableComponents/Tables.vue';
import { useTableStore } from '../stores/table.js';
import { useUserStore } from '../stores/user.js';
import { mapState, mapActions, mapWritableState } from 'pinia';
import Loader from '../components/Loader.vue';
export default {
    components: {
        Header,
        AddTable,
        UpdateTable,
        Select,
        Tables,
        Paginate,
        Loader,
    },
    methods: {
        ...mapActions(useTableStore, [
            'getAll',
            'updateTable',
            'PaginateHandler',
            'sortSelect',
        ]),
    },

    computed: {
        ...mapState(useTableStore, ['tables', 'table', 'selected']),
        ...mapState(useUserStore, ['token']),
        ...mapWritableState(useTableStore, ['isVisibleTableUpdate', 'isVisible', 'sel']),
    },
    mounted() {
        this.getAll();
    },
};
</script>

<style>
.TalblesWrapper {
    display: flex;
    justify-content: center;
    height: 74svh;
}
</style>
