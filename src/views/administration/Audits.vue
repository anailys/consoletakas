<template>
    <v-container>
        <v-row class="mt-8">
            <v-col cols="10" offset="1">
                <v-card>
                    <v-card-title class="justify-center">Auditorias</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list dense>

                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Nombre de usuario - Accion - dd/mm/aaaa
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Nombre de usuario - Accion - dd/mm/aaaa
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Nombre de usuario - Accion - dd/mm/aaaa
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Nombre de usuario - Accion - dd/mm/aaaa
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

export default {
    mounted(){
        console.log(this.$store.state)
    },
    data:() => ({
    })
}
</script>

