<template>
  <v-dialog v-model="visible" width="300" persistent>
    <v-card class="pa-8">
      <v-card-text>
        <center>
          Cargando
          <br />
          <v-progress-circular
            class="mt-5"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </center>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Loading",
  data: () => ({
    visible: true,
  }),
};
</script>