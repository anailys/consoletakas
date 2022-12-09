<template>
  <div class="home">
    <wellcome msg="Bienvenido a Takas Web Console"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Wellcome from '@/components/Wellcome.vue'

export default {
  name: 'Wellcome',
  components: {
    wellcome: Wellcome
  }
}
</script>
