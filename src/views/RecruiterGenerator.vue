<template>
  <v-container fluid class="grey lighten-5 fill-height align-start pa-0 pa-sm-4">
    <v-row justify="center" no-gutters>
      <v-col cols="12" lg="10" xl="8">
        
        <div class="px-4 py-6 text-center">
          <h1 class="text-h4 font-weight-black primary--text mb-2">Connect+</h1>
          <p class="text-subtitle-1 grey--text text--darken-1">Professional Recruiter Outreach, Simplified.</p>
        </div>

        <v-row>
          <v-col cols="12" md="5">
            <v-card flat rounded="xl" class="pa-6 mb-4 shadow-sm border">
              <div class="d-flex align-center mb-6">
                <v-icon color="primary" class="mr-3">mdi-file-edit-outline</v-icon>
                <span class="text-h6 font-weight-bold">Configure</span>
              </div>

              <v-select
                v-model="selectedTemplate"
                :items="templateList"
                label="Message Style"
                prepend-inner-icon="mdi-format-list-bulleted"
                outlined
                rounded
                color="primary"
                class="mb-2"
              />

              <p class="text-overline font-weight-bold mb-2 grey--text">Recruiter Details</p>
              <v-text-field v-model="f.recruiterName" label="Name" placeholder="Arun Kumar" dense outlined rounded />
              <v-text-field v-model="f.recruiterEmail" label="Email" placeholder="example@company.com" dense outlined rounded />
              
              <v-row dense>
                <v-col cols="6">
                  <v-text-field v-model="f.recruiterWhatsapp" label="WhatsApp" dense outlined rounded />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="f.linkedinUrl" label="LinkedIn Profile" dense outlined rounded />
                </v-col>
              </v-row>

              <p class="text-overline font-weight-bold mb-2 mt-4 grey--text">Job Context</p>
              <v-text-field v-model="f.company" label="Company" placeholder="Comcast" dense outlined rounded />
              <v-text-field v-model="f.role" label="Role" placeholder="Golang Developer" dense outlined rounded />
              
              <v-row dense>
                <v-col cols="6">
                  <v-text-field v-model="f.experience" label="Exp (Years)" dense outlined rounded />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="f.location" label="Location" dense outlined rounded />
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="7">
            <v-card flat rounded="xl" class="pa-6 border fill-height d-flex flex-column" color="white">
              <div class="d-flex align-center justify-space-between mb-4">
                <div class="d-flex align-center">
                  <v-icon color="success" class="mr-3">mdi-eye-outline</v-icon>
                  <span class="text-h6 font-weight-bold">Live Preview</span>
                </div>
                <v-chip small color="success lighten-5" text-color="success" class="font-weight-bold">
                  {{ selectedTemplate }} Mode
                </v-chip>
              </div>

              <div class="grey lighten-4 pa-4 rounded-lg mb-4">
                <div class="text-caption grey--text font-weight-bold mb-1">EMAIL SUBJECT</div>
                <div class="text-body-2 font-weight-medium">{{ emailSubject }}</div>
              </div>

              <v-textarea
                v-model="message"
                readonly
                flat
                solo
                background-color="transparent"
                auto-grow
                rows="10"
                class="message-preview-text"
              />

              <v-spacer></v-spacer>

              <div class="mt-6">
                <p class="text-caption grey--text text-center mb-4">SEND VIA</p>
                <v-row dense>
                  <v-col cols="6" sm="3">
                    <v-btn block large rounded depressed color="red lighten-5" class="red--text text-none" @click="openGmail">
                      <v-icon left>mdi-gmail</v-icon> Gmail
                    </v-btn>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-btn block large rounded depressed color="green lighten-5" class="green--text text-none" @click="openWhatsApp">
                      <v-icon left>mdi-whatsapp</v-icon> WhatsApp
                    </v-btn>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-btn block large rounded depressed color="blue lighten-5" class="blue--text text-none" @click="openLinkedIn">
                      <v-icon left>mdi-linkedin</v-icon> LinkedIn
                    </v-btn>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-btn block large rounded depressed color="primary" class="text-none" @click="copyAll">
                      <v-icon left>mdi-content-copy</v-icon> Copy
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" rounded="pill" bottom center>
      <v-icon left color="success">mdi-check-circle</v-icon>
      Copied to clipboard
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.border {
  border: 1px solid #e0e0e0 !important;
}
.shadow-sm {
  box-shadow: 0 4px 20px rgba(0,0,0,0.03) !important;
}
.message-preview-text >>> textarea {
  font-family: 'Inter', 'Roboto', sans-serif !important;
  line-height: 1.6 !important;
  color: #444 !important;
}
</style>

<script>
export default {
  data() {
    return {
      snackbar: false,
      selectedTemplate: "Formal",
      f: {
        recruiterName: "VIJAY RAMESH",
        recruiterEmail: "",
        recruiterWhatsapp: "",
        linkedinUrl: "",
        company: "Comcast",
        role: "Golang Developer",
        experience: "3",
        location: "Chennai"
      },
      adminTemplates: []
    };
  },

  mounted() {
    this.adminTemplates = JSON.parse(
      localStorage.getItem("custom_templates") || "[]"
    );

    if (this.$vuetify.breakpoint.smAndDown) {
      this.selectedTemplate = "Short";
    }
  },

  computed: {
    templateList() {
      return ["Formal", "Short", "Referral", ...this.adminTemplates.map(t => t.name)];
    },

    emailSubject() {
      return `${this.f.role} Opportunity – ${this.f.company}`;
    },

    message() {
      const f = this.f;
      const custom = this.adminTemplates.find(t => t.name === this.selectedTemplate);

      if (custom) {
        return custom.body
          .replace(/{{recruiterName}}/g, f.recruiterName)
          .replace(/{{company}}/g, f.company)
          .replace(/{{role}}/g, f.role)
          .replace(/{{experience}}/g, f.experience)
          .replace(/{{location}}/g, f.location);
      }

      if (this.selectedTemplate === "Short") {
        return `Hi ${f.recruiterName}, I’m a ${f.role} with ${f.experience}+ years experience. Please let me know if there are openings at ${f.company}.`;
      }

      if (this.selectedTemplate === "Referral") {
        return `Hi ${f.recruiterName}, I’d really appreciate a referral opportunity at ${f.company} for a ${f.role} position.`;
      }

      return `Hi ${f.recruiterName},

I’m Vijay R, a ${f.role} with ${f.experience} years of experience, based in ${f.location}.
Please let me know if there are suitable openings at ${f.company}.`;
    }
  },

  methods: {
    openGmail() {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.f.recruiterEmail)}&su=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.message)}`,
        "_blank"
      );
    },

    openWhatsApp() {
      window.open(
        `https://wa.me/${this.f.recruiterWhatsapp}?text=${encodeURIComponent(this.message)}`,
        "_blank"
      );
    },

    openLinkedIn() {
      navigator.clipboard.writeText(this.message);
      window.open(this.f.linkedinUrl || "https://www.linkedin.com/messaging/", "_blank");
      this.snackbar = true;
    },

    copyAll() {
      navigator.clipboard.writeText(`Subject: ${this.emailSubject}\n\n${this.message}`);
      this.snackbar = true;
    }
  }
};
</script>
