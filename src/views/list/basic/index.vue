<template>
  <div class="ele-body">
    <!-- 搜索表单 -->
    <search-form @search="onSearch" @expand-change="onExpandChange" />
    <el-card shadow="never">
      <!-- 提示信息 -->
      <el-alert
        type="info"
        :closable="false"
        class="ele-alert-border"
        style="margin-bottom: 15px"
      >
        <i class="el-icon-info ele-text-info"></i>
        <span class="ele-text">
          <span>
            已选择
            <b class="ele-text-info">{{ selection.length }}</b>
            项数据<em></em>
          </span>
          <span>
            其中冻结状态的用户有
            <b>{{ selection.filter((d) => d.status === 1).length }} 个</b>
            <em></em><em></em>
          </span>
        </span>
        <el-link type="primary" :underline="false" @click="clearChoose">
          清空
        </el-link>
      </el-alert>
      <!-- 高级表格 -->
      <ele-pro-table
        ref="table"
        row-key="userId"
        title="基础列表"
        :border="bordered"
        :stripe="striped"
        :tools-theme="toolDefault ? 'default' : 'none'"
        :height="tableHeight"
        :full-height="tableFullHeight"
        :columns="columns"
        :datasource="datasource"
        :row-click-checked="true"
        :selection.sync="selection"
        :row-click-checked-intelligent="false"
        :paginationClass="circlePagination ? void 0 : null"
        :default-sort="{ prop: 'createTime', order: 'ascending' }"
        cache-key="listBasicTable"
        @done="onDone"
      >
        <!-- 表头工具按钮 -->
        <template v-slot:toolkit>
          <div class="ele-space">
            <div class="list-tool-item">
              <span>边框</span>
              <el-switch v-model="bordered" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>斑马线</span>
              <el-switch v-model="striped" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>表头背景</span>
              <el-switch v-model="toolDefault" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>固定高度</span>
              <el-switch v-model="fixedHeight" @change="destroyTable" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>圆形分页</span>
              <el-switch v-model="circlePagination" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              @click="openEdit()"
            >
              新建
            </el-button>
            <el-dropdown @command="onDropClick">
              <el-button
                size="small"
                class="ele-btn-icon"
                :disabled="!selection.length"
              >
                <span>批量操作</span>
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <template v-slot:dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="del">批量删除</el-dropdown-item>
                  <el-dropdown-item command="edit">批量修改</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
          </div>
        </template>
        <!-- 头像列 -->
        <template v-slot:avatar="{ row }">
          <div style="line-height: 1">
            <el-avatar v-if="row.avatar" :src="row.avatar" :size="32" />
            <el-avatar v-else :size="32" class="ele-bg-primary">
              {{
                row.nickname && row.nickname.length > 2
                  ? row.nickname.substring(row.nickname.length - 2)
                  : row.nickname
              }}
            </el-avatar>
          </div>
        </template>
        <!-- 用户名列 -->
        <template v-slot:nickname="{ row }">
          <router-link :to="'/list/basic/details/' + row.userId">
            {{ row.nickname }}
          </router-link>
        </template>
        <!-- 状态列 -->
        <template v-slot:status="{ row }">
          <ele-dot
            :ripple="row.status === 0"
            :type="[null, 'danger'][row.status]"
            :text="['正常', '冻结'][row.status]"
          />
        </template>
        <!-- 操作列 -->
        <template v-slot:action="{ row }">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            @click.stop="openEdit(row)"
          >
            修改
          </el-link>
          <el-link
            type="danger"
            :underline="false"
            icon="el-icon-delete"
            @click.stop="remove(row)"
          >
            删除
          </el-link>
        </template>
        <!-- 用户名表头 -->
        <template v-slot:nicknameHeader="{ column }">
          <span :class="{ 'ele-text-primary': !!nicknameFilterValue }">
            {{ column.label }}
          </span>
          <nickname-filter @search="onNicknameFilter" />
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>

