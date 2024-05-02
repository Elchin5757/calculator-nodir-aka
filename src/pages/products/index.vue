<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProducts } from "./store";
import { onMounted, ref } from "vue";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";

// variables
const createModal = ref(false)
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
            @click="createModal = true"
          >
            <BaseIcon name="add" category="global" class="default-btn__icon" />
            <span class="default-btn__text">Maxsulot qo'shish</span>
          </q-btn>
        </div>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="createModal">
    <q-card class="sms-modal">
      <BaseIcon
        name="close-outline"
        category="global"
        class="text-grey-6 sms-modal__close"
      />
      <q-card-section class="sms-modal__head">
        <div class="sms-modal__head--title">SMS yuborish</div>
      </q-card-section>

      <q-card-section class="sms-modal__body">
        <!-- <div v-if="!multiple" class="sms-modal__body--head">
          <q-avatar size="85px" v-viewer color="grey" style="cursor: pointer">
            <q-img
              :src="
                (user?.user_type === 'crm'
                  ? env.VITE_APP_IMG_URL
                  : env.VITE_APP_MENTALABA_IMG_URL) + user?.photo
              "
              style="height: 100%; max-width: 100%"
            >
              <template v-slot:error>
                <img
                  src="@/shared/assets/images/user-not-found.png"
                  alt="user not found"
                  style="height: 100%; width: 100%"
                />
              </template>
            </q-img>
          </q-avatar>
          <div class="sms-modal__body--head-title">{{ user?.full_name }}</div>
          <div class="sms-modal__body--head--phone">
            {{ formatPhone(user?.phone) }}
          </div>
        </div>
        <div v-else class="sms-modal__body--head--phone">Tanlangan 30 ta raqamga sms yuborish</div> -->

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
