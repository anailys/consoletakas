<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ module_config.plural_name }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="searcher"
          background-color="white"
          :label="'Buscar ' + module_config.singular_name.toLowerCase()"
          rounded
          filled
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="10" class="d-flex flex-row-reverse">
        <v-switch
          v-model="filter_by_active_items"
          dark
          :label="`${filter_by_active_items ? 'Habilitadas' : 'Inhabilitadas'}`"
        ></v-switch>
      </v-col>
      <!--v-col cols="6" align="right">
        <v-btn @click="openDialog('create')"
          >Nuev{{ gender_sufix }}
          {{ module_config.singular_name.toLowerCase() }}</v-btn
        >
      </v-col-->
    </v-row>

    <v-row>
      <v-col
        md="6"
        lg="3"
        cols="12"
        v-for="(item, i) in items"
        :key="'publication_' + i"
      >
        <BasicPublicationCard :publication="item">
          <v-row class="pb-0">
            <v-col cols="6" class="pb-0">
              <v-chip
                class="ma-2"
                :color="item.status == 1 ? 'light-green ' : 'deep-orange'"
                text-color="white"
              >
                {{ item.status == 1 ? "Activa" : "Deshabilitada" }}
              </v-chip>
            </v-col>
            <v-col cols="6" class="pb-0">
              <div align="right">
                <Dropdown class="pa-0 ma-0">
                  <template #options>
                    <div align="right">
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>
                            <v-btn @click="seeItem(item)">Detalles</v-btn>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-btn
                              @click="changeStatusItem(item, i)"
                              text
                              small
                              >{{
                                item.status == 1 ? "inhabilitar" : "habilitar"
                              }}</v-btn
                            >
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </v-col>
          </v-row>
        </BasicPublicationCard>
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
      <TakasPublicationDetails
        v-if="dialog.mode == 'see'"
        :publication="selected_item"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import AppUsersForm from "../../../components/app_users/AppUsersCreateUpdateForm";
import ConfirmDialog from "../../../components/ConfirmDialog.vue";
import TakasController from "../../../controllers/takas/TakasController";
import Dropdown from "../../../components/dropdowns/Drowdown-1.vue";
import BasicPublicationCard from "../../../components/publications/BasicPublicationCard.vue";
import Paginator from "../../../components/utils/Paginator";
import PaginatorInfo from "../../../components/utils/PaginatorInfo.vue";
import TakasPublicationDetails from "../../../components/takas/TakasPublicationDetails.vue";

export default {
  components: {
    AppUsersForm,
    ConfirmDialog,
    Dropdown,
    BasicPublicationCard,
    Paginator,
    TakasPublicationDetails,
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
      plural_name: "Publicaciones",
      singular_name: "Publicacion",
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
      { text: "Nombre" },
      { text: "Estado" },
      { text: "Opciones" },
    ],
  }),
  async mounted() {
    this.items = await this.list({
      status: this.filter_by_active_items ? 1 : 5,
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
      this.items = await this.list();
      this.paginator.key++;
    },
    async list(params) {
      console.log(this.$route);
      let response = await TakasController.getPublications(
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
        return response.data.data.list_publications.publicatinos;
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
