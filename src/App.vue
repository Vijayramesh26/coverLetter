<template>
  <v-app class="app-bg">
    <v-app-bar app flat color="white" class="px-md-12 border-bottom">
      <div class="d-flex align-center">
        <v-avatar color="primary lighten-5" size="38" class="mr-3" to="/">
          <ZhaLogo class="yezhu-logo primary--text" />
        </v-avatar>
        <div class="d-flex flex-column justify-center ml-1" style="line-height: 1.1">
          <div class="font-weight-black primary--text letter-spacing-tight text-h6">Yezhu</div>
          <div class="text-caption grey--text font-weight-medium mt-n1 hidden-sm-and-down">The Rise</div>
        </div>
      </div>

      <v-spacer />
 
      <v-tabs color="primary" class="hidden-sm-and-down ml-5" optional hide-slider>
        <v-tab to="/" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-message-text-outline</v-icon> Generator
        </v-tab>
        <v-tab to="/coverletter" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-file-document-outline</v-icon> Cover Letter
        </v-tab>
        <v-tab to="/resume" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-account-details-outline</v-icon> Resume
        </v-tab>
        <v-tab to="/admin/templates" class="text-none font-weight-bold px-6 rounded-pill">
          <v-icon left small>mdi-cog-outline</v-icon> Admin
        </v-tab>
      </v-tabs>

      <v-spacer />

      <div class="d-flex align-center flex-shrink-0">
        <v-chip v-if="$vuetify.breakpoint.lgAndUp" pill color="grey lighten-4" class="pr-4">
          <v-avatar left color="primary" size="24" class="white--text text-caption">VR</v-avatar>
          <span class="text-caption font-weight-bold grey--text text--darken-3">Vijay Ramesh</span>
        </v-chip>
        
        <v-avatar v-else-if="$vuetify.breakpoint.mdOnly" color="primary" size="32" class="white--text text-caption">
          VR
        </v-avatar>

        <v-btn icon class="hidden-md-and-up ml-2" @click="mobileMenu = !mobileMenu">
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

    <v-navigation-drawer v-model="mobileMenu" fixed temporary right width="280">
      <v-list nav class="pa-4">
        <v-list-item to="/coverletter">
          <v-list-item-title>Cover Letter</v-list-item-title>
        </v-list-item>
        <v-list-item to="/resume">
          <v-list-item-title>Resume</v-list-item-title>
        </v-list-item>
        <v-list-item to="/recruiter">
          <v-list-item-title>Generator</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/templates">
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ZhaLogo from "@/components/ZhaLogo.vue";

export default {
  components: {
    ZhaLogo
  },
  data: () => ({
    mobileMenu: false
  })
};
</script>

<style>
/* Clean, Modern Typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.v-application {
  font-family: 'Inter', sans-serif !important;
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

</style>