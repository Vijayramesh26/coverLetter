import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import RecruiterGenerator from "@/views/RecruiterGenerator.vue";
import TemplateAdmin from "@/views/TemplateAdmin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/coverletter",
    name: "Home",
    component: Home,
  },
  {
    path: "/resume",
    name: "Resume",
    component: () => import("@/views/ResumeBuilder.vue"),
  },
  { path: "/admin/templates", component: TemplateAdmin },
  { path: "/recruiter", name: "Recruiter", component: RecruiterGenerator },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
