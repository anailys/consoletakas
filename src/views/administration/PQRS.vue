<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ module_config.plural_name }}</h1>
      </v-col>
    </v-row>   
    <v-row>
      <v-col cols="12" align="center">
        <v-tabs >
                  <v-tab  @click="listPqrsUnanswered(true)">Sin responder</v-tab>
                  <v-tab  @click="listPqrsAnswered(true)">Respondidos</v-tab>
                  <v-tab  @click="listPqrsArchived(true)">Archivados</v-tab>
                  
                </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" >
        <v-card class="background-one">          
          <v-card-text>
            <v-simple-table dark class="background-one">
              <thead>
                <tr>
                  <th
                    class="text-center"
                    v-for="(header, i) in table.header"
                    :key="'header_' + i"
                  >
                    <h2>{{ header.text }}</h2>
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
                    {{ body.email }}
                  </td>
                  <td>
                    {{ body.datecreated }}
                  </td>
                  <td v-if="tableType != 'archived'">
                    <div>
                      <v-btn v-if="tableType != 'answered'" icon @click="answerItem(i)"
                        ><v-icon medium color="white darken-2">
                          mdi-comment-arrow-right-outline
                        </v-icon></v-btn
                      >
                      <v-btn icon @click="confirmArchivedItem(i)"
                        ><v-icon medium color="white darken-2">
                          mdi-archive
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
      <AnswerComponent
        v-if="dialog.mode == 'send'"
        :message="selected_item"        
        @onSend="onSend"
      />
      <ConfirmDialog
        v-if="dialog.mode == 'confirm'"
        @on:answer="archivedItem"
        :message="'¿Realmente desea archivarlo?'"
      />
    </v-dialog>
  </v-container>
</template>

<script>
//import CategoriesController from "../../controllers/categories/CategoriesController";
//import { useCategoriesStore } from "../../store/categories/CategoriesStore";

import AnswerComponent from "../../components/messages/AnswerComponent.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import AdministrationController from "../../controllers/administration/AdministrationController";
import PaginatorInfo from "../../components/utils/PaginatorInfo.vue";
import Paginator from "../../components/utils/Paginator";

export default {
  components: { AnswerComponent, ConfirmDialog, PaginatorInfo,Paginator},
  data: () => ({
    module_config: {
      plural_name: "PQRS",
      singular_name: "PQRS",
      gender_title: "male",
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
    key_of_item_to_archived: -1,
    paginator: {
      key: 0,
      total_items: -1,
      max_buttons: 1,
      current_page: 1,
      total_pages: -1,
      items_per_page: 5,
    },
    filter_by_active_items: true,
    
  }),

  async mounted() {
    this.items = await this.listPqrs(35);
    this.table.body = this.items;
    this.table.header = [{ text: "Nombre" }, { text: "Correo" }, { text: "Fecha solicitud" },{ text: "Opciones" }];
    this.tableType = "unanswered";
    
  },
  methods: {
    async onChangePage(page) {
      this.paginator.current_page = page;
      
      if (this.tableType == "unanswered") {
        await this.listPqrsUnanswered(false);
      }
      if (this.tableType == "answered") {
        await this.listPqrsAnswered(false);
      }
      if (this.tableType == "archived") {
        await this.listPqrsArchived(false);
      }    
      
    },

    async listPqrs(status) {
      let response = await AdministrationController.listPqrs(
        status,
        this.paginator       
      );
      if (response.status == 200) {
        console.log(response.data.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key = response.data.data.current_page;
        return response.data.data.list_pqrs;
      }
    },
    confirmArchivedItem(i) {
      this.key_of_item_to_archived = i;
      this.openDialog("confirm");
    },
    async archivedItem(confirmed) {
      if (confirmed) {
        let item_to_archived = this.items[this.key_of_item_to_archived];
        let req = await AdministrationController.Archived(item_to_archived.id);
        if (req.status == 200) {
          this.items[this.key_of_item_to_archived].status = 0;
        }
        if (this.tableType == "unanswered") {
        await this.listPqrsUnanswered(true);
      }
      if (this.tableType == "answered") {
        await this.listPqrsAnswered(true);
      }
      if (this.tableType == "archived") {
        await this.listPqrsArchived(true);
      }    
      }
      this.dialog.is_displayed = false;
      this.cleanDialog();
    },

    async answerItem(i) {
      this.openDialog("send");
      this.selected_item = this.items[i];
      this.selected_item.key = i;
    },
    async createItem() {
      this.openDialog("create");     
    },
    async listPqrsUnanswered(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
    this.items = await this.listPqrs(35);
    this.table.body = this.items;
    this.table.header = [{ text: "Nombre" }, { text: "Correo" }, { text: "Fecha solicitud" },{ text: "Opciones" }];
    this.tableType = "unanswered";
    },
    async listPqrsAnswered(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
    this.items = await this.listPqrs(36);    
    this.table.body = this.items;
    this.table.header = [{ text: "Nombre" }, { text: "Correo" }, { text: "Fecha solicitud" },{ text: "Opciones" }];
    this.tableType = "answered";
    },
    async listPqrsArchived(isRestartPaging) {
      if(isRestartPaging == true){
      this.paginator.current_page = 1;
      this.paginator.key = 0;
    }
    this.items = await this.listPqrs(38);   
    this.table.body = this.items; 
    this.table.header = [{ text: "Nombre" }, { text: "Correo" }, { text: "Fecha solicitud" }];    
    this.tableType = "archived";
    },
    openDialog(mode) {
      this.dialog.is_displayed = true;
      this.dialog.mode = mode;
    },

    closeDialog() {
      this.dialog.is_displayed = false;
      this.dialog.mode = "";
    },

    onSend() {
      this.listPqrsUnanswered(true)
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
    }  

  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
