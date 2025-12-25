<template>
  <v-app class="grey lighten-4">
    <v-container fluid class="pa-0 pa-md-8">
      <v-row no-gutters justify="center">
        <v-col cols="12" lg="5" xl="4" class="pa-4">
          <v-card elevation="2" rounded="lg" class="mb-6">
            <v-toolbar flat color="primary" dark>
              <v-icon start class="mr-2">mdi-file-document-edit</v-icon>
              <v-toolbar-title>Cover Letter Builder</v-toolbar-title>
            </v-toolbar>

            <v-tabs v-model="activeTab" grow color="primary">
              <v-tab>Details</v-tab>
              <v-tab>Options</v-tab>
              <v-tab class="d-lg-none">Preview</v-tab>
            </v-tabs>

            <v-card-text class="pa-6">
              <v-window v-model="activeTab">
                <v-window-item>
                  <div class="section-title">Personal Information</div>
                  <v-row dense>
                    <v-col cols="12"><v-text-field label="Full Name" v-model="form.personal.name" outlined dense
                        hide-details class="mb-3" /></v-col>
                    <v-col cols="12" md="6"><v-text-field label="Email" v-model="form.personal.email" outlined dense
                        hide-details class="mb-3" /></v-col>
                    <v-col cols="12" md="6"><v-text-field label="Phone" v-model="form.personal.phone" outlined dense
                        hide-details class="mb-3" /></v-col>
                    <v-col cols="12"><v-text-field label="Location" v-model="form.personal.location" outlined dense
                        hide-details class="mb-6" /></v-col>
                  </v-row>

                  <div class="section-title">Company & Role</div>
                  <v-row dense>
                    <v-col cols="12"><v-text-field label="Target Job Title" v-model="form.company.jobTitle" outlined
                        dense hide-details class="mb-3" color="secondary" /></v-col>
                    <v-col cols="12" md="6"><v-text-field label="Hiring Manager" v-model="form.company.manager" outlined
                        dense hide-details class="mb-3" /></v-col>
                    <v-col cols="12" md="6"><v-text-field label="Company Name" v-model="form.company.name" outlined
                        dense hide-details class="mb-3" /></v-col>
                    <v-col cols="12"><v-text-field label="Company Location" v-model="form.company.location" outlined
                        dense hide-details class="mb-6" /></v-col>
                  </v-row>

                  <div class="section-title">Professional Context</div>
                  <v-text-field label="Current/Last Role" v-model="form.professional.role" outlined dense
                    class="mb-1" />
                  <v-text-field label="Years of Exp" v-model="form.professional.experience" outlined dense type="number"
                    class="mb-1" />
                  <v-textarea label="Core Skills (comma separated)" v-model="form.professional.skills" outlined dense
                    rows="2" class="mb-1" />
                </v-window-item>

                <v-window-item>
                  <div class="section-title mb-4">Enhance Content</div>
                  <v-switch
  v-model="form.optional.includeSalary"
  label="Include Salary Section"
  dense
  inset
  @change="generateSmartContent" 
></v-switch>

<v-text-field
  v-if="form.optional.includeSalary"
  v-model="form.optional.salary"
  label="Salary Requirements"
  placeholder="e.g. ₹12,00,000 PA"
  @input="generateSmartContent"
></v-text-field>

                  <v-switch v-model="form.optional.includeGap" label="Explain Employment Gap" inset color="primary"
                    dense />
                  <v-textarea v-if="form.optional.includeGap" v-model="form.optional.gap"
                    placeholder="Reason for gap..." outlined dense rows="2" class="ml-8 mb-4" />

                  <v-switch v-model="form.optional.includeRelocation" label="Mention Relocation" inset color="primary"
                    dense />
                  <!-- <v-textarea v-if="form.optional.includeRelocation" v-model="form.optional.relocationText" outlined
                    dense rows="2" class="ml-8 mb-4" /> -->
                    <v-select
v-if="form.optional.includeRelocation" v-model="form.optional.relocationText" outlined
                    dense rows="2" class="ml-8 mb-4"
  :items="['Yes', 'No']" 
/>


               <v-switch
  v-model="form.optional.includeAvailability"
  label="Show Availability"
  inset
  dense
  color="success"
/>

<v-select
  v-if="form.optional.includeAvailability"
  v-model="form.optional.availability"
  label="Notice Period / Availability"
  :items="['Immediate', '15 Days', '30 Days', 'Notice Period']"
  outlined
  dense
  class="ml-8"
/>

