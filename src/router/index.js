/**
 * 路由配置
 */
import Vue from 'vue';
import NProgress from 'nprogress';
import VueRouter from 'vue-router';
import { WHITE_LIST, REDIRECT_PATH, LAYOUT_PATH } from '@/config/setting';
import store from '@/store';
import { getToken } from '@/utils/token-util';
import { routes, getMenuRoutes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return { y: 0 };
  }
});

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  if (!from.path.includes(REDIRECT_PATH)) {
    NProgress.start();
  }
  // 判断是否登录
  if (getToken()) {
    // 还未注册动态路由则先获取
    if (!store.state.user.menus) {
      store
        .dispatch('user/fetchUserInfo')
        .then(({ menus, homePath }) => {
          if (menus) {
            router.addRoute(getMenuRoutes(menus, homePath));
            next({ ...to, replace: true });
          }
        })
        .catch((e) => {
          console.error(e);
          next();
        });
    } else {
      next();
    }
  } else if (WHITE_LIST.includes(to.path)) {
    next();
  } else {
    next({
      path: '/login',
      query: to.path === LAYOUT_PATH ? {} : { from: to.path }
    });
  }
});

router.afterEach((to) => {
  if (!to.path.includes(REDIRECT_PATH) && NProgress.isStarted()) {
    setTimeout(() => {
      NProgress.done(true);
    }, 200);
  }
});

export default router;
