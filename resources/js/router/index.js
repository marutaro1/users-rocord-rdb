import { createRouter, createWebHistory } from 'vue-router';
import App from '../components/App.vue';

const routes = [
    {
      path: '/',
      name: 'App',
      component: App,
      props: true,
    },
    {
        path: '/factoryusers/:login_user_id',
        name: 'Users',
        component: () => import('../components/Users.vue'),
        props: true,
    },
    {
        path: '/factoryusers/:login_user_id/:id',
        name: 'User',
        component: () => import('../components/User.vue'),
        props: true,
        children: [
            {
                path: '/factoryusers/:login_user_id/:id/records',
                name: 'Records',
                component: () => import('../components/Records.vue'),
                props: true,
            },
            {
                path: '/factoryusers/:login_user_id/:id/updateuser',
                name: 'UpdateUser',
                component: () => import('../components/UpdateUser.vue'),
                props: true,
            },
            {
                path: '/factoryusers/:login_user_id/:id/manuel',
                name: 'Manuel',
                component: () => import('../components/Manuel.vue'),
                props: true,
            },
            {
                path: '/factoryusers/:login_user_id/:id/medicalhistory',
                name: 'MedicalHistory',
                component: () => import('../components/MedicalHistory.vue'),
                props: true,
            },
            {
                path: '/factoryusers/:login_user_id/:id/treatment',
                name: 'Treatment',
                component: () => import('../components/Treatment.vue'),
                props: true,
            },
        ]
    },
    {
        path: '/newuser',
        name: 'NewUser',
        component: () => import('../components/NewUser.vue'),
    },
    {
        path: '/archives/:login_user_id',
        name: 'Archive',
        component: () => import('../components/Archives.vue'),
        props: true,
    },
    {
        path: '/signup/:user_id',
        name: 'SignUp',
        component: () => import('../components/SignUp.vue'),
        props: true,
    },
    {
        path: '/staffdaywork/:login_user_id',
        name: 'StaffDayWork',
        component: () => import('../components/StaffDayWork.vue'),
        props: true,
        children: [
            {
                path: '/staffdaywork/:login_user_id/works',
                name: 'Works',
                component: () => import('../components/Works.vue'),
                props: true,

            },
            {
                path: '/staffdaywork/:login_user_id/:select_staff_id/staffpage',
                name: 'StaffPage',
                component: () => import('../components/StaffPage.vue'),
                props: true,

            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router