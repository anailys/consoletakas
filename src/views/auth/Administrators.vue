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
        ></v-text-field>
      </v-col>
      <v-col cols="9" align="right">
        <v-btn @click="createCode()">Generar código creación</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="8" offset-md="2" cols="12">
        <v-simple-table>
          <thead>
            <tr>
              <th
                class="text-center"
                v-for="(header, i) in table_header"
                :key="'header_' + i"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="(item, i) in items"
              :key="'row_' + i"
            >
              <td>
                {{ item.user }}
              </td>
              <td>
                {{ item.email }}
              </td>
              <td>
                <v-chip :color="item.status ? 'green lighten-4' : '#FF8A80'">{{
                  item.status
                    ? "activ" + gender_sufix
                    : "inactiv" + gender_sufix
                }}</v-chip>
              </td>
             
            </tr>
          </tbody>
        </v-simple-table>
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
  </v-container>
</template>

<script>
/*import AppUsersForm from "../../components/app_users/AppUsersCreateUpdateForm";*/
/*import ConfirmDialog from "../../components/ConfirmDialog.vue";*/
import AppUsersController from "../../controllers/app_users/AppUsersController";
/*import Dropdown from "../../components/dropdowns/Drowdown-1.vue";*/
import Paginator from "../../components/utils/Paginator";
import PaginatorInfo from "../../components/utils/PaginatorInfo.vue";
import StorageController from "../../controllers/StorageController";
/*import UserDetails from "../../components/app_users/UserDetails.vue";*/

export default {
  components: {
    /*AppUsersForm,*/
    /* ConfirmDialog,*/
    /*Dropdown,*/
    Paginator,
     /*UserDetails,*/
    PaginatorInfo,
  },
  data: () => ({
    paginator: {
      key: 0,
      total_items: -1,
      max_buttons: 1,
      current_page: 1,
      total_pages: -1,
      items_per_page: 5,
    },
    searcher: "",
    module_config: {
      plural_name: "Usuarios Admin",
      singular_name: "Usuario admin",
      gender_title: "male",
    },    
    auxNewUser: {
      IdUserCreator: "",
      Privilegio: "Admin",
      token: ""
      },
    dialog: {
      is_displayed: false,
      mode: "",
    },
    items: [],
    selected_item: {},
    table_header: [
      { text: "Nombre" },
      { text: "Email" },
      { text: "Estado" },
    ]
  }),
  async mounted() {
    this.items = await this.listUsersAdmins();
    console.log(this.items);
  },
  methods: {
    async createCode() {
 
      let _storage = await StorageController.useStorage("auth");
      this.auxNewUser.IdUserCreator = _storage.user_id,
      this.auxNewUser.token = _storage.token,
       
      console.log(this.auxNewUser);
      AppUsersController.createCode(this.auxNewUser);     
    },

    showAppUserInfo(item) {
      this.selected_item = item;
      this.dialog.is_displayed = true;
      this.dialog.mode = "app_user_details";
    },
    async onChangePage(page) {
      this.paginator.current_page = page;
      this.items = await this.listUsersAdmins();
      this.paginator.key++;
    },
    async listUsersAdmins() {
      let response = await AppUsersController.listUsersAdmins(
        this.paginator,
        this.searcher

      );
      if (response.status == 200) {
        console.log(response.data.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key++;
        return response.data.data.list_categorys;
      } else {
        console.log(response);
        alert("Ha ocurrido un error inesperado");
      }
    },
    confirmDeleteItem() {
      this.openDialog("confirm");
    },
    deleteItem(confirmed) {
      if (confirmed) {
        AppUsersController.delete();
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
    async searcher() {
      this.paginator.current_page = 1;
      this.items = await this.listUsersAdmins();
    },
  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
