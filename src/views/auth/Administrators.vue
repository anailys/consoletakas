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
        v-model="searcher"
          background-color="white"
          :label="'Buscar ' + module_config.singular_name.toLowerCase()"
          rounded
          filled
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn @click="createUser">Nuevo usuario</v-btn>
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
                {{ item.fullname }}
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
    <v-dialog>
      <v-card>
        <v-card-title> Generar codigo de registro </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/*import AppUsersForm from "../../components/app_users/AppUsersCreateUpdateForm";*/
/*import ConfirmDialog from "../../components/ConfirmDialog.vue";*/
import AppUsersController from "../../controllers/app_users/AppUsersController";
import { useAuthStore } from "../../store/auth/AuthStore"
/*import Dropdown from "../../components/dropdowns/Drowdown-1.vue";*/
import Paginator from "../../components/utils/Paginator";
import PaginatorInfo from "../../components/utils/PaginatorInfo.vue";
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
      max_buttons: 3,
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
    ],
  }),
  async mounted() {
    this.items = await this.list();
    console.log(this.items);
  },
  methods: {
    async createUser() {
      this.new_user.rol = "Admin";
      let store = await useAuthStore().getAuth();
      let aux_new_user = {
        logged_user_id: store.user_id,
        rol: this.new_user.rol,
      };

      AppUsersController.users.createUser(aux_new_user);
    },

    showAppUserInfo(item) {
      this.selected_item = item;
      this.dialog.is_displayed = true;
      this.dialog.mode = "app_user_details";
    },
    async onChangePage(page) {
      this.paginator.current_page = page;
      /*this.items = await this.list();*/
      this.paginator.key++;
    },
    async list() {
      let response = await AppUsersController.list(
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
        return response.data.data.list_users.filter(user => user.role == 1);
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
      this.items = await this.list();
    },
  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
