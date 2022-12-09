<template>
  <v-container>
    <v-row class="mt-8">
      <v-col cols="8" offset="2">
        <v-card>
          <v-card-title class="justify-center">
            Perfil de {{ user.name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-img src="@/assets/default_profile.png"></v-img>
              </v-col>
              <v-col cols="8">
                <span v-for="(info, i) in user.info" :key="'info_' + i">
                  <b>{{ i }}:</b> {{ info }}<br />
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text align="center">
            <v-btn
              v-for="(button, i) in buttons"
              :key="'button_' + i"
              color="black"
              class="mx-2"
              @click="$router.push('/users/activity/' + button.route)"
            >
              <span class="green-text">{{ button.name }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  mounted() {
    this.user.name = "Rommel Montoya";
    this.user.info["Fecha de registro"] = "16-01-2022";
    this.user.info["Ubicación"] = "Bogotá";
    this.user.info["Email"] = "rommelmontoya97@gmail.com";
    this.user.info["Teléfono"] = "123456789";
  },
  data: () => ({
    user: {
      name: "",
      info: {
        "Fecha de registro": "",
        Ubicación: "",
        Email: "",
        Teléfono: "",
      },
    },
    buttons: [
      { name: "Takasteos", route: "takasteos" },
      { name: "Subastas", route: "subastakasteos" },
      { name: "Dinamicas", route: "dinamitakasteos" },
      { name: "Turismo", route: "turistakasteos" },
    ],
  }),
};
</script>

