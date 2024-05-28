<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useOrders } from "./store";
import { onMounted, ref } from "vue";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";

// variables
const columns: any = [
  {
    name: "name",
    label: "Maxsulot nomi",
    field: "name",
    align: "left",
  },
  {
    name: "price",
    label: "Narxi",
    field: (val: any) => val.price + " so'm",
    align: "left",
  },
];
const search = ref("");
const clonedProducts = ref([]);

const pagination = {
  rowsPerPage: 0,
};

// store
const store = useOrders();
const { orders, tableLoading }: any = storeToRefs(store);
const { getOrders } = store;

function searchProduct(value: any): void {
  clonedProducts.value = orders.value.filter(
    (product: { name: string; price: number }) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    }
  );
}

// hooks
onMounted(async () => {
  await getOrders();
  clonedProducts.value = orders.value;
});
</script>

<template>
  <q-table
    :rows="clonedProducts"
    :columns="columns"
    :loading="tableLoading"
    
    rows-per-page-label="Sahifadagi qatorlar soni"
    row-key="id"
    v-model:pagination="pagination"
    table-style="max-height: calc(100vh - 300px);"
    hide-bottom
    class="custom-table"
    :card-style="{ fontWeight: '500' }"
    grid
  >
    <template #top>
      <div class="flex column full-width">
        <q-btn
          no-caps
          outline
          color="grey"
          class="default-btn q-mb-md"
          to="/crud"
          style="width: 100%; background-color: rgba(26, 92, 206, 0.1) !important;"
        >
          <BaseIcon name="add" category="global" class="default-btn__icon" />
          <span class="default-btn__text">Buyurtma qo'shish</span>
        </q-btn>
        <q-input
          input-class="search_input"
          dense
          outlined
          v-model="search"
          placeholder="Maxsulot nomi boyicha qidirish"
          @update:model-value="searchProduct"
          style="width: 100%"
          class="bg-white"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
  </q-table>
</template>

<style lang="scss">
.search_input {
  width: 100% !important;
}

.q-table--grid .q-table__top {
  padding: 0;
}

.sms-modal {
  border-radius: 16px !important;
  padding: 12px 18px;
  min-width: 600px;

  &__close {
    position: absolute;
    top: 20px;
    right: 18px;
  }

  &__head--title {
    text-align: center !important;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
  }

  &__body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &--head {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin-top: 20px;
      }

      &--phone {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin-top: 12px;
        color: $primary;
      }
    }
  }
}
</style>
