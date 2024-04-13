<script setup lang="ts">
import BaseIcon from '@/shared/components/BaseIcon/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
    backText: {
        type: String,
        default: 'Arizachi qo’shish'
    }
})
</script>
<template>
    <div class="back-card">
        <div class="back-card__button" @click="router.go(-1)">
            <BaseIcon name="back" category="global" />
            <span>{{backText}}</span>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.back-card {
    background-color: white;
    border-radius: 8px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);

    &__button {
        display: flex;
        align-items: center;
        column-gap: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 16px;
        font-weight: 500;
        &:hover{
            transform: scale(1.02);
        }
    }
}
</style>