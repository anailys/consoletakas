<template>
  <v-container>
    <v-row v-if="!services_is_selected">
      <v-col>
        <v-row class="text-center">
          <v-col cols="12">
            <v-img
              :src="require('../assets/isotipo.png')"
              class="my-3"
              contain
              height="200"
            />
            
          </v-col>

          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3 white--text">
              {{msg}}
            </h1>
            <p class="display-1 font-weight-bold mb-3 white--text">¿Qué deseas hacer?</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn
              class="ma-2"
              color="white"
              outlined
              large
              @click="$router.push('/users/my-profile')"
            >
              Ver mi perfil
            </v-btn>
            <v-btn
              class="ma-2"
              color="white"
              outlined
              large
              @click="$router.push('/administration/audits')"
            >
              Auditar consola
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: ['msg'],
    data: () => ({
      services_is_selected: false
    }),
    mounted(){
      
    }
  }
</script>
