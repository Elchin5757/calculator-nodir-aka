export const auth = [
  {
    path: '/auth',
    name: "Authorization",
    component: ()=> import("./views/index.vue"),
    meta: {
      layout: "AuthLayout"
    }
  }
]