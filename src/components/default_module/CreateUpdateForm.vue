<template>
  <v-card>
    <v-card-title>
      {{ this.moduleConfig.plural_name }}:
      {{ this.dialog.mode == "create" ? "agregar" : "actualizar" }}
    </v-card-title>
    <v-divider class="mb-8"> </v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="10" offset="1">
          <v-switch
            v-model="modal_form_data.status"
            :label="
              modal_form_data.status == 1
                ? 'Activ' + gender_sufix
                : 'Inactiv' + gender_sufix
            "
          ></v-switch></v-col
      ></v-row>

      <v-row>
        <v-col cols="10" offset="1">
          <v-text-field
            :label="
              'Nombre ' +
              (this.moduleConfig.gender_title == 'male' ? 'del ' : 'de la ') +
              this.moduleConfig.singular_name.toLowerCase()
            "
            placeholder="Placeholder"
            outlined
            v-model="modal_form_data.name"
          ></v-text-field> </v-col
      ></v-row>

      <v-row>
        <v-col cols="12">
          <v-btn
            @click="submit"
            style="float: right"
            color="black"
            :disabled="!button_enabled"
          >
            <span class="green-text">{{
              this.dialog.mode == "create" ? "Guardar" : "Actualizar"
            }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import CategoriesController from "../../controllers/categories/CategoriesController";
export default {
  name: "CategoriesFormComponent",
  props: ["moduleConfig", "dialog", "selected_item"],
  data: () => ({
    button_enabled: true,
    modal_form_data: {
      name: "",
      status: 1,
    },
  }),
  mounted() {
    let selected_item_is_setted = Object.keys(this.selected_item).length !== 0;

    if (selected_item_is_setted) {
      this.modal_form_data = { ...this.selected_item };
    }
  },
  methods: {
    async submit() {
      if (this.dialog.mode == "create") {
        this.create();
      } else if (this.dialog.mode == "update") {
        this.update();
      }
    },

    async create() {
      console.log(this.modal_form_data);
      CategoriesController.create();
      this.$emit("onCreate", this.modal_form_data);
    },
    async update() {
      console.log(this.modal_form_data);
      CategoriesController.update();
      this.$emit("onCreate", this.selected_item.key, this.modal_form_data);
    },
  },
  computed: {
    gender_sufix() {
      return this.moduleConfig.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
