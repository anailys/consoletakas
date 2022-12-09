import Vue from 'vue'
import VueRouter from 'vue-router'
import { TakasRouter } from './takas/index'
import { DefaultModuleRouter } from './default_module/index'
import { CategoriesRouter } from './categories/index'
import { AuthRouter } from './auth'
import { AdministrationRouter } from './administration'
import { AppUsersRouter } from './app_users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      page_type: 'private'
    },
    component: () => import('../views/Home.vue'),
  },

  ...TakasRouter,
  ...DefaultModuleRouter,
  ...CategoriesRouter,
  ...AppUsersRouter,

  //servitakas routes
  {
    path: '/servitakas',
    name: 'Servitakas',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/servitakas/Servitakas.vue'),
  },
  {
    path: '/servitakas/categories',
    name: 'ServitakasCategories',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/servitakas/Categories.vue'),
  },
  {
    path: '/servitakas/categories/:id/subcategories',
    name: 'ServitakasSubcategories',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/servitakas/Subcategories.vue'),
  },
  {
    path: '/servitakas/profiles',
    name: 'ServitakasProfiles',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/servitakas/Profiles.vue'),
  },


  //Auth routes
  ...AuthRouter,



  {
    path: '/app-users/activity',
    name: 'UserActivity',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/app_users/UserActivity.vue'),
  },

  {
    path: '/app-users/my-profile',
    name: 'MyProfile',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/app_users/MyProfile.vue'),
  },
  {
    path: '/administration/audits',
    name: 'Audits',
    meta: {
      page_type: 'private'
    },

    component: () => import('../views/administration/Audits.vue'),
  },
  ...AdministrationRouter

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let store = JSON.parse(localStorage.getItem('auth'))
  if (store == undefined) store = {}


  if (to.meta.page_type == 'only_no_auth' && store.isLogged) {
    router.push('/')
    return
  }

  if (to.meta.page_type == 'private' && !store.isLogged) {
    router.push('login')
    return
  }

  next();



})



export default router
