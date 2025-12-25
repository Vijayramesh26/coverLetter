<template>
  <v-app class="app-bg">
    <v-app-bar app flat color="white" class="px-md-12 border-bottom">
      <div class="d-flex align-center">
        <v-avatar color="primary lighten-5" size="38" class="mr-3" to="/">
          <v-icon color="primary" small >mdi-lightning-bolt</v-icon>
        </v-avatar>
        <v-toolbar-title class="font-weight-black primary--text letter-spacing-tight">
          HireStream
        </v-toolbar-title>
      </div>

      <v-spacer />

      <v-tabs color="primary" class="hidden-sm-and-down" optional hide-slider>
        <v-tab to="/" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-message-text-outline</v-icon> Generator
        </v-tab>
        <v-tab to="/coverletter" class="text-none font-weight-bold px-6 mr-2 rounded-pill">
          <v-icon left small>mdi-file-document-outline</v-icon> Cover Letter
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
export default {
  data: () => ({
    mobileMenu: false
  })
};
</script>

<style>
/* Clean, Modern Typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.v-application {
  font-family: 'Inter', sans-serif !important;
}

.app-bg {
  background-color: #f3f4f6 !important; /* Soft grey background makes white paper pop */
}

.border-bottom {
  border-bottom: 1px solid #e5e7eb !important;
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