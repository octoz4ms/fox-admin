<template>
  <div :class="['ele-body', { 'demo-message-responsive': styleResponsive }]">
    <el-card shadow="never" body-style="padding: 0;">
      <div class="ele-cell ele-cell-align-top ele-user-message">
        <el-menu
          :mode="mode"
          :default-active="active"
          class="ele-scrollbar-hide"
        >
          <el-menu-item index="notice">
            <router-link to="/user/message?type=notice">
              <el-badge
                v-if="unReadNotice"
                :value="unReadNotice"
                class="ele-badge-static"
              />
              <span>系统通知</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="letter">
            <router-link to="/user/message?type=letter">
              <el-badge
                v-if="unReadLetter"
                :value="unReadLetter"
                class="ele-badge-static"
              />
              <span>用户私信</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="todo">
            <router-link to="/user/message?type=todo">
              <el-badge
                v-if="unReadTodo"
                :value="unReadTodo"
                class="ele-badge-static"
              />
              <span>代办事项</span>
            </router-link>
          </el-menu-item>
        </el-menu>
        <div class="ele-cell-content" style="overflow-x: hidden">
          <transition name="slide-right" mode="out-in">
            <message-notice
              v-if="active === 'notice'"
              @update-data="queryUnReadNum"
            />
            <message-letter
              v-else-if="active === 'letter'"
              @update-data="queryUnReadNum"
            />
            <message-todo v-else @update-data="queryUnReadNum" />
          </transition>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import MessageNotice from './components/message-notice.vue';
  import MessageLetter from './components/message-letter.vue';
  import MessageTodo from './components/message-todo.vue';
  import { getUnReadNum } from '@/api/user/message';

  export default {
    name: 'UserMessage',
    components: { MessageNotice, MessageLetter, MessageTodo },
    data() {
      return {
        // 导航选中
        active: null,
        // 通知未读数量
        unReadNotice: 0,
        // 私信未读数量
        unReadLetter: 0,
        // 代办未读数量
        unReadTodo: 0
      };
    },
    computed: {
      // 小屏幕水平导航
      mode() {
        return this.styleResponsive && this.$store.state.theme.screenWidth < 768
          ? 'horizontal'
          : 'vertical';
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    watch: {
      $route: {
        handler(route) {
          if (route.path === '/user/message') {
            this.active = route?.query?.type || 'notice';
          }
        },
        immediate: true
      }
    },
    created() {
      this.queryUnReadNum();
    },
    methods: {
      /* 查询未读数量 */
      queryUnReadNum() {
        getUnReadNum()
          .then((result) => {
            this.unReadNotice = result.notice;
            this.unReadLetter = result.letter;
            this.unReadTodo = result.todo;
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ele-user-message {
    :deep(.el-menu) {
      width: 151px;
      flex-shrink: 0;
    }

    .ele-cell-content {
      padding: 15px;
      box-sizing: border-box;
      overflow: auto;
    }

    .ele-badge-static {
      margin-right: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .demo-message-responsive .ele-user-message :deep(.el-menu) {
      .el-menu-item {
        text-align: right;
      }

      .el-menu-item:first-child {
        margin-top: 15px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .demo-message-responsive .ele-user-message {
      display: block;

      :deep(.el-menu) {
        width: auto;
        text-align: center;
        white-space: nowrap;
        overflow: auto;

        .el-menu-item {
          height: 45px;
          line-height: 45px;
          padding: 0 5px;
          display: inline-block;
          float: none;
        }
      }

      .ele-badge-static {
        margin-left: 3px;
      }
    }
  }
</style>
