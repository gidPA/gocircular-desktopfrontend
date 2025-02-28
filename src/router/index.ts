import { createRouter, createWebHistory, } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import LoginPage from '@/pages/LoginPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue'
import TransactionList from '@/pages/TransactionList.vue';
import UserList from '@/pages/UserList.vue';
import RVMList from '@/pages/RVMList.vue';
import RegisterNewRVM from '@/pages/rvm-subpages/RegisterNewRVM.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage      
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/rvm',
    name: 'RVM',
    component: RVMList,
    meta:{
      requiresAuth: true
    },
    
  },
  {
    path: '/rvm/register',
    name: 'Register RVM',
    component: RegisterNewRVM,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/rvm/register/success',
    name: 'Successfully Registered RVM',
    component: () => import('@/pages/rvm-subpages/RegisterSuccessful.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionList,
    meta:{
      requiresAuth: true
    }
  }
  ,
  {
    path: '/user',
    name: 'Users',
    component: UserList,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/point_exchange',
    name: 'Point Exchange',
    component: () => import('@/pages/pointexchange-subpages/PointExchangeList.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/point_exchange/:id',
    name: 'Point Exchange Actions',
    component: () => import('@/pages/pointexchange-subpages/PointRequestAction.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/recyclable',
    name: 'Recyclable Price List',
    component: () => import('@/pages/RecyclablePriceList.vue'),
    meta: {
      requiresAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.accessToken) {
    await authStore.checkAuth();
  }   
  
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next('/login');       
  } else {
    next();
  }
});

export default router;
