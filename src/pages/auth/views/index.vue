<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";

const env = import.meta.env;

const store = useAuthStore();
const { loading }: any = storeToRefs(store);
const { login } = store;

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

function onSubmit() {
  login({ username: email.value, password: password.value }).then(() => {
    router.push({ name: "products" });
  });
}
</script>
<template>
  
  <div class="auth-container">
    <q-card class="q-pa-md shadow-2 my_card">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold">
          Calculator login
        </div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section class="column" style="padding: 16px 16px 0 16px">
          <div>
            <label for="login" class="input-label">Login</label>
            <q-input
              for="login"
              outlined
              v-model="email"
              placeholder="Loginni kiriting"
              class="custom-input q-mt-sm"
            />
          </div>
          <div>
            <label for="login" class="input-label">Parol</label>
            <q-input
              outlined
              v-model="password"
              class="custom-input q-mt-sm"
              placeholder="Parolni kiriting"
              :type="!showPassword ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="password ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn
            style="border-radius: 8px"
            color="primary"
            rounded
            size="lg"
            label="Tizimga kirish"
            no-caps
            type="submit"
            class="full-width"
            :loading="loading"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.my_card {
  width: 20rem;
  @media (min-width: 1700px) {
    width: 40rem;
  }
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.auth-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(242, 243, 244, 1);
}

.cutom-toolbar {
  padding: 16px 10%;
  background-color: white;
}

.custom-input {
  border-radius: 8px;
  margin-bottom: 16px;
}

.header-title {
  margin-left: 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}
</style>
