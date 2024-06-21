<!-- 快捷方式 -->
<template>
  <vue-draggable
    tag="el-row"
    v-model="data"
    :component-data="{ props: { gutter: 15 } }"
    :animation="300"
    :set-data="() => void 0"
    @end="onEnd"
  >
    <el-col
      v-for="item in data"
      :key="item.url"
      v-bind="styleResponsive ? { lg: 3, md: 6, sm: 6, xs: 12 } : { span: 3 }"
    >
      <el-card shadow="hover" body-style="padding: 0;">
        <router-link :to="item.url" class="app-link-block">
          <i
            :class="['app-link-icon', item.icon]"
            :style="{ color: item.color }"
          >
          </i>
          <div class="app-link-title">{{ item.title }}</div>
        </router-link>
      </el-card>
    </el-col>
  </vue-draggable>
</template>

<script>
  import VueDraggable from 'vuedraggable';

  export default {
    components: { VueDraggable },
    data() {
      // 默认布局
      const defaultData = [
        {
          icon: 'el-icon-user',
          title: '用户',
          url: '/system/user'
        },
        {
          icon: 'el-icon-data-line',
          title: '分析',
          url: '/dashboard/analysis',
          color: '#95de64'
        },
        {
          icon: 'el-icon-shopping-cart-2',
          title: '商品',
          url: '/list/card/project',
          color: '#ff9c6e'
        },
        {
          icon: 'el-icon-tickets',
          title: '订单',
          url: '/list/basic',
          color: '#b37feb'
        },
        {
          icon: 'el-icon-bank-card',
          title: '票据',
          url: '/list/advanced',
          color: '#ffd666'
        },
        {
          icon: 'el-icon-message',
          title: '消息',
          url: '/user/message',
          color: '#5cdbd3'
        },
        {
          icon: 'el-icon-discount',
          title: '标签',
          url: '/extension/tag',
          color: '#ff85c0'
        },
        {
          icon: 'el-icon-s-operation',
          title: '配置',
          url: '/user/profile',
          color: '#ffc069'
        }
      ];
      // 获取缓存顺序
      const cache = (() => {
        const str = localStorage.getItem('workplace-links');
        try {
          return str ? JSON.parse(str) : null;
        } catch (e) {
          return null;
        }
      })();
      return {
        defaultData,
        data: [...(cache ?? defaultData)]
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 排序改变 */
      onEnd() {
        this.cacheData();
      },
      /* 重置布局 */
      reset() {
        this.data = [...this.defaultData];
        this.cacheData();
      },
      /* 缓存布局 */
      cacheData() {
        localStorage.setItem('workplace-links', JSON.stringify(this.data));
      }
    }
  };
</script>

<style lang="scss" scoped>
  .app-link-block {
    display: block;
    color: inherit;
    padding: 15px 0;
    text-align: center;
    text-decoration: none;
    cursor: pointer;

    .app-link-icon {
      color: #69c0ff;
      font-size: 30px;
      margin-top: 5px;
    }

    .app-link-title {
      margin-top: 8px;
    }
  }
</style>
