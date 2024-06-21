/**
 * 登录状态管理
 */
import { formatMenus, toTreeData, formatTreeData } from 'ele-admin';
import { USER_MENUS } from '@/config/setting';
import { getUserInfo } from '@/api/layout';

export default {
  namespaced: true,
  state: {
    // 当前登录用户信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: []
  },
  mutations: {
    // 设置登录用户的信息
    setUserInfo(state, info) {
      state.info = info;
    },
    // 设置登录用户的菜单
    setMenus(state, menus) {
      state.menus = menus;
    },
    // 设置登录用户的权限
    setAuthorities(state, authorities) {
      state.authorities = authorities;
    },
    // 设置登录用户的角色
    setRoles(state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */
    async fetchUserInfo({ commit }) {
      const result = await getUserInfo().catch(() => {});
      if (!result) {
        return {};
      }
      // 用户信息
      commit('setUserInfo', result);
      // 用户权限
      const authorities =
        result.authorities
          ?.filter((d) => !!d.authority)
          ?.map((d) => d.authority) ?? [];
      commit('setAuthorities', authorities);
      // 用户角色
      const roles = result.roles?.map((d) => d.roleCode) ?? [];
      commit('setRoles', roles);
      // 用户菜单, 过滤掉按钮类型并转为 children 形式
      const { menus, homePath } = formatMenus(
        USER_MENUS ??
          toTreeData({
            data: result.authorities?.filter((d) => d.menuType !== 1),
            idField: 'menuId',
            parentIdField: 'parentId'
          })
      );
      commit('setMenus', menus);
      return { menus, homePath };
    },
    /**
     * 更新用户信息
     */
    setInfo({ commit }, value) {
      commit('setUserInfo', value);
    },
    /**
     * 更新菜单数据
     */
    setMenus({ commit }, value) {
      commit('setMenus', value);
    },
    /**
     * 更新菜单的badge
     */
    setMenuBadge({ commit, state }, { path, value, color }) {
      const menus = formatTreeData(state.menus, (m) => {
        if (path === m.path) {
          return {
            ...m,
            meta: {
              ...m.meta,
              badge: value,
              badgeColor: color
            }
          };
        }
        return m;
      });
      commit('setMenus', menus);
    }
  }
};
