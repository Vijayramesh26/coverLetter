<template>
  <v-app class="app-bg">
    <v-app-bar app flat color="white" class="px-md-12 border-bottom">
      <div class="d-flex align-center">
        <v-avatar color="primary lighten-5" size="38" class="mr-3" to="/">
          <ZhaLogo class="yezhu-logo" />
        </v-avatar>
        <div
          class="d-flex flex-column justify-center ml-1"
          style="line-height: 1.1"
        >
          <div
            class="font-weight-black primary--text letter-spacing-tight text-h6"
          >
            Yezhu
          </div>
          <div
            class="text-caption grey--text font-weight-medium mt-n1 hidden-sm-and-down"
          >
            The Rise
          </div>
        </div>
      </div>

      <v-spacer />

      <v-tabs
        color="primary"
        class="hidden-sm-and-down ml-5"
        optional
        hide-slider
      >
        <v-tab to="/" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-view-dashboard-outline</v-icon> Dashboard
        </v-tab>
        <v-tab
          to="/recruiter"
          class="text-none font-weight-bold px-6 mr-2 rounded-pill"
        >
          <v-icon left small>mdi-message-text-outline</v-icon> Generator
        </v-tab>
        <v-tab
          to="/coverletter"
          class="text-none font-weight-bold px-6 mr-2 rounded-pill"
        >
          <v-icon left small>mdi-file-document-outline</v-icon> Cover Letter
        </v-tab>
        <v-tab
          to="/resume"
          class="text-none font-weight-bold px-6 mr-2 rounded-pill"
        >
          <v-icon left small>mdi-account-details-outline</v-icon> Resume
        </v-tab>
      </v-tabs>

      <v-spacer />

      <v-btn icon color="primary" class="mr-2" @click="startTour">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>

      <div class="d-flex align-center flex-shrink-0">
        <v-chip
          v-if="$vuetify.breakpoint.lgAndUp"
          pill
          color="grey lighten-4"
          class="pr-4"
        >
          <v-avatar
            left
            color="primary"
            size="24"
            class="white--text text-caption"
            >&copy;</v-avatar
          >
          <span class="text-caption font-weight-bold grey--text text--darken-3"
            >2026 Yezhu. All rights reserved.</span
          >
        </v-chip>

        <v-avatar
          v-else-if="$vuetify.breakpoint.mdOnly"
          color="primary"
          size="32"
          class="white--text text-caption"
        >
          VR
        </v-avatar>

        <v-btn
          icon
          class="hidden-md-and-up ml-2"
          @click="mobileMenu = !mobileMenu"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="mobileMenu"
      fixed
      temporary
      right
      width="300"
      class="mobile-drawer"
    >
      <div class="pa-6 d-flex align-center justify-space-between border-bottom">
        <div class="d-flex align-center">
          <v-avatar color="primary lighten-5" size="32" class="mr-2">
            <ZhaLogo x-small class="yezhu-logo" />
          </v-avatar>
          <span class="font-weight-black primary--text">Yezhu</span>
        </div>
        <v-btn icon small @click="mobileMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-list nav class="pa-4">
        <v-subheader class="text-overline font-weight-bold grey--text"
          >Navigation</v-subheader
        >
        <v-list-item to="/" rounded="pill" color="primary">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-view-dashboard-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold"
            >Dashboard</v-list-item-title
          >
        </v-list-item>

        <v-subheader class="text-overline font-weight-bold grey--text mt-4"
          >Growth Tools</v-subheader
        >
        <v-list-item to="/recruiter" rounded="pill" color="primary">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-message-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold"
            >Outreach</v-list-item-title
          >
        </v-list-item>

        <v-list-item to="/coverletter" rounded="pill" color="primary">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-file-document-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold"
            >Cover Letter</v-list-item-title
          >
        </v-list-item>

        <v-list-item to="/resume" rounded="pill" color="primary">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold">Resume</v-list-item-title>
        </v-list-item>

        <v-subheader class="text-overline font-weight-bold grey--text mt-4"
          >Settings</v-subheader
        >
        <v-list-item to="/admin/templates" rounded="pill" color="primary">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-bold"
            >Templates</v-list-item-title
          >
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4 border-top bg-grey-lighten-5">
          <div class="d-flex align-center">
            <v-avatar
              color="primary"
              size="40"
              class="white--text font-weight-bold mr-3"
              >VR</v-avatar
            >
            <div class="d-flex flex-column">
              <span class="text-body-2 font-weight-bold primary--text"
                >Vijay Ramesh</span
              >
              <span class="text-caption grey--text">Pro Account</span>
            </div>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ZhaLogo from "@/components/ZhaLogo.vue";

export default {
  components: {
    ZhaLogo,
  },
  data: () => ({
    mobileMenu: false,
  }),
  methods: {
    startTour() {
      // Each component (Dashboard, Home, ResumeBuilder, RecruiterGenerator)
      // listens for this event on $root and checks its own route.
      this.$root.$emit("start-tour");
    },
  },
};
</script>

<style>
/* Clean, Modern Typography */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

.v-application {
  font-family: "Inter", sans-serif !important;
}

.app-bg {
  background-color: #f3f4f6 !important; /* Soft grey background makes white paper pop */
}

.border-bottom {
  border-bottom: 1px solid #e5e7eb !important;
}

.yezhu-logo {
  transition: transform 0.3s ease;
}

.v-avatar:hover .yezhu-logo {
  transform: translateY(-2px) rotate(-5deg);
}

.letter-spacing-tight {
  letter-spacing: -0.5px;
}

/* Make Tabs look like pills instead of underlined text */
.v-tab--active {
  background-color: #eff6ff !important; /* Very light blue */
}

.v-tabs-bar {
  background-color: transparent !important;
}

/* Vue Tour Global Overrides */
.v-tour {
  z-index: 9999 !important;
}

.v-tour__step {
  z-index: 10000 !important;
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.v-tour__step--highlighted {
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4) !important;
}

.v-tour__step__header {
  background-color: #1976d2 !important;
  color: white !important;
  border-top-left-radius: 12px !important;
  border-top-right-radius: 12px !important;
  padding: 12px 16px !important;
}

.v-tour__step__content {
  padding: 16px !important;
  font-size: 14px !important;
}

.v-tour__step__buttons {
  padding: 12px 16px !important;
  display: flex !important;
  justify-content: flex-end !important;
}

.v-step__button {
  background: #1976d2 !important;
  color: white !important;
  border-radius: 6px !important;
  padding: 6px 16px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

.v-step__button-skip {
  background: transparent !important;
  color: #666 !important;
}

.v-step__button-previous {
  background: #f0f0f0 !important;
  color: #333 !important;
}
</style>
