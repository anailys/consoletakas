<template>
  <div class="">
    <v-menu left :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <slot name="options"></slot>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>