<template>
  <div>
    <v-card-text>
      <b>Mensaje:</b> <br />
      {{ message.details }}
      <v-divider></v-divider>
      <br />
      <v-textarea
        outlined
        name="input-7-4"
        label="Respuesta"
        v-model="response_data.message"
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="send" block outlined> Enviar </v-btn>
    </v-card-actions>
  </div>
</template>

<script setup>
import StorageController from "../../controllers/StorageController";
import AdministrationController from "../../controllers/administration/AdministrationController";

export default {
  name: "AnswerComponent",
  data: () => ({
    response_data: {
      pqrs_id: 0,
      user_id: "",
      message: "",
    },
  }),
  async mounted() {
    let _storage = await StorageController.useStorage("auth");
    this.response_data.user_id = _storage.user_id;
  },
  props: ["message", "messageClicked"],
  watch: {
    message: (value) => {
      console.log(value);
    },
  },
  methods: {
    async loadData() {
      this.response_data.pqrs_id = this.message.id;
    },
    async send() {
      let response = await AdministrationController.pqrs.responsePqrs(
        this.response_data
      );
      console.log(response);
    },
  },
};
</script>