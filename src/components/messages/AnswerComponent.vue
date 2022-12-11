<template>
  <div>
    <v-card >
    <v-card-text>
      <b>Mensaje:</b> <br />
      {{ message.details }}
      <v-divider></v-divider>
      <br />
      <v-textarea
        outlined
        name="input-7-4"
        label="Respuesta"
        v-model="response_data.detailsPQRs"
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="send" block outlined> Enviar </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
import StorageController from "../../controllers/StorageController";
import AdministrationController from "../../controllers/administration/AdministrationController";

export default {
  name: "AnswerComponent",
  props: ["message"],
  data: () => ({
    response_data: {
      idPQRs: 0,
      idfirebaseUser: "",
      detailsPQRs: "",
      flagPQRs: "2"
    },
  }),
  async mounted() {
    let _storage = await StorageController.useStorage("auth");
    
    this.response_data.idPQRs = this.message.id;
    this.response_data.idfirebaseUser = _storage.name;
    
    
  },
 
  watch: {
    message: (value) => {
      console.log(value);
    },
  },
  methods: {

    async send() {
      let response = await AdministrationController.responsePqrs(
        this.response_data
      );
      if (response.status == 200) {
        this.$emit("onSend", {
        });
      } else {
        alert("notificar error");
      }
      console.log(response);
    },
  },
};
</script>