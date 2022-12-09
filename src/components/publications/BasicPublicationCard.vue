<template>
  <v-card>
    <v-card-title>{{ publication.name }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pb-0">
      <v-row>
        <v-col cols="12">
          <img class="publication_image" :src="publication.url" alt="" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <slot> </slot>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "BasicPublicationComponent",
  props: ["publication"],
};
</script>
<style scoped>
.publication_image {
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 8px 8px;
}
</style>