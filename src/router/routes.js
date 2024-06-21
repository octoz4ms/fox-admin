import { menuToRoutes, eachTreeData } from 'ele-admin';
import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting';
import EleLayout from '@/layout/index.vue';
import RedirectLayout from '@/components/RedirectLayout';
import { iframeMixins } from '@/utils/iframe-mixin';

/**
 * 静态路由
 */
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    component: () => import('@/views/forget/index.vue'),
    meta: { title: '忘记密码' }
  },
  // 404
  {
    path: '*',
    component: () => import('@/views/exception/404/index.vue')
  }
];

/**
 * 添加动态路由
 * @param menus 菜单数据
 * @param homePath 菜单数据的第一个页面地址
 */
export function getMenuRoutes(menus, homePath) {
  const routes = [
    // 用于刷新的路由
    {
      path: REDIRECT_PATH + '/:path(.*)',
      component: RedirectLayout,
      meta: { hideFooter: true }
    }
  ];
  // 路由铺平处理
  eachTreeData(
    menuToRoutes(menus, getComponent, [], null, null, iframeMixins),
    (route) => {
      routes.push({ ...route, children: null });
    }
  );
  return {
    path: LAYOUT_PATH,
    component: EleLayout,
    redirect: HOME_PATH ?? homePath,
    children: routes
  };
}

/**
 * 获取路由组件
 * @param component 组件名称
 */
function getComponent(component) {
  if (component) {
    return () => import('@/views/' + component);
  }
}
