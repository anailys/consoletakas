<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title>{{categorie.name}}</v-card-title>
        </v-card>
        <v-card>
        <v-card-text>
            <v-list>
                <div
                    v-for="(subcategorie,i) in categorie.subcategories"
                    :key="'subcategorie_'+i"
                >
                    <v-list-item link @click="profile_index = i">
                        <v-list-item-title>{{subcategorie.name}}</v-list-item-title>
                        <v-list-item-icon @click="deleteSubcategory(i)"><v-icon>mdi-delete</v-icon></v-list-item-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
            </v-list>
        </v-card-text>
        </v-card>
        <v-btn
            fixed
            fab
            bottom
            right
            @click="dialog=true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            persistent
            v-model="dialog"
            max-width="600px"
        >
            <v-card>
            <v-toolbar
              dark
              class="mb-4"
            >Agregar subcategoría
            </v-toolbar>
                <v-card-text>
                    <v-text-field
                    v-model="category_name"
                        label="Nombre de la nueva subcategoría"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        outlined
                        @click="saveSubcategory()"
                    >
                        Guardar
                    </v-btn>
                    <v-btn
                        outlined
                        @click="dialog=false"
                    >
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'ServitakasSubcategories',
    data: () => ({
        dialog:false,
        category_name:'',
        categorie:{}
    }),
    mounted(){
        let data = this.loadData();
        this.categorie = data.categorie;
    },
    methods:{
        deleteSubcategory(i){
            this.categorie.subcategories.splice(i,1);
        },
        saveSubcategory(){
            this.categorie.subcategories.push({name:this.category_name});
            this.category_name = '';
            this.dialog = false;

        },
        loadData(){
            return {
                categorie:{
                    name:'Categorie Name',
                    subcategories:[
                        {name:'subcategorie 1'},
                        {name:'subcategorie 2'},
                        {name:'subcategorie 3'},
                        {name:'subcategorie 4'},
                        {name:'subcategorie 5'},
                        {name:'subcategorie 6'},
                        {name:'subcategorie 7'},
                        {name:'subcategorie 8'},
                        {name:'subcategorie 9'},
                        {name:'subcategorie 10'},
                        
                    ]
                }
            }
        }
        },
}
</script>