<script setup lang="ts">
import Drawer from "./sections/drawer.vue";
import { useMainLayoutStore } from "./store";
import { useRoute } from "vue-router";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";

const route = useRoute()
const { toggleSidebar } = useMainLayoutStore();

</script>
<template>
  <q-layout view="lHh LpR lFf" style="background-color: #f2f3f4">
    <q-header reveal class="text-white custom-header">
      <q-banner inline-actions rounded class="text-black custom-banner">
        <div class="flex items-center">
          <BaseIcon name="close" category="drawer" class="drawer-hamburger" @click="toggleSidebar()" />
          <span class="custom-banner__page-title">{{ route?.meta?.title+"" }}</span>
        </div>
      </q-banner>
    </q-header>

    <Drawer />

    <q-page-container>
      <q-page class="custom-page">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.custom-header {
  background-color: #f2f3f4;
  padding: 10px 16px 0;
  @media (min-width: 1440px) {
    padding: 12px 24px 0;
  }
}
.custom-banner {
  border-radius: 8px;
  padding: 10px 18px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  &__page-title {
    font-size: 16px;
    font-weight: 500;
  }
}

.custom-page {
  padding: 24px 24px 13px 24px;
}

.drawer-hamburger {
  cursor: pointer;
  transform: rotate(180deg);
  display: inline-block;
  margin-right: 16px;
  @media (min-width: 1401px) {
    display: none;
  }
}
</style>
