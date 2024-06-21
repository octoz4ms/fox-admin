<template>
  <div class="ele-body" style="padding-bottom: 71px">
    <el-card shadow="never">
      <el-row :gutter="15">
        <el-col v-bind="styleResponsive ? { md: 12 } : { span: 12 }">
          <!-- 未选择的班级数据表格 -->
          <ele-pro-table
            :datasource="unChooseClass"
            :columns="columns"
            sub-title="未选班级:"
            height="535px"
            emptyText="已全部选择"
            :toolkit="[]"
            layout="total, prev, pager, next, jumper"
          >
            <template v-slot:toolkit>
              <el-button size="mini" class="ele-btn-icon" @click="addAll">
                全部添加
              </el-button>
            </template>
            <template v-slot:action="{ row }">
              <el-button size="mini" @click="add(row)">添加</el-button>
            </template>
          </ele-pro-table>
        </el-col>
        <el-col v-bind="styleResponsive ? { md: 12 } : { span: 12 }">
          <!-- 已选择的班级数据表格 -->
          <ele-pro-table
            :datasource="chooseClasses"
            :columns="columns"
            sub-title="已选班级:"
            height="535px"
            emptyText="未选择班级"
            :toolkit="[]"
            layout="total, prev, pager, next, jumper"
          >
            <template v-slot:toolkit>
              <el-button
                size="mini"
                type="danger"
                plain
                class="ele-btn-icon"
                @click="removeAll"
              >
                全部移除
              </el-button>
            </template>
            <template v-slot:action="{ row }">
              <el-button type="danger" plain size="mini" @click="remove(row)">
                移除
              </el-button>
            </template>
          </ele-pro-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { getAllClasses } from '@/api/example/choose';

  export default {
    name: 'ExampleChoose',
    data() {
      return {
        // 加载状态
        loading: false,
        // 全部实训班级
        classes: [],
        // 已选择的班级数据
        chooseClasses: [],
        // 表格列配置
        columns: [
          {
            columnKey: 'action',
            label: '操作',
            width: 100,
            align: 'center',
            slot: 'action'
          },
          {
            prop: 'classesName',
            label: '班级名称',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          },
          {
            prop: 'major',
            label: '专业',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          },
          {
            prop: 'college',
            label: '学院',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          }
        ]
      };
    },
    computed: {
      /* 未选择的班级数据 */
      unChooseClass() {
        return this.classes.filter((d) => this.chooseClasses.indexOf(d) === -1);
      },
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    created() {
      this.query();
    },
    methods: {
      /* 获取全部实训班级 */
      query() {
        getAllClasses()
          .then((data) => {
            this.classes = data;
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 添加 */
      add(row) {
        this.chooseClasses.push(row);
      },
      /* 移除 */
      remove(row) {
        this.chooseClasses.splice(this.chooseClasses.indexOf(row), 1);
      },
      /* 添加全部 */
      addAll() {
        this.unChooseClass.forEach((d) => {
          this.chooseClasses.push(d);
        });
      },
      /* 移除所有 */
      removeAll() {
        this.chooseClasses.splice(0, this.chooseClasses.length);
      }
    }
  };
</script>
