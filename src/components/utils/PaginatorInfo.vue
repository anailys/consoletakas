<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div align="center">
            <div>
              Página {{ paginator.current_page }} de {{ paginator.total_pages }}
            </div>
            <div>
              Resultados: {{ results_from + " - " + results_to }} de
              {{ paginator.total_items }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "PaginatorInfo",
  props: ["paginator"],
  data: () => ({
    results_from: 0,
    results_to: 0,
  }),
  mounted() {
    this.results_from =
      (this.paginator.current_page - 1) * this.paginator.items_per_page + 1;
    this.results_to =
      this.paginator.current_page * this.paginator.items_per_page;
    let is_last_page =
      this.paginator.current_page == this.paginator.total_pages;
    if (is_last_page) {
      this.results_to -=
        this.paginator.total_pages * this.paginator.items_per_page -
        this.paginator.total_items;
    }
  },
};
</script>
