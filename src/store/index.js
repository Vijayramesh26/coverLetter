import Vue from 'vue';
import Vuex from 'vuex';
import { OUTREACH_CONTENT } from '@/constants/templates';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    templates: OUTREACH_CONTENT,
    selectedTemplateName: "Value-First"
  },

  getters: {
    templateNames: (state) => state.templates.map(t => t.name),
    
    // This getter returns a function that processes the text based on form data
    formattedOutput: (state) => (formData) => {
      const template = state.templates.find(t => t.name === state.selectedTemplateName) || state.templates[0];
      
      // 1. Build conditional signature
      const sig = [formData.userName, formData.userEmail, formData.userPhoneNumber]
        .filter(val => val && val.trim() !== "")
        .join("\n");

      // 2. Map of replacements (Includes Auto-Bolding for certain fields)
      const replacements = {
        "{{recruiterName}}": formData.recruiterName || "Hiring Manager",
        "{{company}}": `*${formData.company}*`,
        "{{role}}": `*${formData.role}*`,
        "{{experience}}": `*${formData.experience}*`,
        "{{location}}": formData.location,
        "{{signature}}": sig
      };

      let body = template.body;
      let subject = template.subject
        .replace(/{{role}}/g, formData.role)
        .replace(/{{company}}/g, formData.company)
        .replace(/{{userName}}/g, formData.userName);

      // Process replacements
      Object.keys(replacements).forEach(key => {
        body = body.split(key).join(replacements[key]);
      });

      return { subject, body };
    }
  },

  mutations: {
    SET_TEMPLATE_NAME(state, name) {
      state.selectedTemplateName = name;
    }
  }
});