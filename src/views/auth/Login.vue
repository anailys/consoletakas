<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="6" offset="3" align="center">
        <v-card>
          <v-card-title class="justify-center">Inicio de Sesión</v-card-title>
          <v-card-text>
            <form @keyup.enter="attemptLogin">
              <v-text-field
                v-model="credentials.username"
                label="Usuario"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="credentials.password"
                label="Contraseña"
                outlined
              ></v-text-field>
              <v-btn
                color="black"
                :disabled="button_disabled"
                @click="attemptLogin"
              >
                <span class="green-text">Entrar</span>
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Loading v-if="loading" />
  </v-container>
</template>
<script>
import Loading from "../../components/Loading.vue";

import AuthController from "../../controllers/auth/AuthController";
import Cookies from "js-cookie";



export default {
  name: "Login",
  
  data: () => ({
    credentials: {
      username: "",
      password: "",
    },
    button_disabled: false,
    loading: false,
  }),
  components: {
    Loading,
  },
  mounted() {},
  methods: {
    attemptLogin() {
      if (!AuthController.validateCredentials(this.credentials)) {
        this.$notify({
          type: "takas-error",
          group: "general",
          title: "Error:",
          text: "Debe llenar los campos para iniciar sesión",
        });
        return;
      }

      this.button_disabled = true;
      this.loading = true;
      this.requestLogin();
    },
    async requestLogin() {
      let response = await AuthController.login(this.credentials);
      console.log(response);
      if (response.status == 200) {
        this.$notify({
          type: "takas",
          group: "general",
          title: "Bienvenido",
        });
        console.log("ERRROR")
        await Cookies.set("username", this.credentials.username);
        console.log(Cookies.get("username"))
        this.$router.push("/");
      } else {
        this.$notify({
          type: "takas-error",
          group: "general",
          title: "Ha ocurrido un error",
          text: response.data.msg,
        });
        this.button_disabled = false;
        this.loading = false;
      }
    },
  },
};
</script>
