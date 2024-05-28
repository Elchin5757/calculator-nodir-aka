<script setup lang="ts">
import BaseCard from "@/shared/components/BaseCard/index.vue";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";
import BaseBackCard from "@/shared/components/BaseBackCard/index.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProducts } from "./store";
import { storeToRefs } from "pinia";

const router = useRouter();

// store
const store = useProducts();
const { createLoading } = storeToRefs(store);
const { createProduct }: any = store;

// variables
const product_name = ref(null);
const product_price = ref(null);

// functions
function onSubmit() {
  createProduct({ name: product_name.value, price: product_price.value }).then(() => {
    router.push({ name: "products" });
  });
}

function onReset() {
  product_name.value = null;
  product_price.value = null;
  router.push({ name: "products" });
}
</script>

<template>
  <BaseBackCard class="q-mb-md" back-text="Ortga qaytish" />
  <BaseCard>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="column q-mb-sm">
        <div class="col">
          <label for="surname">Maxsulot nomi</label>
          <q-input
            autocomplete="off"
            for="surname"
            outlined
            dense
            v-model="product_name"
            placeholder="Maxsulot nomini kiriting"
            no-error-icon
            class="q-mt-sm"
            :rules="[(val) => !!val || 'Majburiy maydon']"
          />
        </div>
        <div class="col q-mt-sm">
          <label for="surname">Maxsulot narxi</label>
          <q-input
            autocomplete="off"
            for="surname"
            outlined
            dense
            v-model="product_price"
            placeholder="Maxsulot narxini kiriting"
            class="q-mt-sm"
            no-error-icon
            :rules="[(val) => !!val || 'Majburiy maydon']"
            type="number"
          />
        </div>
      </div>
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
  </BaseCard>
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
</style>