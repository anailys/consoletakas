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
        <!--v-btn @click="openDialog('create')"
          >Nuev{{ gender_sufix }}
          {{ module_config.singular_name.toLowerCase() }}</v-btn
        -->
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="background-one">
          <v-card-title class="justify-center">
            <h3 class="white--text">Categorías de la app</h3>
          </v-card-title>
          <v-card-text>
            <v-simple-table dark class="background-one">
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
                    {{ body.namec }}
                  </td>
                  <td>
                    <v-chip
                      :color="body.status ? 'green lighten-4' : '#FF8A80'"
                      >{{
                        body.status
                          ? "activ" + gender_sufix
                          : "inactiv" + gender_sufix
                      }}</v-chip
                    >
                  </td>
                  <td>
                    <div>
                      <v-btn icon @click="updateItem(i)"
                        ><v-icon medium color="white darken-2">
                          mdi-pencil
                        </v-icon></v-btn
                      >
                      <v-btn icon @click="confirmDeleteItem(i)"
                        ><v-icon medium color="white darken-2">
                          mdi-delete
                        </v-icon></v-btn
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card class="background-one">
              <v-card-title
                ><h4 class="font-weight-bold white--text">
                  Categorías mas usadas
                </h4></v-card-title
              >
              <v-divider></v-divider>
              <v-card-text>
                <v-simple-table dark class="background-one white--text">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="white--text text-center">Nombre</th>
                        <th class="white--text text-center">Me interesa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in most_used_categories"
                        :key="'interested_' + i"
                        class="text-center"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.uses }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="background-one">
              <v-card-title
                ><h4 class="font-weight-bold white--text">
                  Categorías mas interesadas
                </h4></v-card-title
              >
              <v-divider></v-divider>
              <v-card-text>
                <v-simple-table dark class="background-one white--text">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="white--text text-center">Nombre</th>
                        <th class="white--text text-center">Me interesa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in most_interested_categories"
                        :key="'interested_' + i"
                        class="text-center"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.interested }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
    most_interested_categories: [
      {
        name: "Deportes",
        interested: "5",
      },
      {
        name: "Ropa",
        interested: "88",
      },
      {
        name: "Accesorios",
        interested: "32",
      },
      {
        name: "Joyería",
        interested: "25",
      },
      {
        name: "Automoviles",
        interested: "57",
      },
      {
        name: "Juguetes",
        interested: "62",
      },
    ],
    most_used_categories: [
      {
        name: "Deportes",
        uses: "5",
      },
      {
        name: "Ropa",
        uses: "88",
      },
      {
        name: "Accesorios",
        uses: "32",
      },
      {
        name: "Joyería",
        uses: "25",
      },
      {
        name: "Automoviles",
        uses: "57",
      },
      {
        name: "Juguetes",
        uses: "62",
      },
    ],
    key_of_item_to_delete: -1,
  }),

  async mounted() {
    this.items = await this.list();
    this.table.body = this.items;
  },
  methods: {
    async list() {
      let req = await CategoriesController.list();
      if (req.status == 200) {
        console.log(req.data.data);
        return req.data.data;
      }
    },
    confirmDeleteItem(i) {
      this.key_of_item_to_delete = i;
      this.openDialog("confirm");
    },
    async deleteItem(confirmed) {
      if (confirmed) {
        let item_to_delete = this.items[this.key_of_item_to_delete];
        let req = await CategoriesController.delete(item_to_delete.id);
        if (req.status == 200) {
          this.items[this.key_of_item_to_delete].status = 0;
        }
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
      this.items.push(created_item);
      this.closeDialog();
    },

    onUpdate(key, updated_item) {
      console.log(updated_item);
      this.items[key] = updated_item;
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