<script>
  import { pageUsers } from '@/api/system/user';
  import SearchForm from './components/search-form.vue';
  import NicknameFilter from './components/nickname-filter.vue';
  import { removePageTab } from '@/utils/page-tab-util';

  export default {
    name: 'ListBasic',
    components: { SearchForm, NicknameFilter },
    data() {
      return {
        // 表格选中数据
        selection: [],
        // 搜索表单是否展开
        searchExpand: false,
        // 表格是否显示边框
        bordered: true,
        // 表格是否斑马纹
        striped: false,
        // 表头工具栏风格
        toolDefault: true,
        // 表格固定高度
        fixedHeight: false,
        // 圆形分页
        circlePagination: true,
        // 用户名筛选值
        nicknameFilterValue: '',
        // 表格搜索参数
        lastWhere: {}
      };
    },
    computed: {
      // 表格高度
      tableHeight() {
        return this.fixedHeight
          ? this.searchExpand
            ? 'calc(100vh - 544px)'
            : 'calc(100vh - 492px)'
          : void 0;
      },
      // 表格全屏时高度
      tableFullHeight() {
        return this.fixedHeight ? 'calc(100vh - 126px)' : null;
      },
      // 表格的列配置，使用国际化要用computed
      columns() {
        return [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center',
            fixed: 'left',
            selectable: (row) => {
              return row.userId !== 2;
            }
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'avatar',
            label: this.$t('list.basic.table.avatar'),
            showOverflowTooltip: true,
            width: 80,
            align: 'center',
            slot: 'avatar'
          },
          {
            prop: 'username',
            label: this.$t('list.basic.table.username'),
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'nickname',
            label: this.$t('list.basic.table.nickname'),
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            slot: 'nickname',
            headerSlot: 'nicknameHeader'
          },
          {
            prop: 'organizationName',
            label: this.$t('list.basic.table.organizationName'),
            sortable: 'custom',
            showOverflowTooltip: true,
            show: false
          },
          {
            prop: 'phone',
            label: this.$t('list.basic.table.phone'),
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            columnKey: 'sexName',
            prop: 'sexName',
            label: this.$t('list.basic.table.sexName'),
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 80,
            filterMultiple: false,
            filters: [
              {
                text: '男',
                value: '男'
              },
              {
                text: '女',
                value: '女'
              }
            ]
          },
          {
            prop: 'createTime',
            label: this.$t('list.basic.table.createTime'),
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            formatter: (_row, _column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          },
          {
            prop: 'status',
            label: this.$t('list.basic.table.status'),
            align: 'center',
            sortable: 'custom',
            width: 100,
            resizable: false,
            slot: 'status',
            showOverflowTooltip: true
          },
          {
            columnKey: 'action',
            label: this.$t('list.basic.table.action'),
            width: 130,
            align: 'center',
            resizable: false,
            slot: 'action',
            hideInSetting: true,
            showOverflowTooltip: true,
            fixed: 'right'
          }
        ];
      }
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order, filterValue }) {
        return pageUsers({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 表格数据请求完成事件 */
      onDone() {
        this.$nextTick(() => {
          // 回显 id 为 6、9、8 的数据的复选框
          const ids = [6, 9, 8];
          this.$refs.table.setSelectedRowKeys(ids);
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where });
      },
      /* 清空选择 */
      clearChoose() {
        this.$refs.table.clearSelection();
      },
      /* 编辑 */
      openEdit(row) {
        const path = row ? '/list/basic/edit' : '/list/basic/add';
        removePageTab({ key: path });
        this.$nextTick(() => {
          this.$router.push({
            path,
            query: row ? { id: row.userId } : undefined
          });
        });
      },
      /* 下拉按钮点击 */
      onDropClick(command) {
        if (command === 'del') {
          this.$message.info('点击了批量删除');
        } else if (command === 'edit') {
          this.$message.info('点击了批量修改');
        }
      },
      /* 删除 */
      remove(row) {
        console.log(row);
        this.$message.info('点击了删除');
      },
      /* 搜索展开改变事件 */
      onExpandChange(value) {
        this.searchExpand = value;
      },
      /* 销毁表格 */
      destroyTable() {
        this.$refs.table.reRenderTable();
      },
      /* 搜索事件 */
      onSearch(where) {
        this.lastWhere = where;
        this.doReload();
      },
      /* 用户名筛选事件 */
      onNicknameFilter(nickname) {
        this.nicknameFilterValue = nickname;
        this.doReload();
      },
      /* 表格搜索 */
      doReload() {
        if (this.nicknameFilterValue) {
          this.reload({
            ...this.lastWhere,
            nickname: this.nicknameFilterValue
          });
        } else {
          this.reload(this.lastWhere);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-tool-item > span {
    vertical-align: middle;
    margin-right: 6px;
  }

  .list-tool-divider {
    padding: 0 12px;
  }
</style>
