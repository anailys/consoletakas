<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ module_config.plural_name }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-text-field
          
          v-model="searcher"
          background-color="white"
          :label="'Buscar ' + module_config.singular_name.toLowerCase()"
          rounded
          filled
          dense
          :disabled="tableType != 'adminCategories'"
          
        ></v-text-field>
      </v-col>
      <v-col cols="9" align="right">
        <v-btn @click="createItem()">crear categoria</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <v-tabs >
                  <v-tab  @click="listAdminCategories(true)">Administrar categorias</v-tab>
                  <v-tab  @click="listCategoryUsed(true)">Más usados</v-tab>
                  <v-tab  @click="listCategoryInterested(true)">Más interesados</v-tab>
                </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8" offset="2">
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
              <tbody v-if="tableType == 'adminCategories'">
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
              <tbody v-if="tableType == 'categoryUsed' || tableType == 'categoryInterested'">
                <tr
                  class="text-center"                 
                  v-for="(body, i) in table.body"
                  :key="'row_' + i"
                >
                  <td>
                    {{ body.name }}
                  </td>
                  <td>
                    {{ body.namec }}
                  </td>
                  <td v-if="tableType == 'categoryUsed'">
                    {{ body.category }}
                  </td>
                  <td>
                    {{ body.subcategory }}
                  </td>
                  <td>
                    {{ body.cant_row }}
                  </td>                  
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col offset-md="2" cols="8" class="d-flex justify-center align-center">
      
        <PaginatorInfo :paginator="paginator" :key="paginator.key" />
      </v-col>
      <v-col offset-md="2" cols="8" class="d-flex justify-center align-center">
        <Paginator
          class="mt-1"
          @onChangePage="onChangePage"
          :key="paginator.key"
          :total-items="paginator.total_items"
          :max-buttons="paginator.max_buttons"
          :current-page="paginator.current_page"
          :total-pages="paginator.total_pages"
          :items-per-page="paginator.items_per_page"
        />
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
import PaginatorInfo from "../../components/utils/PaginatorInfo.vue";
import Paginator from "../../components/utils/Paginator";

export default {
  components: { CategoriesForm, ConfirmDialog, PaginatorInfo,Paginator},
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
      header: [],
      body: {},
    },
    tableType : "",
    key_of_item_to_delete: -1,
    paginator: {
      key: 0,
      total_items: -1,
      max_buttons: 1,
      current_page: 1,
      total_pages: -1,
      items_per_page: 5,
    },
    searcher: "",
    status:1,
    
    filter_by_active_items: true,
    
  }),

  async mounted() {
    this.items = await this.list();
    this.table.body = this.items;
    this.table.header = [{ text: "Nombre" }, { text: "Estado" }, { text: "Opciones" }];
    this.tableType = "adminCategories";
    
  },
  methods: {
    async onChangePage(page) {
      this.paginator.current_page = page;
      
      if (this.tableType == "adminCategories") {
        await this.listAdminCategories(false);
      }
      if (this.tableType == "categoryUsed") {
        await this.listCategoryUsed(false);
      }
      if (this.tableType == "categoryInterested") {
        await this.listCategoryInterested(false);
      }    
      
    },

    async list() {
      let response = await CategoriesController.list(
        this.status,
        this.paginator,
        this.searcher
      );
      if (response.status == 200) {
        console.log(response.data.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key = response.data.data.current_page;
        return response.data.data.list_categorys;
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
    async createItem() {
      this.openDialog("create");     
    },
    async listAdminCategories(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
      this.items = await this.list();
    this.table.body = this.items;
    this.table.header = [{ text: "Nombre" }, { text: "Estado" }, { text: "Opciones" }];
    this.tableType = "adminCategories";
    },
    async listCategoryUsed(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
      let response = await CategoriesController.listCategoryUsed(      
        this.paginator
      );
      if (response.status == 200) {
        console.log(response.data.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key = response.data.data.current_page;        
      }
    this.table.body = response.data.data.list_categorys;
    this.table.header = [{ text: "Nombre" }, { text: "nombrec" }, { text: "N° Categoria" }, { text: "N° Subcategoria" }, { text: "Cantidad" }];
    this.tableType = "categoryUsed";
    },
    async listCategoryInterested(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
      let response = await CategoriesController.listCategoryInterested(
        this.paginator
      );
      if (response.status == 200) {
        console.log(response.data.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key = response.data.data.current_page;        
      }
    this.table.body = response.data.data.list_categorys;
    this.table.header = [{ text: "Nombre" }, { text: "nombrec" },  { text: "N° Subcategoria" }, { text: "Cantidad" }];
    this.tableType = "categoryInterested";
    },
    openDialog(mode) {
      this.dialog.is_displayed = true;
      this.dialog.mode = mode;
    },

    closeDialog() {
      this.dialog.is_displayed = false;
      this.dialog.mode = "";
    },

    onCreate() {
       if (this.tableType == "adminCategories") {
        this.listAdminCategories(true);
      }
      if (this.tableType == "categoryUsed") {
        this.listCategoryUsed(true);
      }
      if (this.tableType == "categoryInterested") {
        this.listCategoryInterested(true);
      }    
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
    }
  },
  watch: {
    "dialog.is_displayed"(is_displayed) {
      !is_displayed ? this.cleanDialog() : null;
    },
    async searcher() {
      await this.listAdminCategories(true);
    }

  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
