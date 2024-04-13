export const products = [
  {
    path: "/products",
    name: "products",
    component: () => import("./index.vue"),
    meta: { requiresAuth: true, title: "Maxsulotlar" }
  }
]