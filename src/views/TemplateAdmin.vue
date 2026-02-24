<template>
  <v-container
    fluid
    class="grey lighten-5 fill-height align-start pa-0 pa-sm-4"
  >
    <v-row justify="center" no-gutters>
      <v-col cols="12" lg="10">
        <div
          class="px-4 py-6 d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between gap-4"
        >
          <div class="mb-4 mb-sm-0">
            <h1 class="text-h4 font-weight-black primary--text mb-1">
              Template Library
            </h1>
            <p class="text-subtitle-2 grey--text">
              Design and manage your custom reach-out scripts
            </p>
          </div>
          <div class="d-flex flex-wrap align-center gap-2">
            <v-btn
              text
              color="primary"
              class="font-weight-bold text-none px-2 px-sm-4"
              @click="downloadBackup"
            >
              <v-icon left>mdi-download</v-icon>
              Download
            </v-btn>
            <v-btn
              text
              color="success"
              class="font-weight-bold text-none px-2 px-sm-4"
              @click="$refs.fileInput.click()"
            >
              <v-icon left>mdi-upload</v-icon>
              Upload
            </v-btn>
            <input
              type="file"
              ref="fileInput"
              hidden
              accept=".json"
              @change="uploadBackup"
            />
            <v-btn icon large color="grey darken-2" to="/" class="ml-sm-4">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <v-row>
          <v-col cols="12" md="7">
            <v-card flat rounded="xl" class="pa-6 border shadow-sm">
              <div class="d-flex align-center mb-6">
                <v-avatar color="primary lighten-5" size="40" class="mr-4">
                  <v-icon color="primary">mdi-shape-plus</v-icon>
                </v-avatar>
                <span class="text-h6 font-weight-bold">
                  {{ editIndex !== null ? "Edit Template" : "New Template" }}
                </span>
              </div>

              <v-text-field
                v-model="editor.name"
                label="Template Title"
                placeholder="e.g., Follow-up Message"
                outlined
                rounded
                color="primary"
              />

              <div class="mb-2 d-flex align-center">
                <span class="text-caption font-weight-bold grey--text mr-2"
                  >INSERT VARIABLE:</span
                >
                <div class="d-flex flex-wrap" style="gap: 4px">
                  <v-chip
                    v-for="v in [
                      'recruiterName',
                      'company',
                      'role',
                      'experience',
                      'location',
                    ]"
                    :key="v"
                    x-small
                    label
                    color="primary lighten-5"
                    text-color="primary"
                    class="font-weight-medium cursor-pointer"
                    @click="insertVar(v)"
                  >
                    + {{ v }}
                  </v-chip>
                </div>
              </div>

              <v-textarea
                v-model="editor.body"
                outlined
                rounded
                rows="10"
                label="Message Body"
                :placeholder="'Hi {{recruiterName}}, I\'m interested in the {{role}} position...'"
                color="primary"
                class="template-editor-text"
              />

              <v-row dense>
                <v-col cols="12" sm="8">
                  <v-btn
                    block
                    x-large
                    rounded
                    depressed
                    color="primary"
                    class="text-none font-weight-bold"
                    @click="save"
                    :disabled="!editor.name || !editor.body"
                  >
                    <v-icon left>mdi-check</v-icon>
                    {{
                      editIndex !== null ? "Update Template" : "Save to Library"
                    }}
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn
                    block
                    x-large
                    rounded
                    outlined
                    color="grey darken-1"
                    class="text-none"
                    @click="resetEditor"
                  >
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <p class="text-overline grey--text font-weight-bold ml-2">
              Your Saved Scripts ({{ templates.length }})
            </p>

            <div
              v-if="templates.length === 0"
              class="text-center py-12 border rounded-xl bg-white"
            >
              <v-icon size="64" color="grey lighten-3"
                >mdi-folder-open-outline</v-icon
              >
              <p class="grey--text mt-4">No custom templates yet.</p>
            </div>

            <v-card
              v-for="(t, i) in templates"
              :key="i"
              flat
              rounded="xl"
              class="mb-3 border list-item-hover transition-swing"
              :class="
                editIndex === i
                  ? 'primary lighten-5 border-primary'
                  : 'bg-white'
              "
            >
              <v-card-text class="pa-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span
                    class="text-subtitle-1 font-weight-bold primary--text"
                    >{{ t.name }}</span
                  >
                  <div>
                    <v-btn
                      icon
                      small
                      color="primary"
                      @click="edit(i)"
                      class="mr-1"
                    >
                      <v-icon small>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn icon small color="red lighten-2" @click="remove(i)">
                      <v-icon small>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
                <p
                  class="text-body-2 grey--text text--darken-1 text-truncate mb-0"
                >
                  {{ t.body }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      rounded="pill"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      templates: [],
      editor: { name: "", body: "" },
      editIndex: null,
      snackbar: { show: false, text: "", color: "" },
    };
  },

  mounted() {
    this.loadTemplates();
  },

  methods: {
    loadTemplates() {
      this.templates = JSON.parse(
        localStorage.getItem("custom_templates") || "[]",
      );
    },

    save() {
      if (!this.editor.name || !this.editor.body) return;

      const updated = [...this.templates];
      if (this.editIndex !== null) {
        updated[this.editIndex] = { ...this.editor };
      } else {
        updated.push({ ...this.editor });
      }

      localStorage.setItem("custom_templates", JSON.stringify(updated));
      this.loadTemplates();
      this.resetEditor();
    },

    edit(i) {
      this.editor = { ...this.templates[i] };
      this.editIndex = i;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    remove(i) {
      if (confirm("Delete this template?")) {
        this.templates.splice(i, 1);
        localStorage.setItem(
          "custom_templates",
          JSON.stringify(this.templates),
        );
        if (this.editIndex === i) this.resetEditor();
      }
    },

    resetEditor() {
      this.editor = { name: "", body: "" };
      this.editIndex = null;
    },

    insertVar(variable) {
      this.editor.body += `{{${variable}}}`;
    },

    downloadBackup() {
      const data = {
        resume_form_data: JSON.parse(
          localStorage.getItem("resume_form_data") || "{}",
        ),
        resume_selected_template:
          localStorage.getItem("resume_selected_template") || "",
        export_date: new Date().toISOString(),
        version: "1.0",
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume_backup_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      this.snackbar = {
        show: true,
        text: "Backup downloaded successfully!",
        color: "success",
      };
    },

    uploadBackup(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);

          if (data.resume_form_data)
            localStorage.setItem(
              "resume_form_data",
              JSON.stringify(data.resume_form_data),
            );
          if (data.resume_selected_template)
            localStorage.setItem(
              "resume_selected_template",
              data.resume_selected_template,
            );

          this.loadTemplates();
          this.snackbar = {
            show: true,
            text: "Backup restored successfully! Reloading...",
            color: "success",
          };
          setTimeout(() => location.reload(), 1500);
        } catch (err) {
          console.error(err);
          this.snackbar = {
            show: true,
            text: "Failed to parse backup file.",
            color: "error",
          };
        }
      };
      reader.readAsText(file);
    },
  },
};
</script>

<style scoped>
.border {
  border: 1px solid #e0e0e0 !important;
}
.border-primary {
  border: 1px solid var(--v-primary-base) !important;
}
.shadow-sm {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}
.cursor-pointer {
  cursor: pointer;
}
.list-item-hover:hover {
  border-color: #bdbdbd !important;
  transform: translateY(-2px);
}
.template-editor-text >>> textarea {
  font-family: "Inter", sans-serif;
  line-height: 1.5;
}
</style>
