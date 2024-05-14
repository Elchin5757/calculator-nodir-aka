import { h, resolveComponent } from "vue";

export const products = [
  {
    path: "/products",
    name: "products",
    component: {
      render() {
        return h(resolveComponent("router-view"));
      },
    },
    meta: { requiresAuth: true, title: "Maxsulotlar" },
    redirect: { name: "table" },
    children: [
      {
        path: "table",
        name: "table",
        component: () => import("./index.vue"),
      },
      {
        path: "crud",
        name: "crud",
        component: () => import("./crud.vue"),
      }
    ]
  }
]