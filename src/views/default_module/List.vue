<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ module_config.plural_name }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          background-color="white"
          :label="'Buscar ' + module_config.singular_name.toLowerCase()"
          rounded
          filled
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn @click="openDialog('create')"
          >Nuev{{ gender_sufix }}
          {{ module_config.singular_name.toLowerCase() }}</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col md="10" offset-md="1" cols="12">
        <v-simple-table>
          <thead>
            <tr>
              <th
                class="text-center"
                v-for="(header, i) in table.header"
                :key="'header_' + i"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="(body, i) in table.body"
              :key="'row_' + i"
            >
              <td>
                {{ body.name }}
              </td>
              <td>
                <v-chip :color="body.status ? 'green lighten-4' : '#FF8A80'">{{
                  body.status
                    ? "activ" + gender_sufix
                    : "inactiv" + gender_sufix
                }}</v-chip>
              </td>
              <td>
                <div>
                  <v-btn icon @click="updateItem(i)"
                    ><v-icon medium color="blue darken-2">
                      mdi-pencil
                    </v-icon></v-btn
                  >
                  <v-btn icon @click="confirmDeleteItem(i)"
                    ><v-icon medium color="red darken-2">
                      mdi-delete
                    </v-icon></v-btn
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog.is_displayed" width="500">
      <CategoriesForm
        v-if="dialog.mode == 'create' || dialog.mode == 'update'"
        :selected_item="selected_item"
        :moduleConfig="module_config"
        :dialog="dialog"
        @onCreate="onCreate"
        @onUpdate="onUpdate"
      />
      <ConfirmDialog
        v-if="dialog.mode == 'confirm'"
        @on:answer="deleteItem"
        :message="'¿Realmente desea eliminarl' + gender_sufix + '?'"
      />
    </v-dialog>
  </v-container>
</template>

<script>
//import CategoriesController from "../../controllers/categories/CategoriesController";
//import { useCategoriesStore } from "../../store/categories/CategoriesStore";

import CategoriesForm from "../../components/categories/CreateUpdateForm";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import CategoriesController from "../../controllers/categories/CategoriesController";

export default {
  components: { CategoriesForm, ConfirmDialog },
  data: () => ({
    module_config: {
      plural_name: "Categorías",
      singular_name: "Categoría",
      gender_title: "female",
    },
    dialog: {
      is_displayed: false,
      mode: "",
    },
    items: [],
    selected_item: {},
    table: {
      header: [{ text: "Nombre" }, { text: "Estado" }, { text: "Opciones" }],
      body: {},
    },
  }),

  async mounted() {
    this.items = await this.list();
    this.table.body = this.items;
  },
  methods: {
    async list() {
      return [
        {
          id: 1,
          name: "Categoria 1",
          status: 1,
        },
        {
          id: 2,
          name: "Categoria 2",
          status: 0,
        },
        {
          id: 3,
          name: "Categoria 3",
          status: 1,
        },
        {
          id: 4,
          name: "Categoria 4",
          status: 0,
        },
        {
          id: 5,
          name: "Categoria 5",
          status: 1,
        },
        {
          id: 6,
          name: "Categoria 6",
          status: 0,
        },
        {
          id: 7,
          name: "Categoria 7",
          status: 1,
        },
        {
          id: 8,
          name: "Categoria 8",
          status: 0,
        },
      ];
    },
    confirmDeleteItem() {
      this.openDialog("confirm");
    },
    deleteItem(confirmed) {
      if (confirmed) {
        CategoriesController.delete();
      }
      this.dialog.is_displayed = false;
      this.cleanDialog();
    },

    async updateItem(i) {
      this.openDialog("update");
      this.selected_item = this.items[i];
      this.selected_item.key = i;
    },

    openDialog(mode) {
      this.dialog.is_displayed = true;
      this.dialog.mode = mode;
    },
    closeDialog() {
      this.dialog.is_displayed = false;
      this.dialog.mode = "";
    },
    onCreate(created_item) {
      created_item;
      this.closeDialog();
    },

    onUpdate(updated_item) {
      updated_item;
      this.closeDialog();
    },
    cleanDialog() {
      this.selected_item = {};
      this.dialog.mode = "";
    },
  },
  watch: {
    "dialog.is_displayed"(is_displayed) {
      !is_displayed ? this.cleanDialog() : null;
    },
  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
