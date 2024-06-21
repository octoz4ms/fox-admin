<template>
  <div class="ele-body ele-body-card">
    <profile-card />
    <link-card ref="linkCard" />
    <vue-draggable
      tag="el-row"
      v-model="data"
      handle=".el-card__header"
      :component-data="{ props: { gutter: 15 } }"
      :animation="300"
      :set-data="() => void 0"
      @end="onEnd"
    >
      <el-col
        v-for="(d, i) in data"
        :key="d.name"
        v-bind="styleResponsive ? { md: d.md, sm: d.sm } : { span: d.md }"
      >
        <component
          :is="d.name"
          :title="d.title"
          @remove="onRemove(i)"
          @edit="onEdit(i)"
        />
      </el-col>
    </vue-draggable>
    <el-card shadow="never" body-style="padding: 0;">
      <div class="ele-cell" style="line-height: 42px">
        <div
          class="ele-cell-content ele-text-primary workplace-bottom-btn"
          @click="add"
        >
          <i class="el-icon-circle-plus-outline"></i> 添加视图
        </div>
        <el-divider direction="vertical" />
        <div
          class="ele-cell-content ele-text-primary workplace-bottom-btn"
          @click="reset"
        >
          <i class="el-icon-refresh-left"></i> 重置布局
        </div>
      </div>
    </el-card>
    <!-- 编辑弹窗 -->
    <ele-modal width="680px" :visible.sync="visible" title="未添加的视图">
      <el-row :gutter="15" style="margin-bottom: -15px">
        <el-col v-for="item in notAddedData" :key="item.name" :md="8" :sm="24">
          <div
            class="workplace-card-item ele-border-lighter"
            @click="addView(item)"
          >
            <div class="workplace-card-header ele-border-lighter">
              {{ item.title }}
            </div>
            <div class="workplace-card-body ele-text-placeholder">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-col>
      </el-row>
      <ele-empty v-if="!notAddedData.length" text="已添加所有视图" />
    </ele-modal>
  </div>
</template>

<script>
  import VueDraggable from 'vuedraggable';
  import ProfileCard from './components/profile-card.vue';
  import LinkCard from './components/link-card.vue';
  import ActivitiesCard from './components/activities-card.vue';
  import TaskCard from './components/task-card.vue';
  import GoalCard from './components/goal-card.vue';
  import ProjectCard from './components/project-card.vue';
  import UserList from './components/user-list.vue';

  export default {
    name: 'DashboardWorkplace',
    components: {
      VueDraggable,
      ProfileCard,
      LinkCard,
      ActivitiesCard,
      TaskCard,
      GoalCard,
      ProjectCard,
      UserList
    },
    data() {
      // 默认布局
      const defaultData = [
        {
          name: 'activities-card',
          title: '最新动态',
          md: 8,
          sm: 24
        },
        {
          name: 'task-card',
          title: '我的任务',
          md: 8,
          sm: 24
        },
        {
          name: 'goal-card',
          title: '本月目标',
          md: 8,
          sm: 24
        },
        {
          name: 'project-card',
          title: '项目进度',
          md: 16,
          sm: 24
        },
        {
          name: 'user-list',
          title: '小组成员',
          md: 8,
          sm: 24
        }
      ];
      // 获取缓存布局
      const cache = (() => {
        const str = localStorage.getItem('workplace-layout');
        try {
          return str ? JSON.parse(str) : null;
        } catch (e) {
          return null;
        }
      })();
      return {
        defaultData,
        data: [...(cache ?? defaultData)],
        visible: false
      };
    },
    computed: {
      // 未添加的数据
      notAddedData() {
        return this.defaultData.filter(
          (d) => !this.data.some((t) => t.name === d.name)
        );
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 添加 */
      add() {
        this.visible = true;
      },
      /* 重置布局 */
      reset() {
        this.data = [...this.defaultData];
        this.cacheData();
        this.$refs.linkCard.reset();
        this.$message.success('已重置');
      },
      /* 缓存布局 */
      cacheData() {
        localStorage.setItem('workplace-layout', JSON.stringify(this.data));
      },
      /* 删除视图 */
      onRemove(index) {
        this.data = this.data.filter((_d, i) => i !== index);
        this.cacheData();
      },
      /* 编辑视图 */
      onEdit(index) {
        console.log('index:', index);
        this.$message.info('点击了编辑');
      },
      /* 添加视图 */
      addView(item) {
        this.data.push(item);
        this.cacheData();
        this.$message.success('已添加');
      },
      /* 排序改变 */
      onEnd() {
        this.cacheData();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ele-body {
    :deep(.el-card__header) {
      cursor: move;
      position: relative;
    }

    :deep(.el-row > .el-col.sortable-chosen > .el-card) {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .workplace-bottom-btn {
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: hsla(0, 0%, 60%, 0.05);
    }
  }

  /* 添加弹窗 */
  .workplace-card-item {
    margin-bottom: 15px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
    }

    .workplace-card-header {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      padding: 8px;
    }
  }

  .workplace-card-body {
    font-size: 24px;
    padding: 40px 10px;
    text-align: center;
  }
</style>
