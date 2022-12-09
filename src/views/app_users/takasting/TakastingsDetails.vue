<template>
  <div>
    <v-card v-if="loaded">
      <v-card-title>Detalle takasteo</v-card-title>
      <v-card-text>
        <div>         
          <v-row class="mt-0">
            <v-col cols="6">
              <p><b> N° usuario oferta : </b>{{ response_data.offer }}</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p><b> Usuario oferta: </b>{{ response_data.user_offer }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b> N° oferta : </b>{{ response_data.id_offer }}</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p><b> Producto oferta : </b>{{ response_data.product_offer }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b> N° publicación : </b>{{ response_data.id_publication }}</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p><b> Usuario publica : </b>{{ response_data.user_publication }}</p>             
            </v-col>
          </v-row>              
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Publicación : </b>{{ response_data.publication }}</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Detalle producto:  
              <v-btn icon @click="seeItem(response_data.id_publication)">
                <v-icon medium color="black">
                  mdi-archive-eye
                </v-icon></v-btn>   
              </b></p>          
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <div v-else>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </div>
    <v-dialog v-model="dialog.is_displayed" width="500">
      <TakasPublicationDetails
        v-if="dialog.mode == 'see'"
        :publication="selected_item"
      />
    </v-dialog>
  </div>
</template>
<script>
import TakasController from "../../../controllers/takas/TakasController";
import TakasPublicationDetails from "../../../components/takas/TakasPublicationDetails.vue";
export default {
  name: "TakastingsDetails",
  props: ["takasteoDetails"],
  components: {
    TakasPublicationDetails
  },
  data: () => ({
    response_data: null,
    loaded: false,
    selected_item: {
      id: null
    },
    dialog: {
      is_displayed: false,
      mode: "",
    }
  }),
  mounted() {
    this.setTakasteoDetails();
  },
  methods: {
    async setTakasteoDetails() {
      let response = await TakasController.getMatchdetail(
        this.takasteoDetails.idoffer
      );
      if (!response.status == 200) return;
      if (!response.data.detail_taksteo.length > 0) return;
      console.log(response.data.detail_taksteo[0]);
      this.response_data = response.data.detail_taksteo[0];
      console.log(this.response_data);
      this.loaded = true;
    },    
    seeItem(item) {
      this.selected_item.id = item;
      this.openDialog("see");
    },
    openDialog(mode) {
      this.dialog.is_displayed = true;
      this.dialog.mode = mode;
    },
  },
  watch: {
    "dialog.is_displayed"(is_displayed) {
      !is_displayed ? this.cleanDialog() : null;
    }
  }
};
</script>
