export const orders = [
  {
    path: "/",
    name: "orders",
    component: () => import("./index.vue"),
    meta: { requiresAuth: true, title: "Zakazlar" }
  }
]