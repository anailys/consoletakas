<!--script>
// import { computed, onMounted, reactive, ref, watch } from "vue-demi";

// const props = defineProps({
//   itemsPerPage: {
//     type: Number,
//     required: true,
//     default: 10,
//   },

//   maxButtons: {
//     type: Number,
//     required: true,
//     default: -1,
//   },

//   totalItems: {
//     type: Number,
//     required: true,
//     default: -1,
//   },

//   totalPages: {
//     type: Number,
//     required: true,
//     default: -1,
//   },

//   currentPage: {
//     type: Number,
//     required: true,
//     default: -1,
//   },
// });

// let side_buttons = reactive({
//   left: 0,
//   right: 0,
// });

// const createSideButtonArray = (buttons_count, invert) => {
//   let arr = [];
//   if (invert) {
//     for (
//       let i = props.currentPage - buttons_count;
//       i < props.currentPage;
//       i++
//     ) {
//       arr.push(i);
//     }
//   } else {
//     for (
//       let i = props.currentPage + 1;
//       i <= props.currentPage + buttons_count;
//       i++
//     ) {
//       arr.push(i);
//     }
//   }
//   return arr;
// };

// const calculateSideButtons = () => {
//   let more_pages_than_buttons = props.maxButtons < props.totalPages;
//   if (more_pages_than_buttons) {
//     let n = props.currentPage - Math.ceil(props.maxButtons / 2);
//     if (n <= 0) {
//       let right_buttons_count = Math.floor(props.maxButtons / 2) - n;
//       let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 + n;

//       side_buttons.right = createSideButtonArray(right_buttons_count, false);
//       side_buttons.left = createSideButtonArray(left_buttons_count, true);
//     } else {
//       let m =
//         props.totalPages -
//         (props.currentPage + Math.floor(props.maxButtons / 2));

//       if (m <= 0) {
//         let right_buttons_count = m + Math.floor(props.maxButtons / 2);
//         let left_buttons_count = Math.ceil(props.maxButtons / 2) - 1 - m;

//         side_buttons.right = createSideButtonArray(right_buttons_count, false);
//         side_buttons.left = createSideButtonArray(left_buttons_count, true);
//       } else {
//         let right_buttons_count = Math.ceil(props.maxButtons / 2) - 1;
//         let left_buttons_count = Math.floor(props.maxButtons / 2);
//         side_buttons.right = createSideButtonArray(right_buttons_count, false);
//         side_buttons.left = createSideButtonArray(left_buttons_count, true);
//       }
//     }
//   }
// };

// const onChangePage = (page) => {
//   emit("onChangePage", page);
// };

// const emit = defineEmits(["onChangePage"]);

// const showLeftArrows = computed(() => {
//   let more_pages_than_buttons = props.maxButtons < props.totalPages;
//   let exist_pages_before = Math.ceil(props.maxButtons / 2) < props.currentPage;

//   return exist_pages_before && more_pages_than_buttons;
// });

// const showRightArrows = computed(() => {
//   let more_pages_than_buttons = props.maxButtons < props.totalPages;
//   let exist_pages_after =
//     props.currentPage + Math.floor(props.maxButtons / 2) < props.totalPages;

//   return exist_pages_after && more_pages_than_buttons;
// });

// const buttons = computed(() => {
//   if (props.maxButtons >= props.totalPages) {
//     let aux_array = [];
//     for (let i = 1; i <= props.totalPages; i++) {
//       aux_array.push(i);
//     }
//     return aux_array;
//   } else {
//     return [props.currentPage];
//   }
// });

// const leftButtons = computed(() => {
//   let more_pages_than_buttons = props.maxButtons < props.totalPages;
//   if (more_pages_than_buttons) {
//     return [0, 1, 2, 3];
//   } else {
//     return [];
//   }
// });

