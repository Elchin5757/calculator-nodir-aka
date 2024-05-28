import { h, resolveComponent } from "vue";

export const orders = [
  {
    path: "/",
    name: "orders",
    component: {
      render() {
        return h(resolveComponent("router-view"));
      },
    },
    meta: { requiresAuth: true, title: "Zakazlar" },
    redirect: { name: "orders-table" },
    children: [
      {
        path: "table",
        name: "orders-table",
        component: () => import("./table.vue"),
      },
      {
        path: "crud",
        name: "orders-crud",
        component: () => import("./crud.vue"),
      }
    ]
  }
]