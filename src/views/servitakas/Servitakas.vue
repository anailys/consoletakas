<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title class="d-flex justify-center">
                [LOGO SERVITAKAS]
            </v-card-title>
        </v-card>
        <center>
            <p class="white--text mb-4"><b>¿Qué desea consultar?</b></p>
        </center>
        <v-row>
            <v-col cols="12" md="3" offset-md="3"
            >
                <v-card
                    @click="$router.push('/servitakas/categories')"
                >
                    <v-img src="https://cdn.pixabay.com/photo/2012/04/11/15/52/hammer-28636_960_720.png"></v-img>
                    <v-card-title class="d-flex justify-center">
                        Servicios
                    </v-card-title>
                </v-card>
            </v-col>
            
            <v-col cols="12" md="3"
            >
                <v-card
                    @click="$router.push('/servitakas/profiles')"
                >
                    <v-img src="https://cdn.pixabay.com/photo/2012/04/11/15/52/hammer-28636_960_720.png"></v-img>
                    <v-card-title class="d-flex justify-center">
                        Perfiles
                    </v-card-title>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'Servitakas',
        mounted(){
            
        }
    }
</script>