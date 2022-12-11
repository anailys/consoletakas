<template>
  <v-container>
    <v-row class="mt-6">
      
      <v-col cols="8" offset="2" class="">
        <v-row class="mb-2">
          <v-col cols="12">
            <v-card class="background-one">
              <v-card-title
                ><h4 class="font-weight-bold white--text">
                  <div align="center">Top takasteos</div>
                </h4></v-card-title
              >
              <v-divider></v-divider>
              <v-card-text>
                <v-simple-table dark class="background-one white--text">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="white--text text-left">Nombre</th>
                        <th class="white--text text-right">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in top_takasting_items"
                        :key="'interested_' + i"
                      >
                        <td>{{ item.fullname }}</td>
                        <td class="text-right">
                          <a
                            class="white--text"
                            :href="
                              '/users/' +
                              item.userpublication +
                              '/takas/takasting'
                            "
                            >Ver takasteos</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
         
        </v-row>
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
import TakasController from "../../controllers/takas/TakasController";
import Paginator from "../../components/utils/Paginator";
import PaginatorInfo from "../../components/utils/PaginatorInfo.vue";
export default {
  components: {
    Paginator,
    PaginatorInfo,
  },
  data: () => ({
    
    paginator: {
      key: 0,
      total_items: -1,
      max_buttons: 1,
      current_page: 1,
      total_pages: -1,
      items_per_page: 2,
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
    top_takasting_items: [],
    selected_item: {},
    selected_key: -1,
    table_header: [
      { text: "Nombre" },
      { text: "Estado" },
      { text: "Opciones" },
    ],
  }),
  async mounted() {
    this.top_takasting_items = await this.getTopTakastings({ status: 1 });
  },
  methods: {
    seeItem(item) {
      this.selected_item = item;
      this.openDialog("see");
    },
    async getTopTakastings(params) {
      let response = await TakasController.getTopTakastings(
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
    async onChangePage(page) {
      this.paginator.current_page = page;
      this.items = await this.list();
      this.paginator.key++;
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
    }
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