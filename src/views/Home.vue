<template>
  <v-app class="grey lighten-5">
    <v-container fluid class="pa-0 fill-height align-start">
      <v-row no-gutters class="fill-height">
        <v-col
          cols="12"
          lg="5"
          xl="4"
          class="white border-right scroll-y fill-height"
        >
          <div class="pa-6 pa-md-10">
            <div class="d-flex align-center mb-8">
              <v-btn icon to="/" class="mr-4 grey lighten-4">
                <v-icon color="primary">mdi-arrow-left</v-icon>
              </v-btn>
              <div>
                <h1 class="text-h5 font-weight-black primary--text">Builder</h1>
                <p class="text-caption grey--text mb-0">
                  Craft your professional narrative
                </p>
              </div>
            </div>

            <v-expansion-panels flat class="modern-panels">
              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="primary"
                    >mdi-account-circle-outline</v-icon
                  >
                  Personal Identity
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row dense>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="form.personal.name"
                        label="Full Name"
                        outlined
                        rounded
                        dense
                    /></v-col>
                    <v-col cols="6"
                      ><v-text-field
                        v-model="form.personal.email"
                        label="Email"
                        outlined
                        rounded
                        dense
                    /></v-col>
                    <v-col cols="6"
                      ><v-text-field
                        v-model="form.personal.phone"
                        label="Phone"
                        outlined
                        rounded
                        dense
                    /></v-col>
                    <v-col cols="12"
                      ><v-text-field
                        v-model="form.personal.location"
                        label="Location"
                        outlined
                        rounded
                        dense
                    /></v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="secondary">mdi-briefcase-outline</v-icon>
                  Target Opportunity
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                    v-model="form.company.jobTitle"
                    label="Job Title"
                    outlined
                    rounded
                    dense
                    color="secondary"
                  />
                  <v-row dense>
                    <v-col cols="6"
                      ><v-text-field
                        v-model="form.company.name"
                        label="Company"
                        outlined
                        rounded
                        dense
                    /></v-col>
                    <v-col cols="6"
                      ><v-text-field
                        v-model="form.company.manager"
                        label="Hiring Manager"
                        outlined
                        rounded
                        dense
                    /></v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="success">mdi-sparkles-outline</v-icon>
                  Smart Add-ons
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="grey lighten-5 pa-4 rounded-lg">
                    <v-switch
                      v-model="form.optional.includeSalary"
                      label="Salary Requirements"
                      dense
                      inset
                      class="mt-0"
                    />
                    <v-text-field
                      v-if="form.optional.includeSalary"
                      v-model="form.optional.salary"
                      placeholder="Expected CTC"
                      outlined
                      rounded
                      dense
                    />

                    <v-divider class="my-3" />

                    <v-switch
                      v-model="form.optional.includeRelocation"
                      label="Relocation Status"
                      dense
                      inset
                    />
                    <v-select
                      v-if="form.optional.includeRelocation"
                      v-model="form.optional.relocationText"
                      :items="[
                        'Ready to Relocate',
                        'Open to Hybrid',
                        'Prefer Local',
                      ]"
                      outlined
                      rounded
                      dense
                    />
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel> -->

              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="secondary">mdi-briefcase-outline</v-icon>
                  Target Opportunity
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.company.jobTitle" label="Job Title" outlined rounded dense color="secondary" />
                  <v-row dense>
                    <v-col cols="12"><v-text-field v-model="form.company.manager" label="Hiring Manager" outlined rounded dense /></v-col>
                    <v-col cols="6"><v-text-field v-model="form.company.name" label="Company" outlined rounded dense /></v-col>
                    <v-col cols="6"><v-text-field v-model="form.company.location" label="Location" outlined rounded dense /></v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="blue-grey">mdi-card-account-details-outline</v-icon>
                  Professional Context
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="form.professional.role" label="Current/Last Role" outlined rounded dense />
                  <v-text-field v-model="form.professional.experience" label="Years of Exp" outlined rounded dense type="number" />
                  <v-textarea v-model="form.professional.skills" label="Core Skills (comma separated)" outlined rounded dense rows="2" />
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="success">mdi-sparkles-outline</v-icon>
                  Smart Add-ons
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="grey lighten-5 pa-4 rounded-lg">
                    <v-switch v-model="form.optional.includeSalary" label="Salary Requirements" dense inset class="mt-0" @change="generateSmartContent" />
                    <v-text-field v-if="form.optional.includeSalary" v-model="form.optional.salary" placeholder="e.g. ₹12,00,000 PA" outlined rounded dense @input="generateSmartContent" />
                    
                    <v-divider class="my-3" />
                    
                    <v-switch v-model="form.optional.includeGap" label="Explain Career Gap" dense inset />
                    <v-textarea v-if="form.optional.includeGap" v-model="form.optional.gap" placeholder="Reason for gap..." outlined rounded dense rows="2" />
                    
                    <v-divider class="my-3" />

                    <v-switch v-model="form.optional.includeAvailability" label="Show Availability" inset dense  />
                    <v-select v-if="form.optional.includeAvailability" v-model="form.optional.availability" label="Notice Period" :items="['Immediate', '15 Days', '30 Days', 'Notice Period']" outlined rounded dense />
                 

                    <v-divider class="my-3" />

                    <v-switch
                      v-model="form.optional.includeRelocation"
                      label="Relocation Status"
                      dense
                      inset
                    />
                    <v-select
                      v-if="form.optional.includeRelocation"
                      v-model="form.optional.relocationText"
                      :items="[
                        'Ready to Relocate',
                        'Open to Hybrid',
                        'Prefer Local',
                      ]"
                      outlined
                      rounded
                      dense
                    />

                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-4 border rounded-xl">
                <v-expansion-panel-header class="font-weight-bold py-4">
                  <v-icon left color="amber darken-3">mdi-pen</v-icon>
                  E-Signature
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="signature-box border rounded-lg overflow-hidden">
                    <canvas
                      ref="signatureCanvas"
                      @mousedown="startDrawing"
                      @mousemove="draw"
                      @mouseup="stopDrawing"
                      class="sig-canvas"
                    ></canvas>
                    <div
                      class="d-flex justify-space-between pa-2 grey lighten-4"
                    >
                      <v-btn x-small text color="error" @click="clearCanvas"
                        >Clear</v-btn
                      >
                      <v-btn
                        x-small
                        depressed
                        color="primary"
                        @click="saveCanvas"
                        >Apply</v-btn
                      >
                    </div>
                  </div>
                    <v-col cols="12">
    <p class="text-caption grey--text">Or upload a scan:</p>
    <v-file-input
      label="Upload Image"
      dense
      outlined
      prepend-icon="mdi-camera"
      @change="handleSignatureUpload"
    />
  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <div class="mt-10 d-flex flex-column" style="gap: 12px">
              <v-btn
                block
                x-large
                rounded
                depressed
                color="primary"
                @click="generateSmartContent"
              >
                <v-icon left>mdi-auto-fix</v-icon> AI Regenerate Text
              </v-btn>

              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    block
                    large
                    rounded
                    outlined
                    color="error"
                    @click="resetForm"
                    >Reset All</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-menu offset-y transition="slide-y-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        block
                        large
                        rounded
                        depressed
                        color="black"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Export <v-icon right>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list rounded class="pa-2">
                      <v-list-item @click="downloadPDF">
                        <v-list-item-icon
                          ><v-icon color="red"
                            >mdi-file-pdf-box</v-icon
                          ></v-list-item-icon
                        >
                        <v-list-item-title>PDF Document</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="downloadDOCX">
                        <v-list-item-icon
                          ><v-icon color="blue"
                            >mdi-file-word</v-icon
                          ></v-list-item-icon
                        >
                        <v-list-item-title>Word Document</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          lg="7"
          xl="8"
          class="grey lighten-4 d-flex justify-center align-center preview-scroll"
        >
          <div class="preview-stage pa-4 pa-md-12">
            <div
              class="template-selector px-4 py-2 rounded-pill white elevation-2 border"
            >
              <v-btn-toggle
                v-model="selectedTemplate"
                mandatory
                borderless
                dense
                background-color="transparent"
                color="primary"
              >
                <v-btn value="Classic" small rounded text class="text-none"
                  >Classic</v-btn
                >
                <v-btn value="Modern" small rounded text class="text-none"
                  >Modern</v-btn
                >
              </v-btn-toggle>
            </div>

            <div class="paper-wrapper shadow-2xl">
              <div
                ref="pdfContent"
                :class="['cover-letter-paper', templateClass]"
              >
                <div class="header-section">
                  <div class="sender-info">
                    <h2 class="letter-name">{{ form.personal.name }}</h2>
                    <p class="letter-meta">
                      {{ form.personal.location }} • {{ form.personal.email }}
                    </p>
                  </div>
                </div>

                <div class="letter-body">
                  <div class="date-line">{{ today }}</div>
                  <div class="recipient-info mb-6">
                    <strong>{{
                      form.company.manager || "Hiring Manager"
                    }}</strong
                    ><br />
                    {{ form.company.name }}<br />{{ form.company.location }}
                  </div>

                  <div class="subject-line mb-8 font-weight-bold">
                    RE: {{ form.company.jobTitle }}
                  </div>

                  <p contenteditable="true">{{ paragraphs.para1 }}</p>
                  <p contenteditable="true">{{ paragraphs.para2 }}</p>
 <p v-if="paragraphs.para3" contenteditable="true">
                  {{ paragraphs.para3 }}
                </p>
                  <div class="extra-sections mt-4">
                    <p v-if="paragraphs.relocation" class="accent-line">
                      {{ paragraphs.relocation }}
                    </p>
                    <p v-if="form.optional.includeSalary" class="accent-line">
                      Expected Compensation: {{ form.optional.salary }}
                    </p>
                      <p v-if="form.optional.includeAvailability" class="accent-line">
                      Availability: {{ form.optional.availability }}
                    </p>
                  </div>
                <p contenteditable="true" >
                  {{ paragraphs.closing }}
                </p>

                  <p class="mt-8">Sincerely,</p>

                  <div class="signature-display my-4">
                    <img
                      v-if="paragraphs.signatureImage"
                      :src="paragraphs.signatureImage"
                      class="sig-img"
                    />
                    <div v-else class="sig-placeholder"></div>
                    <div
                      class="font-weight-bold border-top pt-2 d-block"
                    >
                      {{ form.personal.name }}
                    </div>
                  </div>
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
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      isDrawing: false,
      ctx: null,
      activeTab: 0,
      showPreview: true,
      templates: ["Classic", "Modern"],
      selectedTemplate: "Classic",

      form: {
        personal: {
          name: "VIJAY RAMESH",
          email: "vijay26301@gmail.com",
          phone: "",
          location: "Chennai, TN 600013",
        },
        company: {
          manager: "",
          name: "",
          location: "",
          jobTitle: "",
        },
        professional: {
          role: "Associate Software Engineer",
          experience: "3",
          skills: "Vue.js, Golang, REST APIs",
          summary: "",
        },
        optional: {
          includeGap: false,
          gap: "",
          includeRelocation: false,
          relocationText: "",
          includeSalary: false,
          salary: "",
          includeAvailability: false,
          availability: "Immediate",
        },
      },

      paragraphs: {
        name: "VIJAY RAMESH",
        personalInfo: "Chennai, TN 600013 | vijay26301@gmail.com | ",
        companyInfo: "",
        para1: "",
        para2: "",
        para3: "",
        relocation: "",
        salary: "",
        availability: "",
        closing: "",
        signature: "VIJAY RAMESH",
        signatureImage: null,
      },
    };
  },

  computed: {
    today() {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    templateClass() {
      return this.selectedTemplate === "Modern"
        ? "cover modern"
        : "cover classic";
    },
  },

  watch: {
    form: {
      handler(v) {
        localStorage.setItem("coverLetterForm", JSON.stringify(v));
        // 2. IMMEDIATELY re-run the text generation logic
        this.generateSmartContent();
      },
      deep: true,
    },
    paragraphs: {
      handler(v) {
        localStorage.setItem("coverLetterContent", JSON.stringify(v));
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    const savedForm = localStorage.getItem("coverLetterForm");
    const savedContent = localStorage.getItem("coverLetterContent");
    if (savedForm) this.form = JSON.parse(savedForm);
    if (savedContent) this.paragraphs = JSON.parse(savedContent);
    this.generateSmartContent();
  },

  methods: {
    generateSmartContent() {
      const f = this.form;

      this.paragraphs.para1 =
        `I am writing to express my interest in the ${
          f.company.jobTitle || "position"
        } ` +
        `at ${
          f.company.name || "your esteemed company"
        }. I believe my background as a ${
          f.professional.role || "professional"
        }, ` +
        `combined with my experience of ${
          f.professional.experience || "X"
        } years and skills in ${f.professional.skills || "various areas"}, ` +
        `positions me as an ideal candidate. ${
          f.professional.summary ? f.professional.summary : ""
        }`;

      this.paragraphs.para2 =
        `Throughout my career, I have approached challenges with an investigative and analytical mindset. ` +
        `I utilize my observational skills and problem-solving abilities to analyze complex issues and deliver innovative solutions. ` +
        `I value effective communication, collaboration, and empowering others to achieve shared team success.`;

      this.paragraphs.para3 =
        f.optional.includeGap && f.optional.gap
          ? `While I experienced a brief gap in my employment due to ${f.optional.gap}, ` +
            `I remained engaged with technology through online courses and personal projects, strengthening my skills and focus.`
          : "";

      this.paragraphs.relocation =
        f.optional.includeRelocation && f.optional.relocationText
          ? `Ready to Relocate : ${f.optional.relocationText}`
          : "";

      this.paragraphs.salary =
        f.optional.includeSalary && f.optional.salary
          ? `Salary Requirements: ${f.optional.salary}`
          : "";

      this.paragraphs.availability =
        f.optional.includeAvailability && f.optional.availability
          ? ` ${f.optional.availability}`
          : "";

      this.paragraphs.closing =
        `I am excited about the possibility of bringing my unique skill set to ${
          f.company.name || "your organization"
        } ` +
        `and contributing to innovative projects. Thank you for considering my application; I look forward to discussing ` +
        `how my background and interests align with your team's needs.`;

      this.paragraphs.name = f.personal.name;
      this.paragraphs.personalInfo = `${f.personal.location} | ${f.personal.email} | ${f.personal.phone}`;
      this.paragraphs.signature = f.personal.name;
      this.paragraphs.companyInfo = `${
        f.company.manager || "Recipient First Name Last Name"
      }\n${f.company.name || "Company Name"}\n${
        f.company.location || "City, State/Province Zip"
      }\nPhone\nEmail`;
    },

    updateParagraph(key, value) {
      this.paragraphs[key] = value;
    },

    resetForm() {
      localStorage.removeItem("coverLetterForm");
      localStorage.removeItem("coverLetterContent");
      location.reload();
    },

    //   async downloadPDF() {
    //     // Use a higher scale for crisp images
    // const canvas = await html2canvas(this.$refs.pdfContent, {
    //   scale: 3,
    //   useCORS: true,
    //   allowTaint: true
    // });
    //     const pdf = new jsPDF("p", "pt", "a4");
    //     const w = pdf.internal.pageSize.getWidth();
    //     const h = (canvas.height * w) / canvas.width;
    //     pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    //     pdf.save("Cover_Letter.pdf");
    //   },
    async downloadPDF() {
      const element = this.$refs.pdfContent;

      // 1. Store original styles to restore them later
      const originalStyle = element.style.cssText;

      // 2. FORCE A4 dimensions and remove scaling for the capture
      // This prevents the "squeezed" look from mobile CSS
      element.style.transform = "none";
      element.style.position = "absolute";
      element.style.left = "0px";
      element.style.top = "0px";
      element.style.margin = "0px";
      element.style.width = "794px"; // Standard A4 width at 96 DPI

      try {
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          windowWidth: 794, // Lock the capture window width
          onclone: (clonedDoc) => {
            // Ensure the cloned element used for the PDF is visible
            const clonedElement = clonedDoc.querySelector(
              ".cover-letter-paper"
            );
            clonedElement.style.transform = "none";
          },
        });

        const pdf = new jsPDF("p", "pt", "a4");
        const imgData = canvas.toDataURL("image/png");

        // Calculate A4 dimensions in points
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(
          `${this.form.personal.name.replace(/\s+/g, "_")}_Cover_Letter.pdf`
        );
      } catch (error) {
        console.error("PDF Generation failed", error);
      } finally {
        // 3. Restore mobile styles immediately
        element.style.cssText = originalStyle;
      }
    },
    async downloadDOCX() {
      const p = this.paragraphs;
      const docChildren = [
        new Paragraph(p.name),
        new Paragraph(p.personalInfo),
        new Paragraph(""),
        new Paragraph(`RE: ${this.form.company.jobTitle}`),
        new Paragraph(""),
        new Paragraph(p.para1),
        new Paragraph(p.para2),
      ];

      if (p.para3) docChildren.push(new Paragraph(p.para3));
      if (p.relocation) docChildren.push(new Paragraph(p.relocation));
      if (p.salary) docChildren.push(new Paragraph(p.salary));
      if (p.availability) docChildren.push(new Paragraph(p.availability));

      docChildren.push(new Paragraph(""));
      docChildren.push(new Paragraph(p.closing));

      const signatureChildren = [new Paragraph("Sincerely,")];

      if (this.form.personal.signatureImage) {
        signatureChildren.push(new Paragraph(""));
      }

      signatureChildren.push(
        new Paragraph({ text: this.form.personal.name, bold: true })
      );

      const doc = new Document({ sections: [{ children: docChildren }] });
      saveAs(await Packer.toBlob(doc), "Cover_Letter.docx");
    },
    // --- Drawing Logic ---
    initContext() {
      const canvas = this.$refs.signatureCanvas;
      if (!canvas) return false;

      if (!this.ctx) {
        // Set the internal resolution to match the display size
        canvas.width = canvas.offsetWidth;
        canvas.height = 150;

        this.ctx = canvas.getContext("2d");
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
      }
      return true;
    },

    getPos(e) {
      const canvas = this.$refs.signatureCanvas;
      const rect = canvas.getBoundingClientRect();

      // Get correct coordinates for mouse or touch
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },

    startDrawing(e) {
      // Attempt to init context. If it fails (canvas not in DOM), exit.
      if (!this.initContext()) return;

      this.isDrawing = true;
      const pos = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);

      // Prevent scrolling on touch devices while drawing
      if (e.cancelable) e.preventDefault();
    },
    draw(e) {
      if (!this.isDrawing || !this.ctx) return; // FIX: Added null check
      const pos = this.getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      e.preventDefault();
    },
    stopDrawing() {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      this.saveCanvas();
    },
    clearCanvas() {
      this.ctx.clearRect(
        0,
        0,
        this.$refs.signatureCanvas.width,
        this.$refs.signatureCanvas.height
      );
      this.form.personal.signatureImage = null;
    },
    saveCanvas() {
      const dataUrl = this.$refs.signatureCanvas.toDataURL("image/png");

      // Update both the form and the paragraphs for immediate reactivity
      this.form.personal.signatureImage = dataUrl;
      this.paragraphs.signatureImage = dataUrl;

      // Optional: Trigger your content generator if needed
      this.generateSmartContent();
    },

    handleSignatureUpload(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        this.form.personal.signatureImage = dataUrl;
        this.paragraphs.signatureImage = dataUrl; // Key fix: update paragraphs!

        // Draw on canvas for consistency
        const img = new Image();
        img.onload = () => {
          this.initContext();
          this.ctx.clearRect(
            0,
            0,
            this.$refs.signatureCanvas.width,
            this.$refs.signatureCanvas.height
          );
          this.ctx.drawImage(
            img,
            0,
            0,
            this.$refs.signatureCanvas.width,
            this.$refs.signatureCanvas.height
          );
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style scoped>
/* UI Styling */
.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #757575;
  letter-spacing: 1px;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
}
/* Container that acts as the 'Window' */
.preview-container {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  overflow: hidden; /* Clips the extra space from scaling */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* The actual A4 Paper */
.cover-letter-paper {
  width: 794px;
  min-height: 1123px;
  background: white;
  padding: 60px 80px;
  box-sizing: border-box;
  transform-origin: top center; /* Scale from the top */
}

/* MOBILE VIEW FIX */
@media (max-width: 900px) {
  .preview-container {
    height: 520px; /* Fixed height for the 'window' */
    background: #e0e0e0; /* Background color behind the 'paper' */
    display: flex;
    justify-content: center;
  }

  .cover-letter-paper {
    transform: scale(0.6); /* Slightly larger for readability */
    margin-top: 20px;
    flex-shrink: 0;
    /* Add a subtle shadow to the paper in the preview */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
}

/* DESKTOP VIEW */
@media (min-width: 901px) {
  .preview-container {
    position: sticky;
    top: 24px;
    height: auto;
  }

  .cover-letter-paper {
    transform: scale(
      0.9
    ); /* Slight scale down to fit desktop screens comfortably */
    transform-origin: top left;
  }
}

/* Typography styles */
.classic {
  font-family: "Times New Roman", Times, serif;
  line-height: 1.5;
}

.modern {
  font-family: "Inter", sans-serif;
  line-height: 1.6;
  color: #2c3e50;
}

.modern .sender-info h2 {
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
  display: inline-block;
  margin-bottom: 5px;
}

.header-section {
  margin-bottom: 40px;
}

.sender-info {
  text-align: right;
}

.date-line {
  margin-bottom: 20px;
}

.recipient-info {
  margin-bottom: 20px;
}

.subject-line {
  margin-bottom: 25px;
  text-transform: uppercase;
}

.letter-body p {
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.extra-sections {
  margin: 20px 0;
  padding: 10px 0;
}

/* User-friendly editing focus */
[contenteditable="true"]:hover {
  background: #f5faff;
  outline: 1px dashed #1976d2;
  cursor: text;
}
.signature-wrapper {
  border: 2px dashed #ccc;
  border-radius: 8px;
  background: #fafafa;
  position: relative;
  width: 100%;
  max-width: 400px;
}

.sig-canvas {
  width: 100%;
  height: 150px;
  cursor: crosshair;
  touch-action: none; /* Prevents scrolling while signing */
}

.canvas-controls {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  background: #eee;
}

.signature-section img {
  display: block;
  max-height: 80px;
  width: auto;
  /* multiply blend mode removes white backgrounds from signature scans */
  mix-blend-mode: multiply;
}

/* Layout */
.border-right {
  border-right: 1px solid #e0e0e0 !important;
}
.scroll-y {
  overflow-y: auto;
  max-height: 100vh;
}
.preview-scroll {
  overflow-y: auto;
  /* max-height: 100vh; */
  background-image: radial-gradient(#d1d1d1 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Form Aesthetics */
.modern-panels {
  background: transparent !important;
}
.modern-panels .v-expansion-panel:before {
  display: none;
}
.border {
  border: 1px solid #e0e0e0 !important;
}
.rounded-xl {
  border-radius: 16px !important;
}

/* Signature */
.signature-box {
  background: white;
}
.sig-canvas {
  width: 100%;
  height: 120px;
  cursor: crosshair;
}
.sig-img {
  max-height: 60px;
  mix-blend-mode: multiply;
  filter: contrast(150%);
}

/* Paper Preview */
.preview-stage {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.template-selector {
  position: absolute;
  top: 20px;
  z-index: 10;
}

.paper-wrapper {
  background: white;
  width: 794px;
  min-height: 1123px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.cover-letter-paper {
  padding: 80px;
  height: 100%;
  color: #333;
}

/* Typography Styles */
.classic {
  font-family: "Georgia", serif;
  font-size: 11pt;
}
.modern {
  font-family: "Inter", sans-serif;
  font-size: 10.5pt;
  color: #2c3e50;
}

.letter-name {
  font-size: 24pt;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 4px;
}
.modern .letter-name {
  color: #1976d2;
}
.accent-line {
  border-left: 3px solid #1976d2;
  padding-left: 12px;
  font-weight: 600;
  margin: 10px 0;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

/* Interactive Content */
[contenteditable="true"] {
  padding: 4px;
  transition: all 0.2s;
  border-radius: 4px;
}
[contenteditable="true"]:hover {
  background: rgba(25, 118, 210, 0.05);
  box-shadow: 0 0 0 1px #1976d2 inset;
}
</style>
