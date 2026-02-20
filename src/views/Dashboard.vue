<template>
  <v-container fluid class="grey lighten-5 py-8 px-4 px-md-12 min-h-screen">
    <!-- Header Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="d-flex align-center flex-wrap gap-4">
          <div>
            <h1 class="text-h3 font-weight-black primary--text letter-spacing-tight mb-2">
              Hello, {{ userName }} <span class="wave">👋</span>
            </h1>
            <p class="text-h6 grey--text text--darken-1 font-weight-medium">
              Ready to take the next big step in your career?
            </p>
          </div>
          <v-spacer class="hidden-xs-only" />
          <div class="d-flex align-center bg-white pa-2 rounded-xl border shadow-sm">
            <v-chip color="primary lighten-5" class="primary--text font-weight-bold" pill>
              <v-icon left small>mdi-star</v-icon>
              Pro Member
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Main Features Grid -->
    <v-row class="mb-12">
      <v-col cols="12" md="4" class="tour-dash-step-1">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 6 : 1"
            class="fill-height rounded-xl transition-swing d-flex flex-column border overflow-hidden"
            to="/resume"
          >
            <div class="card-gradient-blue pa-8 text-center white--text">
              <v-icon size="64" color="white" class="mb-4">mdi-account-details</v-icon>
              <h2 class="text-h5 font-weight-bold">Resume Builder</h2>
            </div>
            <v-card-text class="pa-6 flex-grow-1">
              <p class="text-body-1 grey--text text--darken-2">
                Create a professional, high-impact resume with our modern templates and live preview.
              </p>
              <div class="d-flex align-center primary--text font-weight-bold">
                Build Now <v-icon right color="primary">mdi-arrow-right</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" md="4" class="tour-dash-step-2">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 6 : 1"
            class="fill-height rounded-xl transition-swing d-flex flex-column border overflow-hidden"
            to="/coverletter"
          >
            <div class="card-gradient-purple pa-8 text-center white--text">
              <v-icon size="64" color="white" class="mb-4">mdi-file-document-edit</v-icon>
              <h2 class="text-h5 font-weight-bold">Cover Letter</h2>
            </div>
            <v-card-text class="pa-6 flex-grow-1">
              <p class="text-body-1 grey--text text--darken-2">
                Draft tailored cover letters that grab attention using our AI-assisted smart content.
              </p>
              <div class="d-flex align-center secondary--text font-weight-bold">
                Get Started <v-icon right color="secondary">mdi-arrow-right</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" md="4" class="tour-dash-step-3">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 6 : 1"
            class="fill-height rounded-xl transition-swing d-flex flex-column border overflow-hidden"
            to="/recruiter"
          >
            <div class="card-gradient-orange pa-8 text-center white--text">
              <v-icon size="64" color="white" class="mb-4">mdi-message-text-clock</v-icon>
              <h2 class="text-h5 font-weight-bold">Recruiter Outreach</h2>
            </div>
            <v-card-text class="pa-6 flex-grow-1">
              <p class="text-body-1 grey--text text--darken-2">
                Connect with recruiters instantly via Gmail, WhatsApp, or LinkedIn with perfect templates.
              </p>
              <div class="d-flex align-center orange--text text--darken-3 font-weight-bold">
                Connect Now <v-icon right color="orange darken-3">mdi-arrow-right</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Content & Insights Section -->
    <v-row>
      <v-col cols="12" lg="8">
        <h3 class="text-h5 font-weight-bold mb-6 d-flex align-center">
          <v-icon left color="primary">mdi-lightning-bolt</v-icon>
          Recent Activity
        </h3>
        <v-card flat class="rounded-xl border overflow-hidden">
          <v-list three-line class="pa-0">
            <v-list-item v-for="(item, i) in activities" :key="i" :class="{'border-bottom': i < activities.length - 1}">
              <v-list-item-avatar color="grey lighten-4" rounded>
                <v-icon color="primary">{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div class="text-caption grey--text">{{ item.time }}</div>
                <v-btn icon small><v-icon x-small>mdi-dots-vertical</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-btn block text color="primary" class="py-6 text-none font-weight-bold">
            View All Activity
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <h3 class="text-h5 font-weight-bold mb-6 d-flex align-center">
          <v-icon left color="success">mdi-chart-pie</v-icon>
          Career Insights
        </h3>
        <!-- <v-card flat color="white" class="rounded-xl border pa-6 mb-6">
          <div class="text-center mb-4">
            <v-progress-circular
              :rotate="-90"
              :size="120"
              :width="12"
              :value="75"
              color="primary"
            >
              <div class="text-h5 font-weight-black">75%</div>
            </v-progress-circular>
            <div class="text-caption grey--text mt-4 font-weight-bold uppercase">Profile Strength</div>
          </div>
          <v-divider class="my-4" />
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-body-2 grey--text">Total Documents</span>
            <span class="font-weight-bold">12</span>
          </div>
          <div class="d-flex justify-space-between align-center">
            <span class="text-body-2 grey--text">Outreach Sent</span>
            <span class="font-weight-bold text-success">48</span>
          </div>
        </v-card> -->

        <v-card flat color="primary" dark class="rounded-xl pa-6 text-center">
          <h4 class="text-h6 font-weight-bold mb-2">Pro Career Tip</h4>
          <p class="text-body-2 mb-4 opacity-90">
            "Tailoring your resume for each job description increases your callback rate by up to 50%."
          </p>
          <v-btn small rounded color="white" light class="primary--text text-none font-weight-bold px-6">
            Read More
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tour Component -->
    <v-tour name="dashboardTour" :steps="tourSteps"></v-tour>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      userName: "Vijay",
      activities: [
        { icon: 'mdi-file-pdf-box', title: 'Resume Exported', subtitle: 'Modern Template - SDE III Role', time: '2 hours ago' },
        { icon: 'mdi-email-fast-outline', title: 'Recruiter Outreach', subtitle: 'Sent to Comcast Hiring Manager', time: '5 hours ago' },
        { icon: 'mdi-file-document-outline', title: 'Cover Letter Created', subtitle: 'Targeted for Google', time: 'Yesterday' },
        { icon: 'mdi-account-edit-outline', title: 'Profile Updated', subtitle: 'Added 3 new technical skills', time: '2 days ago' }
      ],
      tourSteps: [
        {
          target: '.tour-dash-step-1',
          header: { title: 'Resume Builder' },
          content: 'Build and customize your professional resume with real-time A4 preview.',
          params: { placement: 'bottom' }
        },
        {
          target: '.tour-dash-step-2',
          header: { title: 'Cover Letter' },
          content: 'Generate smart, tailored cover letters in seconds using our AI tool.',
          params: { placement: 'bottom' }
        },
        {
          target: '.tour-dash-step-3',
          header: { title: 'Recruiter Outreach' },
          content: 'Connect with hiring managers directly via multiple channels.',
          params: { placement: 'bottom' }
        }
      ]
    };
  },
  mounted() {
    // Load name from localstorage if available
    const savedForm = localStorage.getItem('resume_form_data');
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        if (parsed.personal && parsed.personal.name) {
          this.userName = parsed.personal.name.split(' ')[0];
        }
      } catch (e) { console.error(e); }
    }

    // Auto start tour
    if (!localStorage.getItem('tour_completed_dashboard')) {
      setTimeout(() => {
        this.$tours['dashboardTour'].start();
        localStorage.setItem('tour_completed_dashboard', 'true');
      }, 1500);
    }

    this.$root.$on('start-tour', () => {
      if (this.$route.path === '/' || this.$route.path === '/dashboard') {
        this.$tours['dashboardTour'].start();
      }
    });
  }
};
</script>

<style scoped>
.min-h-screen { min-height: calc(100vh - 64px); }
.letter-spacing-tight { letter-spacing: -1.5px; }
.shadow-sm { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important; }
.border { border: 1px solid #e5e7eb !important; }
.rounded-xl { border-radius: 20px !important; }
.transition-swing { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1); }
.opacity-90 { opacity: 0.9; }
.wave {
  display: inline-block;
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
}
.border-bottom { border-bottom: 1px solid #f0f0f0; }

@keyframes wave {
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(14.0deg) }
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}

.card-gradient-blue {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}
.card-gradient-purple {
  background: linear-gradient(135deg, #581c87 0%, #a855f7 100%);
}
.card-gradient-orange {
  background: linear-gradient(135deg, #7c2d12 0%, #f97316 100%);
}
.gap-4 { gap: 16px; }
</style>
