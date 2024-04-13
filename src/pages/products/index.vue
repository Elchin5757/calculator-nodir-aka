<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProducts } from "./store";
import { onMounted, ref } from "vue";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";

// variables
const columns: any = [
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "left",
  },
  {
    name: "name",
    label: "Maxsulot nomi",
    field: "name",
    align: "left",
  },
  {
    name: "price",
    label: "Maxsulot narxi",
    field: "price",
    align: "left",
  },
];
const search = ref("");
const clonedProducts = ref([]);

const pagination = {
  rowsPerPage: 0,
};

// store
const store = useProducts();
const { products, productsLoading } = storeToRefs(store);
const { getProducts } = store;

function searchProduct(value: any): void {
  clonedProducts.value = products.value.filter((product: { name: string, price: number }) => {
    return product.name.toLowerCase().includes(value.toLowerCase())
  })
}

// hooks
onMounted(async () => {
  await getProducts();
  clonedProducts.value = products.value
});
</script>
<template>
  <q-table
    :rows="clonedProducts"
    :columns="columns"
    :loading="productsLoading"
    flat
    rows-per-page-label="Sahifadagi qatorlar soni"
    row-key="id"
    v-model:pagination="pagination"
    table-style="max-height: calc(100vh - 150px)"
    hide-bottom
    class="custom-table"
    :card-style="{ fontWeight: '500' }"
  >
    <template #top>
      <div class="flex items-center justify-between full-width">
        <div class="flex item-center q-gutter-x-md">
          <q-input
            input-class="search_input"
            dense
            outlined
            debounce="500"
            v-model="search"
            placeholder="Maxsulot nomi boyicha qidirish"
            @update:model-value="searchProduct"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="flex items-center q-gutter-x-md">
          <q-btn
            no-caps
            outline
            color="grey"
            class="default-btn"
          >
            <BaseIcon name="add" category="global" class="default-btn__icon" />
            <span class="default-btn__text">Maxsulot qo'shish</span>
          </q-btn>
        </div>
      </div>
    </template>
  </q-table>
</template>

<style lang="scss">
.custom-table {
  thead tr:first-child th {
    background-color: white;
    font-weight: 600;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }

  tbody {
    scroll-margin-top: 48px;
  }
}

.search_input {
  width: 370px;
}
</style>
