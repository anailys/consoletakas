<template>
  <v-container>
    <v-row>
      <v-col cols="8" offset="2">
        <h1 class="white--text">{{ module_config.plural_name }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8" offset="2">
        <v-simple-table dark class="background-one white--text">
        
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
                :key="'takasteoDetails_' + i"
              >
                <td>{{ item.idoffer }}</td>
                <td>{{ item.idpublucation }}</td>
                <td>{{ item.userpublication }}</td>
                <td>{{ item.fullname }}</td>
                <td>
                <div>
                  <Dropdown>
                    <template #options>
                      <div align="right">
                        <v-list>
                          
                          <v-list-item>
                            <v-list-item-title>
                              <v-btn @click="seeItem(item)">Detalles</v-btn>
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </div>
                    </template>
                  </Dropdown>            
                </div>
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
    <v-row> </v-row>
    <v-dialog v-model="dialog.is_displayed" width="500">
      <AppUsersForm
        v-if="dialog.mode == 'create' || dialog.mode == 'update'"
        :selected_item="selected_item"
        :moduleConfig="module_config"
        :dialog="dialog"
        @onCreate="onCreate"
        @onUpdate="onUpdate"
      />
      <ConfirmDialog
        v-if="dialog.mode == 'confirm'"
        @on:answer="confirmChangeState"
        :message="'¿Realmente desea eliminarl' + gender_sufix + '?'"
      />
      <TakastingsDetails
        v-if="dialog.mode == 'see'"
        :takasteoDetails="selected_item"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import AppUsersForm from "../../../components/app_users/AppUsersCreateUpdateForm";
import ConfirmDialog from "../../../components/ConfirmDialog.vue";
import TakasController from "../../../controllers/takas/TakasController";
import Dropdown from "../../../components/dropdowns/Drowdown-1.vue";
import Paginator from "../../../components/utils/Paginator";
import PaginatorInfo from "../../../components/utils/PaginatorInfo.vue";
import TakastingsDetails from "../../../views/app_users/takasting/TakastingsDetails.vue";

export default {
  components: {
    AppUsersForm,
    ConfirmDialog,
    Dropdown,
    // BasicPublicationCard,
    Paginator,
    TakastingsDetails,
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
    filter_by_active_items: true,
    module_config: {
      plural_name: "Takasteos",
      singular_name: "Takasteo",
      gender_title: "male",
    },
    dialog: {
      is_displayed: false,
      mode: "",
    },
    items: [],
    selected_item: {},
    selected_key: -1,
    table_header: [
      { text: "N° oferta" },
      { text: "N° Publicacion" },
      { text: "N° usuario" },
      { text: "Usuario que publica" },
      { text: "Opciones" },
    ],
  }),
  async mounted() {
    console.log(this.$route.params.user_id);
    this.items = await this.getUserTakastings({
      status: 1
    });
    console.log(this.items);
  },
  methods: {
    seeItem(item) {
      this.selected_item = item;
      this.openDialog("see");
    },
    async onChangePage(page) {
      this.paginator.current_page = page;
      this.items = await this.getUserTakastings({
      status: this.filter_by_active_items ? 1 : 5,
    });
      this.paginator.key++;
    },
    async getUserTakastings(params) {
      console.log(this.$route);
      let response = await TakasController.getTopTakastingsForUser(
        this.$route.params.user_id,
        this.paginator,
        this.searcher,
        params
      );
      if (response.status == 200) {
        console.log(response.data);
        this.paginator.current_page = response.data.data.current_page;
        this.paginator.items_per_page = response.data.data.items_per_page;
        this.paginator.total_items = response.data.data.total_items;
        this.paginator.total_pages = response.data.data.total_pages;
        this.paginator.key++;
        return response.data.data.top_taksteos.takasteos;
      } else {
        console.log(response);
        alert("Ha ocurrido un error inesperado");
      }
    },
    changeStatusItem(item, i) {
      this.selected_item = item;
      this.selected_key = i;
      if (this.publicationStatus) {
        this.openDialog("confirm");
      } else {
        this.confirmChangeState(true);
      }
    },
    async confirmChangeState(confirmed) {
      if (confirmed) {
        let response = await TakasController.changeStatus(this.selected_item);
        if (response.status == 200) {
          this.items.splice(this.selected_key, 1);
        }
      }
      this.dialog.is_displayed = false;
      this.closeDialog();
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
      this.cleanDialog();
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
      this.items = await this.list({
        status: this.filter_by_active_items,
      });
    },
    async filter_by_active_items() {
      this.paginator.current_page = 1;
      this.items = await this.list({
        status: this.filter_by_active_items ? 1 : 5,
      });
    },
  },
  computed: {
    gender_sufix() {
      return this.module_config.gender_title == "male" ? "o" : "a";
    },
    publicationStatus() {
      return this.selected_item.status == 1 ? true : false;
    },
  },
};
</script>
