<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title class="d-flex justify-center">
                [LOGO SERVITAKAS]
            </v-card-title>
        </v-card>
        <center>
            <p class="white--text mb-4"><b>CATEGORÍAS</b></p>
        </center>
        <v-row>
            <v-col cols="6" md="4"
                v-for="(categorie,i) in categories"
                :key="'categorie_'+i"
            >
                <v-card
                    @click="$router.push('/servitakas/categories/5/subcategories')"
                >
                    <v-img src="https://cdn.pixabay.com/photo/2015/11/08/12/24/drop-1033537_960_720.jpg"></v-img>
                    <v-card-title class="d-flex justify-center">
                        {{categorie.name}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'ServitakasCategories',
        mounted(){
            let data = this.loadData()
            this.categories = data.categories;
        },
        methods:{
            loadData(){

                return {
                    categories: [
                        {
                            name:'category_one',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                        {
                            name:'category_two',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                        {
                            name:'category_three',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                        {
                            name:'category_four',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                        {
                            name:'category_five',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                        {
                            name:'category_six',
                            subcategories: [
                                'subcategory_one', 'subcategory_two', 'subcategory_three', 'subcategory_four',
                            ]
                        },
                    ]
                    
                    
                    
                    
                    
                    
                    
                }
            }
        },
        data: () => ({
            categories: []
        })
    }
</script>