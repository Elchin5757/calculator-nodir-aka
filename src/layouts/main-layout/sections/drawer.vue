<script setup lang="ts">
import { ref, type Ref, computed } from "vue";
import { useMainLayoutStore } from "../store";
import { storeToRefs } from "pinia";
import { mainPages } from "../helper";
import BaseIcon from "@/shared/components/BaseIcon/index.vue";

const { sidebar } = storeToRefs(useMainLayoutStore());
const miniState: Ref<boolean> = ref(false);

function drawerClick(e: any) {
  if (miniState.value) {
    miniState.value = false;
  }
}
function toggleLeftDrawer() {
  miniState.value = true;
}


</script>
<template>
  <q-drawer
    v-model="sidebar"
    :mini-width="75"
    :mini="miniState"
    show-if-above
    :width="300"
    :breakpoint="1400"
    @click.capture="drawerClick"
  >
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center" style="overflow: hidden; padding: 30px;">
      <div
        class="sidebar-header sidebar-header-big"
        v-if="!miniState"
      >
        Calculator admin
      </div>
      <BaseIcon
        v-if="!miniState"
        name="close"
        category="drawer"
        class="drawer-hamburger"
        @click="toggleLeftDrawer"
      />
    </div>
    <!-- SIDEBAR PAGES -->
    <q-scroll-area
      style="height: calc(100% - 100px)"
      :horizontal-thumb-style="{ opacity: '0' }"
      :thumb-style="{ left: '2px', width: '3px' }"
    >
      <q-list padding class="sidebar-list">
        <q-item
          v-for="(page, index) in mainPages"
          :key="index"
          clickable
          v-ripple
          manual-focus
          class="sidebar-list__item"
          :to="{ path: page.route }"
          tag="router-link"
        >
          <q-item-section
            avatar
            :class="{ 'sidebar-list__item-icon': !miniState }"
          >
            <BaseIcon :name="page.icon" category="drawer" />
          </q-item-section>
          <q-item-section>{{ page.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="scss">
.q-router-link--active {
  background: rgba(15, 96, 255, 0.1) !important;
  color: #0f60ff;
}

.sidebar-header {
  width: 186px;
  line-height: 19px;
  margin-left: 5px;
  &-small {
    font-size: 13px;
    font-weight: 700;

  }
  &-big {
    font-size: 16px;
    font-weight: 700;
  }
}
.sidebar-list {
  padding: 10px;
  &__item {
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;

    &-icon {
      min-width: 40px;
    }
  }
}

.drawer-hamburger {
  cursor: pointer;
  margin-left: auto;
  display: none;
  @media (min-width: 1401px) {
    display: block;
  }
}
</style>
