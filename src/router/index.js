import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RecruiterGenerator from "@/views/RecruiterGenerator.vue";
import TemplateAdmin from "@/views/TemplateAdmin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/coverletter",
    name: "Home",
    component: Home,
  },
  { path: "/", component: RecruiterGenerator },
  { path: "/admin/templates", component: TemplateAdmin },
  { path: '/recruiter', redirect: '/' }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