<div class="section-title mt-4">Signature</div>
<v-row>
  <v-col cols="12">
    <div class="signature-wrapper">
      <canvas 
        ref="signatureCanvas" 
        @mousedown="startDrawing" 
        @mousemove="draw" 
        @mouseup="stopDrawing"
        @touchstart="startDrawing"
        @touchmove="draw"
        @touchend="stopDrawing"
        class="sig-canvas"
      ></canvas>
      <div class="canvas-controls">
        <v-btn x-small color="error" @click="clearCanvas">Clear</v-btn>
        <v-btn x-small color="primary" @click="saveCanvas">Apply Signature</v-btn>
      </div>
    </div>
  </v-col>
  
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
</v-row>

                  <v-divider class="my-4" />


                  <v-select label="Template Style" :items="templates" v-model="selectedTemplate"
                    prepend-inner-icon="mdi-palette" outlined dense />

                  <v-btn block color="secondary" depressed large @click="generateSmartContent" class="mt-4">
                    <v-icon left>mdi-auto-fix</v-icon> Refresh Content
                  </v-btn>
                </v-window-item>

                <v-window-item class="d-lg-none">
                  <p class="text-center grey--text">
                    See the preview below or download the file.
                  </p>
                </v-window-item>
              </v-window>
            </v-card-text>

            <v-divider />

            <v-card-actions class="pa-4 grey lighten-5">
              <v-btn color="error" text @click="resetForm">Reset</v-btn>
              <v-spacer />
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on">
                    Download <v-icon right>mdi-download</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="downloadPDF">
                    <v-list-item-title><v-icon color="red" left>mdi-file-pdf-box</v-icon> PDF
                      Document</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="downloadDOCX">
                    <v-list-item-title><v-icon color="blue" left>mdi-file-word</v-icon> Word
                      Document</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" lg="7" xl="6" class="pa-4 d-flex justify-center">
          <div class="preview-container" :class="{ 'mobile-preview': $vuetify.breakpoint.smAndDown }">
            <div ref="pdfContent" :class="['cover-letter-paper', templateClass]">
              <div class="header-section">
                <div class="sender-info">
                  <h2 contenteditable="true" @input="updateParagraph('name', $event.target.innerText)">
                    {{ form.personal.name }}
                  </h2>
                  <p contenteditable="true" @input="
                    updateParagraph('personalInfo', $event.target.innerText)
                    ">
                    {{ form.personal.location }} • {{ form.personal.email }} •
                    {{ form.personal.phone }}
                  </p>
                </div>
              </div>

              <div class="letter-body">
                <div class="date-line">{{ today }}</div>

                <div class="recipient-info" contenteditable="true" @input="
                  updateParagraph('companyInfo', $event.target.innerText)
                  ">
                  {{ form.company.manager || "Hiring Manager" }}<br />
                  {{ form.company.name || "Company Name" }}<br />
                  {{ form.company.location || "City, State" }}
                </div>

                <div class="subject-line">
                  <strong>RE:
                    {{ form.company.jobTitle || "Job Application" }}</strong>
                </div>

                <p contenteditable="true" @input="updateParagraph('para1', $event.target.innerText)">
                  {{ paragraphs.para1 }}
                </p>
                <p contenteditable="true" @input="updateParagraph('para2', $event.target.innerText)">
                  {{ paragraphs.para2 }}
                </p>
                <p v-if="paragraphs.para3" contenteditable="true"
                  @input="updateParagraph('para3', $event.target.innerText)">
                  {{ paragraphs.para3 }}
                </p>

                <div class="extra-sections">
                  <p v-if="paragraphs.relocation" contenteditable="true"  class="font-weight-bold mb-2">
                    {{ paragraphs.relocation }}
                  </p>
                  <p v-if="form.optional.includeSalary && paragraphs.salary" contenteditable="true"
                    class="font-weight-bold mb-2">
                    {{ paragraphs.salary }}
                  </p>
                  <p v-if="form.optional.includeAvailability && paragraphs.availability" contenteditable="true" style="font-weight: bold; color: #444;">
                    <strong>Availability:</strong> {{ paragraphs.availability }}
                  </p>
                </div>

                <p contenteditable="true" @input="updateParagraph('closing', $event.target.innerText)">
                  {{ paragraphs.closing }}
                </p>

                <div class="signature-section">
                  Sincerely,<br /><br /> 
   <div v-if="paragraphs.signatureImage" class="signature-img-container">
    <img 
      :src="paragraphs.signatureImage" 
      alt="Signature"
      style="max-height: 70px; width: auto; mix-blend-mode: multiply;"
    />
  </div>
  
  <div v-else style="height: 40px;"></div>

  <strong
    contenteditable="true"
    @input="updateParagraph('signature', $event.target.innerText)"
  >{{ paragraphs.signature }}</strong> 
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
      immediate: true
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
        `I am writing to express my interest in the ${f.company.jobTitle || "position"
        } ` +
        `at ${f.company.name || "your esteemed company"
        }. I believe my background as a ${f.professional.role || "professional"
        }, ` +
        `combined with my experience of ${f.professional.experience || "X"
        } years and skills in ${f.professional.skills || "various areas"}, ` +
        `positions me as an ideal candidate. ${f.professional.summary ? f.professional.summary : ""
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
        `I am excited about the possibility of bringing my unique skill set to ${f.company.name || "your organization"
        } ` +
        `and contributing to innovative projects. Thank you for considering my application; I look forward to discussing ` +
        `how my background and interests align with your team's needs.`;

      this.paragraphs.name = f.personal.name;
      this.paragraphs.personalInfo = `${f.personal.location} | ${f.personal.email} | ${f.personal.phone}`;
      this.paragraphs.signature = f.personal.name;
      this.paragraphs.companyInfo = `${f.company.manager || "Recipient First Name Last Name"
        }\n${f.company.name || "Company Name"}\n${f.company.location || "City, State/Province Zip"
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
        const clonedElement = clonedDoc.querySelector('.cover-letter-paper');
        clonedElement.style.transform = "none";
      }
    });

    const pdf = new jsPDF("p", "pt", "a4");
    const imgData = canvas.toDataURL("image/png");
    
    // Calculate A4 dimensions in points
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(`${this.form.personal.name.replace(/\s+/g, '_')}_Cover_Letter.pdf`);

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

signatureChildren.push(new Paragraph({ text: this.form.personal.name, bold: true }));

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
      y: clientY - rect.top
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
    this.ctx.clearRect(0, 0, this.$refs.signatureCanvas.width, this.$refs.signatureCanvas.height);
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
      this.ctx.clearRect(0, 0, this.$refs.signatureCanvas.width, this.$refs.signatureCanvas.height);
      this.ctx.drawImage(img, 0, 0, this.$refs.signatureCanvas.width, this.$refs.signatureCanvas.height);
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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
    transform: scale(0.9); /* Slight scale down to fit desktop screens comfortably */
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
</style>
