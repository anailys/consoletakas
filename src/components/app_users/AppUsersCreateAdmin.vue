<template>
  <v-card>
    <v-card-title>
      Registro
    </v-card-title>
    <v-divider class="mb-8"> </v-divider>
    <v-card-text>
       <v-row >
        <v-col cols="10" offset="1">
          <v-text-field
            label= "CODIGO"
            placeholder="Texto"
            outlined
            v-model="modal_form_data.codeAdmin"
          ></v-text-field> 
        </v-col>
        </v-row>
      <v-row >
        <v-col cols="10" offset="1">
          <v-text-field
            label= "Nombre usuario"
            placeholder="Texto"
            outlined
            v-model="modal_form_data.userAdmin"
          ></v-text-field> 
        </v-col>
        </v-row>
        <v-row >
        <v-col cols="10" offset="1">
          <v-text-field
            label= "Email"
            placeholder="Texto"
            outlined
            v-model="modal_form_data.emailAdmin"
          ></v-text-field> 
        </v-col>
        </v-row>
        <v-row >
        <v-col cols="10" offset="1">
          <v-text-field
            :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
            label= "Contraseña"
            placeholder="Texto"
            :type="eye ? 'text' : 'password'"
            outlined
            v-model="modal_form_data.passwordAdmin"
            @click:append="eye = !eye"
          ></v-text-field> 
        </v-col>
        </v-row>
        <v-row >
        <v-col cols="10" offset="1">
          <v-text-field
            label= "Celular"
            placeholder="Texto"
            outlined
            v-model="modal_form_data.numberPhoneAdmin"
          ></v-text-field> 
        </v-col>
        </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="submit"
            style="float: right"
            color="black"
            :disabled="!button_enabled"
          >
            <span class="green-text">Registrarse</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import AuthController from "../../controllers/auth/AuthController";
export default {
  name: "AppUsersCreateAdmin",  
  data: () => ({
    button_enabled: true,
    modal_form_data: {
      codeAdmin: "",
      userAdmin: "",
      emailAdmin: "",
      passwordAdmin: "",
      numberPhoneAdmin: ""
    },
    eye: false
  }),
  methods: {
    async submit() {     

        await this.createUserAdmin();      
    },

    async createUserAdmin() {
      let response = await AuthController.createUserAdmin(this.modal_form_data);
      console.log(response);
      if (response.data.status == 200) {
        this.$emit("onCreate", {
        });
      } else {
        alert("notificar error");
      }
    }
  },
  computed: {
    gender_sufix() {
      return this.moduleConfig.gender_title == "male" ? "o" : "a";
    },
  },
};
</script>
