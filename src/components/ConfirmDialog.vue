<template>
  <v-card class="pa-4">
    <v-card-title class="d-block" align="center">
      {{ message }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-8">
      <center>
        <v-btn class="mx-4" @click="$emit('on:answer', true)" color="success"
          >Confirmar</v-btn
        >
        <v-btn class="mx-4" @click="$emit('on:answer', false)" color="error"
          >Cancelar</v-btn
        >
      </center>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ConfirmComponent",
  props: ["message"],
};
</script>