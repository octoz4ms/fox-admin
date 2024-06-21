<!-- 顶栏消息通知 -->
<template>
  <el-popover
    :width="330"
    trigger="click"
    v-model="visible"
    class="ele-notice-group"
    transition="el-zoom-in-top"
    popper-class="ele-notice-pop"
  >
    <template v-slot:reference>
      <div class="ele-notice-group">
        <el-badge :value="unreadNum" :hidden="!unreadNum">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>
    </template>
    <el-tabs v-model="active">
      <el-tab-pane name="notice" :label="noticeTitle">
        <div class="ele-notice-list ele-scrollbar-mini">
          <div
            v-for="(item, index) in notice"
            :key="index"
            class="ele-notice-item"
          >
            <div class="ele-cell ele-notice-item-wrapper">
              <i :class="[item.icon, 'ele-notice-item-icon']"></i>
              <div class="ele-cell-content">
                <div class="ele-elip">{{ item.title }}</div>
                <div class="ele-text-secondary ele-elip">{{ item.time }}</div>
              </div>
            </div>
            <el-divider />
          </div>
        </div>
        <div v-if="notice.length" class="ele-cell ele-notice-actions">
          <div class="ele-cell-content" @click="clearNotice">清空通知</div>
          <el-divider direction="vertical" class="line-color-light" />
          <router-link to="/user/message?type=notice" class="ele-cell-content">
            查看更多
          </router-link>
        </div>
        <ele-empty v-if="!notice.length" text="已查看所有通知" />
      </el-tab-pane>
      <el-tab-pane name="letter" :label="letterTitle">
        <div class="ele-notice-list ele-scrollbar-mini">
          <div
            v-for="(item, index) in letter"
            :key="index"
            class="ele-notice-item"
          >
            <div class="ele-cell ele-notice-item-wrapper ele-cell-align-top">
              <el-avatar :src="item.avatar" size="medium" />
              <div class="ele-cell-content">
                <div class="ele-elip">{{ item.title }}</div>
                <div class="ele-text-secondary ele-elip">
                  {{ item.content }}
                </div>
                <div class="ele-cell-desc ele-elip">{{ item.time }}</div>
              </div>
            </div>
            <el-divider />
          </div>
        </div>
        <div v-if="letter.length" class="ele-cell ele-notice-actions">
          <div class="ele-cell-content" @click="clearLetter">清空私信</div>
          <el-divider direction="vertical" class="line-color-light" />
          <router-link to="/user/message?type=letter" class="ele-cell-content">
            查看更多
          </router-link>
        </div>
        <ele-empty v-if="!letter.length" text="已读完所有私信" />
      </el-tab-pane>
      <el-tab-pane :label="todoTitle" name="todo">
        <div class="ele-notice-list ele-scrollbar-mini">
          <div
            v-for="(item, index) in todo"
            :key="index"
            class="ele-notice-item"
          >
            <div class="ele-notice-item-wrapper">
              <div class="ele-cell ele-cell-align-top">
                <div class="ele-cell-content ele-elip">{{ item.title }}</div>
                <el-tag size="mini" :type="['info', 'danger', ''][item.status]">
                  {{ ['未开始', '即将到期', '进行中'][item.status] }}
                </el-tag>
              </div>
              <div class="ele-text-secondary ele-elip">
                {{ item.description }}
              </div>
            </div>
            <el-divider />
          </div>
        </div>
        <div v-if="todo.length" class="ele-cell ele-notice-actions">
          <div class="ele-cell-content" @click="clearTodo">清空待办</div>
          <el-divider direction="vertical" class="line-color-light" />
          <router-link to="/user/message?type=todo" class="ele-cell-content">
            查看更多
          </router-link>
        </div>
        <ele-empty v-if="!todo.length" text="已完成所有任务" />
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
  import { getUnreadNotice } from '@/api/layout';

  export default {
    data() {
      return {
        // 是否显示
        visible: false,
        // 选项卡选中
        active: 'notice',
        // 通知数据
        notice: [],
        // 私信数据
        letter: [],
        // 待办数据
        todo: []
      };
    },
    computed: {
      // 通知标题
      noticeTitle() {
        return '通知' + (this.notice.length ? `(${this.notice.length})` : '');
      },
      // 私信标题
      letterTitle() {
        return '私信' + (this.letter.length ? `(${this.letter.length})` : '');
      },
      // 待办标题
      todoTitle() {
        return '待办' + (this.todo.length ? `(${this.todo.length})` : '');
      },
      // 未读数量
      unreadNum() {
        return this.notice.length + this.letter.length + this.todo.length;
      }
    },
    created() {
      this.query();
    },
    methods: {
      /* 查询数据 */
      query() {
        getUnreadNotice()
          .then((result) => {
            this.notice = result.notice;
            this.letter = result.letter;
            this.todo = result.todo;
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 清空通知 */
      clearNotice() {
        this.notice = [];
      },
      /* 清空通知 */
      clearLetter() {
        this.letter = [];
      },
      /* 清空通知 */
      clearTodo() {
        this.todo = [];
      }
    }
  };
</script>

<style lang="scss">
  .ele-notice-group {
    display: block;

    .el-badge {
      line-height: 1;
      display: block;
    }
  }

  /* 消息通知pop */
  .ele-notice-pop {
    padding: 0 !important;

    /* tab */
    .el-tabs__nav-scroll {
      text-align: center;
    }

    .el-tabs__nav {
      float: none;
      display: inline-block;
    }

    .el-tabs__item {
      height: 44px;
      line-height: 44px;
      padding: 0 20px !important;
    }

    /* 空视图 */
    .ele-empty {
      padding: 100px 0;
    }
  }

  /* 列表 */
  .ele-notice-list {
    padding-top: 8px;
    max-height: 360px;
    overflow: auto;
  }

  .ele-notice-item {
    .ele-notice-item-wrapper {
      padding: 12px 15px;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: hsla(0, 0%, 60%, 0.05);
      }
    }

    .ele-text-secondary {
      margin-top: 5px;
      font-size: 13px;
    }

    .ele-cell-desc {
      margin-top: 3px !important;
      font-size: 12px !important;
    }
  }

  .ele-notice-item-icon {
    width: 32px;
    height: 32px;
    line-height: 32px !important;
    color: #fff;
    font-size: 16px;
    background-color: #60b2fc;
    border-radius: 50%;
    text-align: center;

    &.el-icon-s-check {
      background-color: #f5686f;
    }

    &.el-icon-video-camera {
      background-color: #7cd734;
    }

    &.el-icon-s-claim {
      background-color: #faad14;
    }

    &.el-icon-message-solid {
      background-color: #2bcacd;
    }
  }

  /* 操作按钮 */
  .ele-notice-actions > .ele-cell-content {
    line-height: 42px;
    text-align: center;
    cursor: pointer;
    color: inherit;

    &:hover {
      background-color: hsla(0, 0%, 60%, 0.05);
    }
  }
</style>
