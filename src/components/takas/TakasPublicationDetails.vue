<template>
  <div>
    <v-card v-if="loaded">
      <v-card-title>Detalles de: {{ requested_publication.name }}</v-card-title>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="12">
              <v-carousel hide-delimiters>
                <v-carousel-item
                  v-for="(images, i) in requested_publication.ProductImages"
                  :key="i"
                  :src="images"
                >
                  <div
                    class="ma-2"
                    style="
                      border: 2px solid white;
                      float: left;
                      padding: 8px;
                      border-radius: 18px 18px 18px 18px;
                      color: white;
                    "
                    :style="
                      requested_publication.status == 'Activa'
                        ? 'background:#66BB6A'
                        : 'background:#E57373'
                    "
                  >
                    {{ requested_publication.status }}
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="6">
              <p><b> Detalles: </b>{{ publication.details }}</p>
            </v-col>

            <v-col cols="6" class="my-0 pb-0">
              <p><b>Preferencias:</b></p>
              <ul>
                <li
                  v-for="(preference, i) in requested_publication.Preferences"
                  :key="'preference_' + i"
                >
                  {{ preference }}
                </li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Condiciones:</b> N/A</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Fecha de creación:</b>
                {{ requested_publication.datecreated }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Editable:</b>
                {{ requested_publication.editable ? "Sí" : "No" }}
              </p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Ubicación:</b> {{ requested_publication.location }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Valor comercial:</b> $
                {{ requested_publication.marketvalue }}
              </p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>¿Es nuevo?:</b>
                {{ requested_publication.nuevo ? "Sí" : "No" }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Tamaño:</b> {{ requested_publication.size }}</p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Subcategoría:</b> {{ requested_publication.subcategory }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Tipo de moneda:</b> {{ requested_publication.typemoney }}
              </p>
            </v-col>
            <v-col cols="6" class="my-0 pb-0">
              <p>
                <b>Tipo de publicación:</b>
                {{ requested_publication.typepublication }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="my-0 pb-0">
              <p><b>Peso:</b> N/A</p>
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
  </div>
</template>
<script>
import TakasController from "../../controllers/takas/TakasController";
export default {
  name: "TakasPublicationDetails",
  props: ["publication"],
  data: () => ({
    requested_publication: null,
    loaded: false,
  }),
  mounted() {
    this.setPublication();
  },
  methods: {
    async setPublication() {
      let response = await TakasController.getSinglePublication(
        this.publication.id
      );
      if (!response.status == 200) return;
      if (!response.data.data.length > 0) return;
      console.log(response.data.data[0]);
      this.requested_publication = response.data.data[0];
      console.log(this.requested_publication);
      this.loaded = true;
    },
  },
};
</script>
