<template>
  <el-row :gutter="15">
    <el-col v-bind="styleResponsive ? { md: 8 } : { span: 8 }">
      <el-card shadow="never" header="列表拖拽排序">
        <div class="demo-drag-list">
          <vue-draggable v-model="list" handle=".sort-handle" animation="300">
            <div
              class="demo-drag-list-item ele-cell"
              v-for="item in list"
              :key="item.id"
            >
              <div class="ele-cell-content">{{ item.name }}</div>
              <i class="sort-handle el-icon-rank ele-text-secondary"></i>
            </div>
          </vue-draggable>
        </div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { md: 16 } : { span: 16 }">
      <el-card shadow="never" header="列表相互拖拽">
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="demo-drag-list">
              <vue-draggable
                v-model="list1"
                handle=".sort-handle"
                group="project1"
                animation="300"
                :set-data="() => void 0"
              >
                <div
                  class="demo-drag-list-item ele-cell"
                  v-for="item in list1"
                  :key="item.id"
                >
                  <div class="ele-cell-content">{{ item.name }}</div>
                  <i class="sort-handle el-icon-rank ele-text-secondary"></i>
                </div>
              </vue-draggable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="demo-drag-list">
              <vue-draggable
                v-model="list2"
                handle=".sort-handle"
                group="project1"
                animation="300"
                :set-data="() => void 0"
              >
                <div
                  class="demo-drag-list-item ele-cell"
                  v-for="item in list2"
                  :key="item.id"
                >
                  <div class="ele-cell-content">{{ item.name }}</div>
                  <i class="sort-handle el-icon-rank ele-text-secondary"></i>
                </div>
              </vue-draggable>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import VueDraggable from 'vuedraggable';

  export default {
    components: { VueDraggable },
    data() {
      return {
        list: [
          { id: 1, name: '项目0000001' },
          { id: 2, name: '项目0000002' },
          { id: 3, name: '项目0000003' },
          { id: 4, name: '项目0000004' },
          { id: 5, name: '项目0000005' }
        ],
        list1: [
          { id: 1, name: '项目0000001' },
          { id: 2, name: '项目0000002' },
          { id: 3, name: '项目0000003' },
          { id: 4, name: '项目0000004' },
          { id: 5, name: '项目0000005' }
        ],
        list2: [
          { id: 6, name: '项目0000006' },
          { id: 7, name: '项目0000007' },
          { id: 8, name: '项目0000008' },
          { id: 9, name: '项目0000009' },
          { id: 10, name: '项目0000010' }
        ]
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* 列表样式 */
  .demo-drag-list {
    border: 1px solid hsla(0, 0%, 60%, 0.2);
  }

  .demo-drag-list-item {
    padding: 10px 15px;

    & + .demo-drag-list-item {
      border-top: 1px solid hsla(0, 0%, 60%, 0.2);
    }

    &.sortable-chosen {
      background-color: hsla(0, 0%, 60%, 0.1);
    }

    .sort-handle {
      cursor: move;
      font-size: 16px;
    }
  }
</style>
