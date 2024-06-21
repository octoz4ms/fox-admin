<template>
  <el-row :gutter="15">
    <el-col v-bind="styleResponsive ? { md: 8 } : { span: 8 }">
      <el-card shadow="never" header="宫格拖拽排序">
        <div class="demo-drag-grid">
          <vue-draggable
            v-model="grid"
            animation="300"
            :set-data="() => void 0"
          >
            <div
              class="demo-drag-grid-item"
              v-for="item in grid"
              :key="item.id"
            >
              {{ item.name }}
            </div>
          </vue-draggable>
        </div>
      </el-card>
    </el-col>
    <el-col v-bind="styleResponsive ? { md: 16 } : { span: 16 }">
      <el-card shadow="never" header="宫格相互拖拽">
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="demo-drag-grid">
              <vue-draggable
                v-model="grid1"
                group="project2"
                animation="300"
                :set-data="() => void 0"
              >
                <div
                  class="demo-drag-grid-item"
                  v-for="item in grid1"
                  :key="item.id"
                >
                  {{ item.name }}
                </div>
              </vue-draggable>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="demo-drag-grid">
              <vue-draggable
                v-model="grid2"
                group="project2"
                animation="300"
                :set-data="() => void 0"
              >
                <div
                  class="demo-drag-grid-item"
                  v-for="item in grid2"
                  :key="item.id"
                >
                  {{ item.name }}
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
        grid: [
          { id: 1, name: '项目0000001' },
          { id: 2, name: '项目0000002' },
          { id: 3, name: '项目0000003' },
          { id: 4, name: '项目0000004' },
          { id: 5, name: '项目0000005' }
        ],
        grid1: [
          { id: 1, name: '项目0000001' },
          { id: 2, name: '项目0000002' },
          { id: 3, name: '项目0000003' },
          { id: 4, name: '项目0000004' },
          { id: 5, name: '项目0000005' }
        ],
        grid2: [
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
  /* 宫格样式 */
  .demo-drag-grid {
    position: relative;

    & > div {
      border: 1px solid hsla(0, 0%, 60%, 0.2);
      border-right: none;
      border-bottom: none;
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      min-height: 201px;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: hsla(0, 0%, 60%, 0.2);
      bottom: 0;
      right: 0;
    }

    &:before {
      width: 1px;
      top: 0;
    }

    &:after {
      height: 1px;
      left: 0;
    }
  }

  .demo-drag-grid-item {
    cursor: move;
    border: 1px solid hsla(0, 0%, 60%, 0.2);
    border-top: none;
    border-left: none;
    height: 100px;
    line-height: 100px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .demo-drag-grid-item.sortable-chosen {
    background: hsla(0, 0%, 60%, 0.1);
  }
</style>
