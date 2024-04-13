<template>
  <component :is="iconComponent"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent, type PropType, toRefs, watch } from "vue";
const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
    validate: (value: any) => {
      if (typeof value !== "string") {
        return "You should pass string type props";
      }
    },
  },
  category: {
    type: String as PropType<string>,
    required: true,
    validate: (value: any) => {
      if (typeof value !== "string") {
        return "You should pass string type props";
      }
    },
  },
});
toRefs(props);
let iconComponent = defineAsyncComponent(
  () => import(`../../assets/icons/${props.category}/${props.name}.vue`)
);

watch(props, () => {
  iconComponent = defineAsyncComponent(
    () => import(`../../assets/icons/${props.category}/${props.name}.vue`)
  );
});
</script>
