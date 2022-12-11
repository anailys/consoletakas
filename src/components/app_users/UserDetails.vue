<template>
  <v-card id="user-detail-modal-container">
    <v-card-title class="justify-center">
      Perfil de {{ user.name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-8">
      <v-row>
        <v-col cols="4">
          <v-img :src="user.profile_picture"></v-img>
        </v-col>
        <v-col cols="8">
          <p><b>Fecha de registro:</b> {{ user.register_date }}</p>
          <p><b>Ubicación:</b> {{ user.location }}</p>
          <p><b>Teléfono:</b> {{ user.phone }}</p>
          <p><b>Email:</b> {{ user.email }}</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text align="center" class="mt-5">
      <v-tabs v-model="tab" dark centered>
        <v-tabs-slider color="green"></v-tabs-slider>

        <v-tab :key="'takasting'"> Takas </v-tab>        
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="'takasting'">
          <v-card flat>
            <v-card-text>
              <v-btn
                color="black"
                small
                class="mx-1"
                @click="
                  $router.push('/users/' + user.id + '/' + 'takas/publications')
                "
              >
                <span class="green-text">Publicaciones</span>
              </v-btn>
              <v-btn
                color="black"
                small
                class="mx-1"
                @click="$router.push('/users/' + user.id + '/takas/takasting')"
              >
                <span class="green-text">Takasteos</span>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="'servitakasting'">
          <v-card flat>
            <v-card-text> Incomming ;)</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="'Turistakasting'">
          <v-card flat>
            <v-card-text> Incomming ;)</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import AppUsersController from "../../controllers/app_users/AppUsersController.js";
export default {
  props: ["appUser"],
  data: () => ({
    tab: null,
    user: {
      id: "",
      name: "",
      register_date: "",
      location: "",
      email: "",
      profile_picture: "",
      phone: "",
    },
    buttons: [
      { name: "Takasteos", business_unit: "takasting" },
      { name: "Subastas", business_unit: "subastakasteos" },
      { name: "Dinamicas", business_unit: "dinamitakasteos" },
      { name: "Turismo", business_unit: "turistakasteos" },
    ],
  }),
  mounted() {
    console.log(this.appUser);
    this.setUserInfo(this.appUser);
  },
  methods: {
    setUserInfo(app_user) {
      this.user = AppUsersController.setUserInfo(app_user);
    },
  },
};
</script>

<style scoped>
#user-detail-modal-container {
  height: 80vh;
}
</style>