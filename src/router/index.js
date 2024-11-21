import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/store";
const routes = [
  {
    path: '/weChatLogin',
    name: 'weChatLogin',
    component: () => import('@/views/weChatLogin/index.vue'),
    beforeEnter: (to, from) => {
      const store = useStore();
      if (store.openid !== '') {
        return router.push('/userbilllist');
      } else {
        return true
      }
    }
  },
  {
    path: '/fileList',
    name: 'fileList',
    component: () => import('@/views/fileList/index.vue'),
  },
  {
    path: '/filing',
    name: 'filing',
    component: () => import('@/views/filing/index.vue'),
    beforeEnter: (to, from) => {
      const store = useStore();
      if (store.userList.length === 6) {
        return router.push('/userbilllist');
      } else {
        return true
      }
    }
  },
  {
    path: '/userBillList',
    name: 'userBillList',
    component: () => import('@/views/userBillList/index.vue')
  },
  {
    path: '/',
    redirect: '/weChatLogin'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
