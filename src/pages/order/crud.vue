<script setup lang="ts">
import BaseCard from "@/shared/components/BaseCard/index.vue";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";
import BaseBackCard from "@/shared/components/BaseBackCard/index.vue";
import { useProducts } from "../products/store";
import { useOrders } from "./store";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

// products store
const productsStore = useProducts();
const { products } = storeToRefs(productsStore);
const { getProducts } = productsStore;

// orders store
const ordersStore = useOrders();
const { createLoading } = storeToRefs(ordersStore);
const { createOrder } = ordersStore;

// variables
const orders = ref([
  {
    product_id: null,
    count: null,
    total_cost: null,
  },
]);
const clonedProducts: any = ref(null);

// functions
function onSubmit() {}

function onReset() {}

function filterProducts(val: any, update: any) {
  update(() => {
    const needle = val.toLocaleLowerCase();
    clonedProducts.value = products.value.filter(
      (v: any) => v.name.toLocaleLowerCase().indexOf(needle) > -1
    );
  });
}

function handleOrderCount(order: any, count: any) {
  order.total_cost =
    new Intl.NumberFormat("fr-FR").format(+count * order?.product_id.price) +
    " sum";
}

function handleProduct(e: any, order: any) {
  if (order?.count) {
    order.total_cost =
      new Intl.NumberFormat("fr-FR").format(+order.count * e?.price) + " sum";
  }
  if (!e) {
    order.count = null;
    order.total_cost = null;
  }
}

function handleRemoveOrder(index: any) {  
  orders.value.splice(index, 1);
}

onMounted(async () => {
  await getProducts();
  clonedProducts.value = JSON.parse(JSON.stringify(products.value));
});
</script>

<template>
  <BaseBackCard class="q-mb-md" back-text="Ortga qaytish" />
  <q-form @submit="onSubmit" @reset="onReset">
    <q-btn
      type="button"
      class="default-btn q-mb-md"
      style="width: 100%; background-color: rgba(26, 92, 206, 0.1) !important; box-shadow: none !important;"
      @click="orders.push({ product_id: null, count: null, total_cost: null })"
    >
      <BaseIcon name="add" category="global" class="default-btn__icon" />
      <span class="default-btn__text">Buyurtma qo'shish</span>
    </q-btn>
    <template v-for="(order, index) in orders" :key="index">
    <BaseCard class="q-mb-md">
        <div class="q-mb-md flex items-center justify-between">
          <span class="title">Buyurtma: {{ index + 1 }}</span>
          <BaseIcon v-if="orders.length > 1" name="trash-remove" category="global" class="text-red" @click="handleRemoveOrder(index)" />
        </div>
        <q-select
          @update:model-value="handleProduct($event, order)"
          outlined
          dense
          v-model="order.product_id"
          use-input
          hide-selected
          clearable
          @filter="filterProducts"
          :options="clonedProducts"
          placeholder="Maxsulotni tanlang"
          input-debounce="0"
          :rules="[(val) => !!val || 'Majburiy maydon']"
          option-value="id"
          option-label="name"
          fill-input
        >
          <template v-slot:option="scope">
            <div class="option" v-bind="scope.itemProps">
              <span class="title">{{ scope.opt.name }}</span>
              <span class="label"
                >{{
                  new Intl.NumberFormat("fr-FR").format(scope.opt.price)
                }}
                sum</span
              >
            </div>
          </template>
          </q-select>
        <q-input
          :disable="!order.product_id"
          @update:model-value="(count: any) => handleOrderCount(order, count)"
          :debounce="300"
          outlined
          dense
          v-model="order.count"
          placeholder="Soni"
          type="number"
          class="q-mt-sm"
          :rules="[(val) => !!val || 'Majburiy maydon']"
        />
        <q-input
          outlined
          disable
          dense
          v-model="order.total_cost"
          placeholder="Narxi"
          type="text"
          class="q-mt-sm"
        />
      </BaseCard>
    </template>

    <div style="width: 100%; display: flex; align-items: center; flex-wrap: wrap; column-gap: 12px; row-gap: 12px;">
        <q-btn
          no-caps
          unelevated
          class="action-btn action-btn--cancel"
          type="reset"
        >
          <BaseIcon
            name="cancel"
            category="global"
            class="q-mr-sm text-grey-7"
            style="font-size: 20px"
          />
          <div class="action-btn__text text-grey-7">Bekor qilish</div>
        </q-btn>
        <q-btn
          no-caps
          unelevated
          class="action-btn action-btn--save"
          type="submit"
          :loading="createLoading"
        >
          <BaseIcon
            name="save"
            category="global"
            class="q-mr-md text-primary"
            style="font-size: 20px"
          />
          <div class="action-btn__text text-primary">Qo'shish</div>
        </q-btn>
      </div>
  </q-form>
</template>

<style scoped lang="scss">

.action-btn {
  border-radius: 8px;
  padding: 8px 20px;
  width: 100%;


  &--save {
    background: rgba(26, 92, 206, 0.1);
  }

  &--cancel {
    background: rgba(137, 150, 162, 0.1);
  }

  &__text {
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
  }
}
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
}
</style>
