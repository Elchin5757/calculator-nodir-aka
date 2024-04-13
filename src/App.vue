<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getItem } from "./shared/utils/local_storage";
import { onMounted } from "vue";

const env = import.meta.env;
const route = useRoute();

const layout = computed(() => {
  if (!getItem("Authorization")) {
    return route.meta.layout;
  } else {
    return "MainLayout";
  }
});
</script>

<template>
  <component :is="layout" />
</template>

<style scoped></style>
