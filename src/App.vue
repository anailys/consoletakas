<script>
import AuthController from "./controllers/auth/AuthController";
import Cookies from "js-cookie";
export default {
  name: "App",

  data: () => ({
    drawer: false,
    user_name: Cookies.get("username"),
    items: [
      {
        route: "/takas",
        name: "Takas",
      },
       {
        route: "/administration/PQRS",
        name: "PQRS",
      },
      {
        route: "/administration/categories",
        name: "Categorías",
      },
    ],
  }),

  mounted() {
    
    this.user_name = Cookies.get("username");
  },
  methods: {
    async logout() {
      this.$notify({
        type: "takas",
        group: "general",
        title: "Hasta luego",
      });
      await AuthController.logout();    
      await Cookies.remove('username');  
      this.$router.push("/login");
    },
  },
};
</script>
<template>
  <v-app>
    <v-app-bar app color="#05171D" dark v-if="!$route.meta.app_bar_is_hidden">
      <div class="d-flex align-center">
        <v-btn text @click="$router.push('/')">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/isotipo.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="@/assets/logotipo.png"
            width="100"
          />
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn text color="#39FE14" @click="drawer = true">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background: #04343c">
      <router-view />
    </v-main>

    <v-navigation-drawer app color="#05171D" v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/default_profile.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{
            user_name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider color="white"></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="white--text">SERVICIOS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="$router.push('/admin/administrators')">
        <v-list-item-content>
          <v-list-item-title class="white--text"
            >Administradores</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="$router.push('/admin/app-users')">
        <v-list-item-content>
          <v-list-item-title class="white--text"
            >Usuarios de la app</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, i) in items"
        :key="'item_' + i"
        link
        @click="$router.push(item.route)"
      >
        <v-list-item-content>
          <v-list-item-title class="white--text">{{
            item.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="logout()">
        <v-list-item-content>
          <v-list-item-title class="white--text"
            >Cerrar Sesión</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <notifications classes="notifications-style" group="general" />
  </v-app>
</template>
<style lang="scss">
.notifications-style {
  &.takas {
    display: block;
    box-sizing: border-box;
    text-align: left;
    font-size: 12px;
    padding: 10px;
    margin: 0 5px 5px;

    color: white;
    background: #05171d;
    border-left: 5px solid #39fe14;
    border-radius: 5px 5px 5px 5px;
  }
  &.takas-error {
    display: block;
    box-sizing: border-box;
    text-align: left;
    font-size: 12px;
    padding: 10px;
    margin: 0 5px 5px;

    color: rgb(30, 30, 30);
    background: #ff8181;
    border-left: 5px solid #ffffff;
    border-radius: 5px 5px 5px 5px;
  }
}
</style>

<style>
.green-text {
  color: #39fe14;
}
.background-one {
  background: #305a62 !important;
}
</style>