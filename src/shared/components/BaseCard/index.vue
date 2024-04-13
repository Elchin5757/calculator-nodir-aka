<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 15px;
  @media (min-width: 1600) {
    padding: 20px;
  }
}
</style>
