<template>
  <v-app class="grey lighten-5">
    <v-container fluid class="pa-0 fill-height align-start">
      <v-row no-gutters class="fill-height">
        <!-- Left Side: Form -->
        <v-col cols="12" lg="5" xl="4" class="white border-right scroll-y fill-height">
          <div class="pa-6 pa-md-10">
            <div class="d-flex align-center mb-8">
              <v-btn icon to="/" class="mr-4 grey lighten-4">
                <v-icon color="primary">mdi-arrow-left</v-icon>
              </v-btn>
              <div>
                <h1 class="text-h5 font-weight-black primary--text">Yezhu Resume</h1>
                <p class="text-caption grey--text mb-0">The Rise of modern career design</p>
              </div>
            </div>

            <div class="mb-6">
              <div class="text-caption grey--text mb-2 px-1">Choose Template Style</div>
              <v-btn-toggle v-model="selectedTemplate" mandatory borderless dense background-color="grey lighten-4" color="primary" class="rounded-pill overflow-hidden w-full">
                <v-btn value="professional" small rounded text class="text-none flex-grow-1">Professional</v-btn>
                <v-btn value="modern" small rounded text class="text-none flex-grow-1">Modern</v-btn>
                <v-btn value="classic" small rounded text class="text-none flex-grow-1">Classic</v-btn>
              </v-btn-toggle>
            </div>

            <v-expansion-panels flat class="modern-panels">
              <!-- Personal Information -->
              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="primary">mdi-account-outline</v-icon>
                    Personal Information
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.personal.name" label="Full Name" outlined rounded dense />
                  <v-row dense>
                    <v-col cols="6"><v-text-field v-model="form.personal.phone" label="Phone" outlined rounded dense /></v-col>
                    <v-col cols="6"><v-text-field v-model="form.personal.email" label="Email" outlined rounded dense /></v-col>
                  </v-row>
                  <v-text-field v-model="form.personal.linkedin" label="LinkedIn URL" outlined rounded dense />
                  <v-text-field v-model="form.personal.github" label="GitHub URL" outlined rounded dense />
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Summary -->
              <v-expansion-panel v-if="form.visibleSections.summary" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="secondary">mdi-text-account</v-icon>
                    Professional Summary
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small @click.stop="form.visibleSections.summary = false" color="grey lighten-1">
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea v-model="form.summary" label="Summary" outlined rounded dense rows="4" />
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Technical Skills -->
              <v-expansion-panel v-if="form.visibleSections.skills" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="success">mdi-hammer-wrench</v-icon>
                    {{ form.labels.skills }}
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small @click.stop="form.visibleSections.skills = false" color="grey lighten-1">
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.labels.skills" label="Section Header" outlined rounded dense class="mb-4" />
                  <v-row v-for="(skill, index) in form.skills" :key="index" dense>
                    <v-col cols="4"><v-text-field v-model="skill.category" label="Category" outlined rounded dense /></v-col>
                    <v-col cols="7"><v-text-field v-model="skill.items" label="Skills (comma separated)" outlined rounded dense /></v-col>
                    <v-col cols="1" class="d-flex align-center">
                      <v-btn icon small color="error" @click="removeSkill(index)"><v-icon small>mdi-delete</v-icon></v-btn>
                    </v-col>
                  </v-row>
                  <v-btn text color="primary" block @click="addSkill">+ Add Skill Category</v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Experience -->
              <v-expansion-panel v-if="form.visibleSections.experience" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="info">mdi-briefcase-outline</v-icon>
                    {{ form.labels.experience }}
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small @click.stop="form.visibleSections.experience = false" color="grey lighten-1">
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.labels.experience" label="Section Header" outlined rounded dense class="mb-4" />
                  <div v-for="(exp, index) in form.experience" :key="index" class="mb-6 pb-4 border-bottom position-relative">
                    <v-btn icon small color="error" class="position-absolute right-0 mt-n7" @click="removeExperience(index)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    <v-row dense>
                      <v-col cols="8"><v-text-field v-model="exp.company" label="Company" outlined rounded dense /></v-col>
                      <v-col cols="4"><v-text-field v-model="exp.location" label="Location" outlined rounded dense /></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="8"><v-text-field v-model="exp.role" label="Role" outlined rounded dense /></v-col>
                      <v-col cols="4"><v-text-field v-model="exp.dates" label="Dates" outlined rounded dense /></v-col>
                    </v-row>
                    <v-textarea v-model="exp.description" label="Bullet points (one per line)" outlined rounded dense rows="3" />
                  </div>
                  <v-btn text color="primary" block @click="addExperience">+ Add Experience</v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Projects -->
              <v-expansion-panel v-if="form.visibleSections.projects" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="warning">mdi-folder-outline</v-icon>
                    {{ form.labels.projects }}
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small @click.stop="form.visibleSections.projects = false" color="grey lighten-1">
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.labels.projects" label="Section Header" outlined rounded dense class="mb-4" />
                  <div v-for="(proj, index) in form.projects" :key="index" class="mb-6 pb-4 border-bottom position-relative">
                    <v-btn icon small color="error" class="position-absolute right-0 mt-7" @click="removeProject(index)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    <v-row dense>
                      <v-col cols="8"><v-text-field v-model="proj.name" label="Project Name" outlined rounded dense /></v-col>
                      <v-col cols="4"><v-text-field v-model="proj.dates" label="Dates" outlined rounded dense /></v-col>
                    </v-row>
                    <v-text-field v-model="proj.tech" label="Technologies Used" outlined rounded dense />
                    <v-textarea v-model="proj.description" label="Bullet points (one per line)" outlined rounded dense rows="3" />
                  </div>
                  <v-btn text color="primary" block @click="addProject">+ Add Project</v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Education -->
              <v-expansion-panel v-if="form.visibleSections.education" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <div class="d-flex align-center">
                    <v-icon left color="deep-purple">mdi-school-outline</v-icon>
                    {{ form.labels.education }}
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small @click.stop="form.visibleSections.education = false" color="grey lighten-1">
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.labels.education" label="Section Header" outlined rounded dense class="mb-4" />
                  <div v-for="(edu, index) in form.education" :key="index" class="mb-6 pb-4 border-bottom position-relative">
                    <v-btn icon small color="error" class="position-absolute right-0 mt-7" @click="removeEducation(index)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    <v-row dense>
                      <v-col cols="8"><v-text-field v-model="edu.school" label="School" outlined rounded dense /></v-col>
                      <v-col cols="4"><v-text-field v-model="edu.location" label="Location" outlined rounded dense /></v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="8"><v-text-field v-model="edu.degree" label="Degree" outlined rounded dense /></v-col>
                      <v-col cols="4"><v-text-field v-model="edu.dates" label="Dates" outlined rounded dense /></v-col>
                    </v-row>
                  </div>
                  <v-btn text color="primary" block @click="addEducation">+ Add Education</v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Custom Sections -->
              <v-expansion-panel v-for="(section, sIndex) in form.customSections" :key="'custom-'+sIndex" class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4 text-capitalize">
                  <div class="d-flex align-center">
                    <v-icon left color="grey darken-2">mdi-text-box-plus-outline</v-icon>
                    {{ section.title || 'New Section' }}
                  </div>
                  <template v-slot:actions>
                    <v-btn icon small color="error" @click.stop="removeCustomSection(sIndex)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="section.title" label="Section Title" outlined rounded dense />
                  <v-textarea v-model="section.content" label="Content (one bullet per line)" outlined rounded dense rows="4" />
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Section Controls -->
              <div class="d-flex flex-wrap gap-2 mt-4 px-1">
                <v-btn outlined rounded small color="primary" class="text-none mb-2 mr-2" @click="addCustomSection">
                  <v-icon left>mdi-plus</v-icon> Add Custom Section
                </v-btn>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined rounded small color="secondary" class="text-none mb-2" v-bind="attrs" v-on="on">
                      <v-icon left>mdi-eye-outline</v-icon> Section Manager
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item v-for="(v, key) in form.visibleSections" :key="key">
                      <v-list-item-action>
                        <v-switch v-model="form.visibleSections[key]" color="primary" dense />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize">{{ key }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-expansion-panels>

            <div class="mt-10 d-flex flex-column" style="gap: 12px">
              <v-btn block x-large rounded depressed color="black" dark @click="downloadPDF">
                <v-icon left>mdi-file-pdf-box</v-icon> Download PDF
              </v-btn>
              <v-btn block large rounded outlined color="error" @click="resetForm">
                Reset All
              </v-btn>
            </div>
          </div>
        </v-col>

        <!-- Right Side: Preview -->
        <v-col cols="12" lg="7" xl="8" class="grey lighten-4 d-flex align-start preview-scroll py-12">
          <div class="paper-wrapper shadow-2xl">
            <div ref="pdfContent" :class="['resume-paper', selectedTemplate]" style="position: relative; flex-shrink: 0;">
              <!-- Header Section -->
              <div v-if="selectedTemplate === 'professional'" class="resume-header text-center professional-header">
                <h1 class="resume-name">{{ form.personal.name || 'Your Name' }}</h1>
                <div class="resume-contact">
                  {{ form.personal.phone }} | 
                  <a :href="'mailto:' + form.personal.email">{{ form.personal.email }}</a> |
                  <a v-if="form.personal.linkedin" :href="form.personal.linkedin" target="_blank">linkedin.com/in/{{ getUsername(form.personal.linkedin) }}</a> |
                  <a v-if="form.personal.github" :href="form.personal.github" target="_blank">github.com/{{ getUsername(form.personal.github) }}</a>
                </div>
              </div>

              <div v-else-if="selectedTemplate === 'modern'" class="resume-header modern-header">
                <div>
                  <h1 class="resume-name">{{ form.personal.name || 'Your Name' }}</h1>
                  <p class="text-h6 grey--text text--darken-2 mb-0">{{ form.experience[0] ? form.experience[0].role : 'Professional' }}</p>
                </div>
                <div class="resume-contact text-right">
                  <div><v-icon x-small color="grey">mdi-phone</v-icon> {{ form.personal.phone }}</div>
                  <div><v-icon x-small color="grey">mdi-email</v-icon> {{ form.personal.email }}</div>
                  <div v-if="form.personal.linkedin"><v-icon x-small color="grey">mdi-linkedin</v-icon> {{ getUsername(form.personal.linkedin) }}</div>
                  <div v-if="form.personal.github"><v-icon x-small color="grey">mdi-github</v-icon> {{ getUsername(form.personal.github) }}</div>
                </div>
              </div>

              <div v-else class="resume-header classic-header">
                <h1 class="resume-name">{{ form.personal.name || 'Your Name' }}</h1>
                <p class="resume-contact">
                  {{ form.personal.phone }} &bull; {{ form.personal.email }} &bull; 
                  <span v-if="form.personal.linkedin">linkedin.com/in/{{ getUsername(form.personal.linkedin) }}</span>
                </p>
              </div>

              <!-- Summary Section -->
              <div v-if="form.visibleSections.summary && form.summary" class="resume-section">
                <h2 class="resume-section-title">Professional Summary</h2>
                <div class="resume-content">
                  <p>{{ form.summary }}</p>
                </div>
              </div>

              <!-- Technical Skills Section -->
              <div v-if="form.visibleSections.skills && form.skills.length" class="resume-section">
                <h2 class="resume-section-title">{{ form.labels.skills }}</h2>
                <div class="resume-content">
                  <ul class="resume-list no-bullets">
                    <li v-for="(skill, index) in form.skills" :key="index">
                      <strong>{{ skill.category }}:</strong> {{ skill.items }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Projects Section -->
              <div v-if="form.visibleSections.projects && form.projects.length" class="resume-section">
                <h2 class="resume-section-title">{{ form.labels.projects }}</h2>
                <div class="resume-content">
                  <div v-for="(proj, index) in form.projects" :key="index" class="resume-subheading-group">
                    <div class="resume-subheading-header">
                      <strong>{{ proj.name }}</strong>
                      <span>{{ proj.dates }}</span>
                    </div>
                    <div class="resume-subheading-sub">{{ proj.tech }}</div>
                    <ul class="resume-list">
                      <li v-for="(bullet, bIndex) in splitBullets(proj.description)" :key="bIndex">
                        {{ bullet }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Experience Section -->
              <div v-if="form.visibleSections.experience && form.experience.length" class="resume-section">
                <h2 class="resume-section-title">{{ form.labels.experience }}</h2>
                <div class="resume-content">
                  <div v-for="(exp, index) in form.experience" :key="index" class="resume-subheading-group">
                    <div class="resume-subheading-header">
                      <strong>{{ exp.company }}</strong>
                      <span>{{ exp.dates }}</span>
                    </div>
                    <div class="resume-subheading-sub">
                      <em>{{ exp.role }}</em>
                      <em>{{ exp.location }}</em>
                    </div>
                    <ul class="resume-list">
                      <li v-for="(bullet, bIndex) in splitBullets(exp.description)" :key="bIndex">
                        {{ bullet }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Education Section -->
              <div v-if="form.visibleSections.education && form.education.length" class="resume-section">
                <h2 class="resume-section-title">{{ form.labels.education }}</h2>
                <div class="resume-content">
                  <div v-for="(edu, index) in form.education" :key="index" class="resume-subheading-group no-margin">
                    <div class="resume-subheading-header">
                      <strong>{{ edu.school }}</strong>
                      <span>{{ edu.location }}</span>
                    </div>
                    <div class="resume-subheading-sub">
                      <em>{{ edu.degree }}</em>
                      <em>{{ edu.dates }}</em>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Custom Sections -->
              <div v-for="(section, index) in form.customSections" :key="'preview-'+index" class="resume-section">
                <h2 class="resume-section-title">{{ section.title }}</h2>
                <div class="resume-content">
                  <p v-if="!section.content.includes('\n')" class="mb-0">{{ section.content }}</p>
                  <ul v-else class="resume-list">
                    <li v-for="(bullet, bIndex) in splitBullets(section.content)" :key="bIndex">
                      {{ bullet }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "ResumeBuilder",
  data() {
    return {
      selectedTemplate: "professional",
      form: {
        personal: {
          name: "Alex Webb",
          phone: "555-123-4567",
          email: "alex@email.com",
          linkedin: "https://linkedin.com/in/alexwebbx",
          github: "https://github.com/alexwebbx"
        },
        summary: "Passionate AI/ML engineer with a strong background in deep learning, computer vision, and natural language processing. Skilled in Python, TensorFlow, PyTorch, and various ML libraries. Excellent problem-solving, research, and collaboration abilities. Seeking a challenging role to develop cutting-edge AI solutions.",
        skills: [
          { category: "Programming Languages", items: "Python, C++, SQL, MATLAB" },
          { category: "Deep Learning Frameworks", items: "TensorFlow, PyTorch, Keras, Caffe" },
          { category: "Libraries & Tools", items: "NumPy, Pandas, Scikit-learn, OpenCV, NLTK, Git, Docker" }
        ],
        experience: [
          {
            company: "DeepMind",
            location: "London, UK",
            role: "AI Research Intern",
            dates: "June 2022 -- Aug 2022",
            description: "Conducted research on reinforcement learning algorithms for robotics\nImplemented and evaluated deep RL models using PyTorch and RLlib\nPresented findings at weekly research meetings"
          },
          {
            company: "Acme AI Solutions",
            location: "San Francisco, CA",
            role: "Machine Learning Engineer",
            dates: "Jan 2021 -- May 2022",
            description: "Developed and deployed machine learning models for various industries\nOptimized model performance and ensured data quality\nCollaborated with cross-functional teams to deliver AI solutions"
          }
        ],
        projects: [
          {
            name: "Image Captioning System",
            dates: "Jan 2023 -- Present",
            tech: "Python, TensorFlow, OpenCV",
            description: "Developed an end-to-end system for generating descriptive captions for images\nUtilized CNN and LSTM models for image feature extraction and caption generation\nAchieved state-of-the-art performance on the COCO dataset"
          }
        ],
        education: [
          {
            school: "Stanford University",
            location: "Stanford, CA",
            degree: "M.S. in Computer Science, Artificial Intelligence",
            dates: "Aug 2019 -- May 2021"
          },
          {
            school: "University of California, Berkeley",
            location: "Berkeley, CA",
            degree: "B.S. in Electrical Engineering and Computer Science",
            dates: "Aug 2015 -- May 2019"
          }
        ],
        labels: {
          skills: "Technical Skills",
          experience: "Experience",
          projects: "Projects",
          education: "Education"
        },
        visibleSections: {
          summary: true,
          skills: true,
          experience: true,
          projects: true,
          education: true
        },
        customSections: []
      }
    };
  },
  watch: {
    form: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true
    },
    selectedTemplate() {
      this.saveToLocalStorage();
    }
  },
  created() {
    this.loadFromLocalStorage();
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem('resume_form_data', JSON.stringify(this.form));
      localStorage.setItem('resume_selected_template', this.selectedTemplate);
    },
    loadFromLocalStorage() {
      const savedForm = localStorage.getItem('resume_form_data');
      const savedTemplate = localStorage.getItem('resume_selected_template');
      
      if (savedForm) {
        try {
          // Deep merge or Object.assign to preserve reactivity
          const parsed = JSON.parse(savedForm);
          Object.assign(this.form, parsed);
        } catch (e) {
          console.error("Error parsing saved form data", e);
        }
      }
      
      if (savedTemplate) {
        this.selectedTemplate = savedTemplate;
      }
    },
    addSkill() { this.form.skills.push({ category: "", items: "" }); },
    removeSkill(index) { this.form.skills.splice(index, 1); },
    addExperience() { this.form.experience.push({ company: "", location: "", role: "", dates: "", description: "" }); },
    removeExperience(index) { this.form.experience.splice(index, 1); },
    addProject() { this.form.projects.push({ name: "", dates: "", tech: "", description: "" }); },
    removeProject(index) { this.form.projects.splice(index, 1); },
    addEducation() {
      this.form.education.push({ school: "", location: "", degree: "", dates: "" });
    },
    removeEducation(index) {
      this.form.education.splice(index, 1);
    },
    addCustomSection() {
      this.form.customSections.push({ title: "New Section", content: "" });
    },
    removeCustomSection(index) {
      this.form.customSections.splice(index, 1);
    },
    
    splitBullets(text) {
      if (!text) return [];
      return text.split('\n').filter(line => line.trim() !== '');
    },
    getUsername(url) {
      if (!url) return '';
      return url.split('/').pop().replace(/\/$/, "");
    },
    resetForm() {
      if (confirm("Are you sure you want to reset all data?")) {
        localStorage.removeItem('resume_form_data');
        localStorage.removeItem('resume_selected_template');
        location.reload();
      }
    },
    async downloadPDF() {
      console.log("Starting Faithful Multi-Page PDF Download (v4)...");
      const element = this.$refs.pdfContent;
      if (!element) return;

      // 1. Prepare element for capture (Off-screen but original styles)
      const originalStyle = element.style.cssText;
      
      // Force A4 width and HIDDEN overflow to prevent scrollbars in capture
      element.style.width = "794px";
      element.style.height = "auto";
      element.style.position = "fixed";
      element.style.left = "-9999px";
      element.style.top = "0";
      element.style.transform = "none";
      element.style.boxShadow = "none";
      element.style.margin = "0";
      element.style.overflow = "hidden"; // v4.1 fix

      try {
        // Wait for potential layout shifts or image loads
        await new Promise(r => setTimeout(r, 200));

        // 2. Capture the REAL element
        const canvas = await html2canvas(element, {
          scale: 3, // High quality
          useCORS: true,
          logging: false,
          width: 794,
          height: element.scrollHeight,
          windowWidth: 794,
          windowHeight: element.scrollHeight,
          backgroundColor: '#ffffff'
        });

        // 3. Restore original styles immediately
        element.style.cssText = originalStyle;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "p",
          unit: "pt",
          format: "a4",
          compress: true
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Standard A4 margin = 40pt
        const margin = 40;
        const targetWidth = pageWidth - (margin * 2);
        const imgHeightInPdfUnits = (canvas.height * targetWidth) / canvas.width;
        const availableHeightPerPage = pageHeight - (margin * 2);
        
        // v4.1 Final Slicing: Use a larger 15pt buffer to ignore trailing whitespace
        const totalPages = Math.ceil((imgHeightInPdfUnits - 15) / availableHeightPerPage) || 1;
        
        // 4. Multi-page slicing (for-loop approach)
        for (let i = 0; i < totalPages; i++) {
          const position = -(i * availableHeightPerPage);
          pdf.addImage(imgData, "PNG", margin, position, targetWidth, imgHeightInPdfUnits, undefined, 'FAST');
          
          // Apply Header & Footer Masks (prevent content in these areas)
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pageWidth, margin, 'F'); // Top margin mask
          pdf.rect(0, pageHeight - margin, pageWidth, margin, 'F'); // Bottom margin mask
          
          if (i < totalPages - 1) {
            pdf.addPage();
          }
        }

        const fileName = `${this.form.personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
        pdf.save(fileName);
        console.log("Faithful PDF generated successfully.");
      } catch (error) {
        console.error("PDF Export error:", error);
        alert("Export failed. Please check console.");
        element.style.cssText = originalStyle;
      }
    }
  }
};
</script>

<style scoped>
/* Layout Utilities */
.border-right { border-right: 1px solid #e0e0e0 !important; }
.scroll-y { overflow-y: auto; max-height: 100vh; }
.preview-scroll { 
  overflow: auto !important; 
  background-image: radial-gradient(#d1d1d1 1px, transparent 1px); 
  background-size: 20px 20px;
  -webkit-overflow-scrolling: touch;
  display: flex !important;
  justify-content: center;
}
.paper-wrapper {
  flex-shrink: 0;
  margin: auto; /* Centering with safe overflow fallback */
  min-width: 794px;
}
.modern-panels { background: transparent !important; }
.border { border: 1px solid #e0e0e0 !important; }
.rounded-xl { border-radius: 16px !important; }
.border-bottom { border-bottom: 1px solid #eee; }
.w-full { width: 100%; }
.right-0 { right: 0; }
.position-absolute { position: absolute; }
.position-relative { position: relative; }

/* Base Paper Styles */
.resume-paper {
  padding: 40pt; 
  color: #000;
  background: white;
  width: 794px; 
  min-height: 1123px;
  line-height: 1.4;
  box-sizing: border-box;
}

/* 1. Professional (LaTeX) Style */
.professional { font-family: 'Roboto', sans-serif; }
.professional .resume-name { font-size: 28pt; font-weight: 700; margin-bottom: 2pt; text-align: center; }
.professional .resume-contact { text-align: center; font-size: 10pt; margin-bottom: 15pt; }
.professional .resume-section-title { font-size: 12pt; font-weight: 700; text-transform: uppercase; font-variant: small-caps; border-bottom: 1px solid #000; margin-top: 15pt; margin-bottom: 5pt; }

/* 2. Modern Style */
.modern { font-family: 'Inter', sans-serif; color: #2c3e50; }
.modern .resume-name { font-size: 32pt; font-weight: 800; letter-spacing: -1.5px; color: #1976d2; margin-bottom: 4pt; }
.modern .modern-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 4px solid #1976d2; padding-bottom: 12pt; margin-bottom: 24pt; }
.modern .resume-section-title { font-size: 14pt; font-weight: 800; color: #1976d2; margin-bottom: 10pt; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #1976d2; padding-left: 10pt; background: #f8f9fa; padding-top: 5pt; padding-bottom: 5pt; }
.modern .resume-subheading-header strong { font-size: 11pt; color: #1976d2; }

/* 3. Classic Style */
.classic { font-family: 'Georgia', serif; }
.classic .resume-name { font-size: 24pt; font-weight: 700; text-decoration: underline; margin-bottom: 4pt; }
.classic .classic-header { border-bottom: 1px solid #ccc; padding-bottom: 8pt; margin-bottom: 20pt; }
.classic .resume-contact { font-style: italic; font-size: 11pt; }
.classic .resume-section-title { font-size: 13pt; font-weight: 700; border-bottom: 2px solid #333; margin-top: 18pt; margin-bottom: 8pt; }

/* Shared Content Styles */
.resume-header { margin-bottom: 20pt; }
.resume-contact { font-size: 10pt; }
.resume-contact a { color: inherit; text-decoration: none; }
.resume-section { margin-bottom: 12pt; text-align: left; }
.resume-content { font-size: 10pt; }
.resume-subheading-group { margin-bottom: 8pt; }
.resume-subheading-header { display: flex; justify-content: space-between; font-size: 10pt; }
.resume-subheading-sub { display: flex; justify-content: space-between; font-size: 10pt; margin-top: 1pt; font-style: italic; color: #555; }
.resume-list { padding-left: 15pt; margin: 4pt 0; }
.resume-list li { list-style-type: disc; margin-bottom: 2pt; font-size: 10pt; }
.resume-list.no-bullets { padding-left: 0; list-style-type: none; }
.resume-list.no-bullets li { list-style-type: none; padding-left: 0; }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important; }
</style>