// onMounted(() => {
//   calculateSideButtons();
// });
</script-->
<template>
  <div id="paginator-container">
    <div align="center" class="page-item" v-if="showLeftArrows">
      <div @click="onChangePage(1)">
        <v-icon>mdi-page-first</v-icon>
      </div>
    </div>
    <div align="center" class="page-item" v-if="showLeftArrows">
      <div @click="onChangePage(currentPage - 1)">
        <!--ChevronLeftIcon class="w-4 h-4" /-->
        <v-icon>mdi-chevron-left</v-icon>
      </div>
    </div>
    <div
      align="center"
      class="page-item"
      v-for="i in side_buttons.left"
      :key="i"
    >
      <div @click="onChangePage(i)">{{ i }}</div>
    </div>
    <div
      align="center"
      class="page-item"
      :class="[currentPage == j && 'active']"
      v-for="j in buttons"
      :key="j"
    >
      <div @click="onChangePage(j)">{{ j }}</div>
    </div>
    <div
      align="center"
      class="page-item"
      v-for="k in side_buttons.right"
      :key="k"
    >
      <div @click="onChangePage(k)">{{ k }}</div>
    </div>
    <div align="center" class="page-item" v-if="showRightArrows">
      <div @click="onChangePage(currentPage + 1)">
        <!--ChevronRightIcon class="w-4 h-4"  /-->
        <v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>
    <div align="center" class="page-item" v-if="showRightArrows">
      <div @click="onChangePage(totalPages)">
        <!--ChevronsRightIcon class="w-4 h-4"  /-->
        <v-icon>mdi-page-last</v-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paginator",
  props: [
    "itemsPerPage",
    "maxButtons",
    "totalItems",
    "totalPages",
    "currentPage",
  ],
  data: () => ({
    side_buttons: {
      left: 0,
      right: 0,
    },
  }),
  mounted() {
    this.calculateSideButtons();
  },
  computed: {
    showLeftArrows() {
      let more_pages_than_buttons = this.maxButtons < this.totalPages;
      let exist_pages_before =
        Math.ceil(this.maxButtons / 2) < this.currentPage;

      return exist_pages_before && more_pages_than_buttons;
    },
    showRightArrows() {
      let more_pages_than_buttons = this.maxButtons < this.totalPages;
      let exist_pages_after =
        this.currentPage + Math.floor(this.maxButtons / 2) < this.totalPages;

      return exist_pages_after && more_pages_than_buttons;
    },
    buttons() {
      if (this.maxButtons >= this.totalPages) {
        let aux_array = [];
        for (let i = 1; i <= this.totalPages; i++) {
          aux_array.push(i);
        }
        return aux_array;
      } else {
        return [this.currentPage];
      }
    },
    leftButtons() {
      let more_pages_than_buttons = this.maxButtons < this.totalPages;
      if (more_pages_than_buttons) {
        return [0, 1, 2, 3];
      } else {
        return [];
      }
    },
  },
  watch: {},
  methods: {
    createSideButtonArray(buttons_count, invert) {
      let arr = [];
      if (invert) {
        for (
          let i = this.currentPage - buttons_count;
          i < this.currentPage;
          i++
        ) {
          arr.push(i);
        }
      } else {
        for (
          let i = this.currentPage + 1;
          i <= this.currentPage + buttons_count;
          i++
        ) {
          arr.push(i);
        }
      }
      return arr;
    },
    calculateSideButtons() {
      let more_pages_than_buttons = this.maxButtons < this.totalPages;
      if (more_pages_than_buttons) {
        let n = this.currentPage - Math.ceil(this.maxButtons / 2);
        if (n <= 0) {
          let right_buttons_count = Math.floor(this.maxButtons / 2) - n;
          let left_buttons_count = Math.ceil(this.maxButtons / 2) - 1 + n;

          this.side_buttons.right = this.createSideButtonArray(
            right_buttons_count,
            false
          );
          this.side_buttons.left = this.createSideButtonArray(
            left_buttons_count,
            true
          );
        } else {
          let m =
            this.totalPages -
            (this.currentPage + Math.floor(this.maxButtons / 2));

          if (m <= 0) {
            let right_buttons_count = m + Math.floor(this.maxButtons / 2);
            let left_buttons_count = Math.ceil(this.maxButtons / 2) - 1 - m;

            this.side_buttons.right = this.createSideButtonArray(
              right_buttons_count,
              false
            );
            this.side_buttons.left = this.createSideButtonArray(
              left_buttons_count,
              true
            );
          } else {
            let right_buttons_count = Math.ceil(this.maxButtons / 2) - 1;
            let left_buttons_count = Math.floor(this.maxButtons / 2);
            this.side_buttons.right = this.createSideButtonArray(
              right_buttons_count,
              false
            );
            this.side_buttons.left = this.createSideButtonArray(
              left_buttons_count,
              true
            );
          }
        }
      }
    },
    onChangePage(page) {
      this.$emit("onChangePage", page);
    },
  },
};
</script>
<style scoped>
.page-item {
  float: left;
  width: 35px;
  height: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 10px;
  background: white;
  border-radius: 12px 12px 12px 12px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px grey;
}
#paginator-container {
  display: flex;
}
</style>