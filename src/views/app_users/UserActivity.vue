<template>
    <v-container>
        <v-row>
            <v-col align="center">
                <h1 class="display-2 mt-6 font-weight-bold white--text">Takasteos realizados por {{user.name}}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    
    name:"UserActivity",

    mounted(){

    },
    data: () => ({
        user: {
            name: 'Rommel'
        }
    })
}
</script>
