<template>
    <v-container>
        <v-row class="mt-8">
            <v-col cols="10" offset="1">
                <v-card>
                    <v-card-title class="justify-center">Mi perfil</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text align="center">
                        <v-img
                            src="@/assets/default_profile.png"
                            width="200"
                            height="200"
                        ></v-img><br>
                        <v-divider></v-divider>
                        <v-text-field label="Nombre" v-model="name"></v-text-field><br>
                        <v-text-field label="Apellido" v-model="lastname"></v-text-field><br>
                        <v-text-field label="Username" v-model="username"></v-text-field><br>
                        <v-btn
                            outlined
                        >Guardar</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default {
    name:"UserProfile",
    mounted(){
        
    },
    data:() => ({
        name: 'Rommel Omar',
        lastname: 'Montoya Rodriguez',
        username: 'rommel_omr',
    })
}
</script>

