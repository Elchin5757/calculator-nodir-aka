import { createRouter, createWebHashHistory } from "vue-router";
import { auth } from "@/pages/auth/router";
import { orders } from "@/pages/order/router"
import { products } from "@/pages/products/router"
import { getItem } from "@/shared/utils/local_storage";

const routes = [
  ...auth,
  ...orders,
  ...products
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to: any, _, next) => {
  const isAuthenticated = getItem("Authorization");
  const publicPages = ["/auth"];

  const isGuest = publicPages.includes(to.path);
  if (!isGuest && !isAuthenticated) {
    next({ name: "Authorization" });
  } else if (isGuest && isAuthenticated) {
    next({ name: "products" });
  } else next();
});

export default router;
