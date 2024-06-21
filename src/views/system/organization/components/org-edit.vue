<!-- 机构编辑弹窗 -->
<template>
  <ele-modal
    width="680px"
    :visible="visible"
    :close-on-click-modal="true"
    custom-class="ele-dialog-form"
    :title="isUpdate ? '修改机构' : '添加机构'"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="82px">
      <el-row :gutter="15">
        <el-col v-bind="styleResponsive ? { sm: 12 } : { span: 12 }">
          <el-form-item label="上级机构:">
            <org-select
              v-model="form.parentId"
              :data="organizationList"
              placeholder="请选择上级机构"
            />
          </el-form-item>
          <el-form-item label="机构名称:" prop="organizationName">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.organizationName"
              placeholder="请输入机构名称"
            />
          </el-form-item>
          <el-form-item label="机构全称:" prop="organizationFullName">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.organizationFullName"
              placeholder="请输入机构全称"
            />
          </el-form-item>
          <el-form-item label="机构代码:" prop="organizationCode">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.organizationCode"
              placeholder="请输入机构代码"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="styleResponsive ? { sm: 12 } : { span: 12 }">
          <el-form-item label="机构类型:" prop="organizationType">
            <org-type-select v-model="form.organizationType" />
          </el-form-item>
          <el-form-item label="排序号:" prop="sortNumber">
            <el-input-number
              :min="0"
              :max="99999"
              v-model="form.sortNumber"
              controls-position="right"
              placeholder="请输入排序号"
              class="ele-fluid ele-text-left"
            />
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              :rows="4"
              type="textarea"
              :maxlength="200"
              v-model="form.comments"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-slot:footer>
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script>
  import OrgSelect from './org-select.vue';
  import OrgTypeSelect from './org-type-select.vue';
  import {
    addOrganization,
    updateOrganization
  } from '@/api/system/organization';

  export default {
    components: { OrgSelect, OrgTypeSelect },
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object,
      // 上级id
      parentId: Number,
      // 机构数据
      organizationList: Array
    },
    data() {
      const defaultForm = {
        organizationId: null,
        parentId: null,
        organizationName: '',
        organizationFullName: '',
        organizationCode: '',
        organizationType: null,
        sortNumber: null,
        comments: ''
      };
      return {
        defaultForm,
        // 表单数据
        form: { ...defaultForm },
        // 表单验证规则
        rules: {
          organizationName: [
            {
              required: true,
              message: '请输入机构名称',
              trigger: 'blur'
            }
          ],
          organizationFullName: [
            {
              required: true,
              message: '请输入机构全称',
              trigger: 'blur'
            }
          ],
          organizationCode: [
            {
              required: true,
              message: '请输入机构代码',
              trigger: 'blur'
            }
          ],
          organizationType: [
            {
              required: true,
              message: '请选择机构类型',
              trigger: 'blur'
            }
          ],
          sortNumber: [
            {
              required: true,
              message: '请输入排序号',
              trigger: 'blur'
            }
          ]
        },
        // 提交状态
        loading: false,
        // 是否是修改
        isUpdate: false
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 保存编辑 */
      save() {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          const data = {
            ...this.form,
            parentId: this.form.parentId || 0
          };
          const saveOrUpdate = this.isUpdate
            ? updateOrganization
            : addOrganization;
          saveOrUpdate(data)
            .then((msg) => {
              this.loading = false;
              this.$message.success(msg);
              this.updateVisible(false);
              this.$emit('done');
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        });
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          if (this.data) {
            this.$util.assignObject(this.form, this.data);
            this.isUpdate = true;
          } else {
            this.form.parentId = this.parentId;
            this.isUpdate = false;
          }
        } else {
          this.$refs.form.clearValidate();
          this.form = { ...this.defaultForm };
        }
      }
    }
  };
</script>
