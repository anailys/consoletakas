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
      id: 0,
      name: "",
      status: 1,
    },
  }),
  mounted() {
    let selected_item_is_setted = Object.keys(this.selected_item).length !== 0;

    if (selected_item_is_setted) {
      this.modal_form_data.name = this.selected_item.namec;
      this.modal_form_data.status = this.selected_item.status;
      this.modal_form_data.id = this.selected_item.id;
    }
  },
  methods: {
    async submit() {
      if (this.dialog.mode == "create") {
        await this.create();
      } else if (this.dialog.mode == "update") {
        await this.update();
      }
    },

    async create() {
      let req = await CategoriesController.create(this.modal_form_data);
      console.log(req);
      if (req.status == 200) {
        alert(
          "el response no trae el id del registro creado. se necesita para agregar el nuevo registro a la tabla"
        );
        this.$emit("onCreate", {
          //id: this.req.data.id,
          namec: this.modal_form_data.name,
          status: this.modal_form_data.status,
        });
      } else {
        alert("notificar error");
      }
    },
    async update() {
      console.log(this.modal_form_data);
      let req = await CategoriesController.update(this.modal_form_data);
      if (req.status == 200) {
        this.$emit("onUpdate", this.selected_item.key, {
          id: this.modal_form_data.id,
          namec: this.modal_form_data.name,
          status: this.modal_form_data.status,
        });
      } else {
        alert("notificar error");
      }
    },
  },
  computed: {
    gender_sufix() {
      return this.moduleConfig.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
