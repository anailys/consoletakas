<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title class="d-flex justify-center">
                [LOGO SERVITAKAS]
            </v-card-title>
        </v-card>
        <center>
            <p class="white--text mb-4"><b>PERFILES</b></p>
        </center>
        <v-row>
            <v-col cols="6">
                <v-list>
                    <div
                        v-for="(profile,i) in profiles"
                        :key="'profile_'+i"
                    >
                        <v-list-item link @click="profile_index = i">
                            <v-list-item-title>{{profile.name}}</v-list-item-title>
                            <v-list-item-icon><v-icon @click="removeProfile(i)">mdi-delete</v-icon></v-list-item-icon>
                        </v-list-item>
                        
                        <v-divider></v-divider>
                    </div>
                </v-list>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <div v-if="profiles.length > 0">
                        <v-card-title>{{profiles[profile_index].name}}
                        </v-card-title>
                        <v-card-text>
                            <b>Me interesa:</b> {{profiles[profile_index].reactions}} <br>
                            <b>Vistas al perfil:</b> {{profiles[profile_index].profile_views}} <br>
                            <b>Servicios ofrecidos:</b> {{profiles[profile_index].offered_services}} <br>
                            <b>Descripción:</b> {{profiles[profile_index].description}} <br>
                            <b>Hoja de vida:</b> {{profiles[profile_index].curriculum}} <br>
                        </v-card-text>
                    </div>
                    <div v-else>
                        Cargando
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'ServitakasProfiles',
        mounted(){
            let data = this.loadData()
            this.profiles = data.profiles;
        },
        methods:{
            removeProfile(i){
                this.profiles.splice(i,1);
            },
            loadData(){

                return {
                    profiles: [
                        {
                            name:'person one',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 5,
                            profile_views: 200,
                            offered_services: 12
                            
                        },
                        {
                            name:'person two',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 9,
                            profile_views: 350,
                            offered_services: 99
                            
                        },
                        {
                            name:'person three',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 0,
                            profile_views: 79,
                            offered_services: 35
                            
                        },
                        {
                            name:'person four',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 17,
                            profile_views: 99,
                            offered_services: 35
                            
                        },
                        {
                            name:'person five',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 39,
                            profile_views: 529,
                            offered_services: 200
                            
                        },
                        {
                            name:'person six',
                            description: 'texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto ',
                            curriculum: '[descargar]',
                            reactions: 21,
                            profile_views: 76,
                            offered_services: 99
                            
                        },
                    ]
                }
            }
        },
        data: () => ({
            profiles: [],
            profile_index: 0,
            selected_person: {
                name: '',
                reactions: '',
                profile_views: '',
                offered_services: ''
            }
        })
    }
</script>