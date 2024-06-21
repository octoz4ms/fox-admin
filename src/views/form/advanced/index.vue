<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">复杂表单</div>
      <div class="ele-page-desc">
        复杂表单常见于一次性输入和提交大批量数据的场景。
      </div>
    </div>
    <div class="ele-body" style="padding-bottom: 71px">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        @keyup.enter.native="submit"
        @submit.native.prevent
      >
        <el-card
          shadow="never"
          header="仓库信息"
          body-style="padding: 22px 22px 0 22px;"
        >
          <el-row :gutter="15">
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="仓库名:" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入仓库名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="仓库域名:" prop="url">
                <el-input v-model="form.url" placeholder="请输入" clearable>
                  <template v-slot:prepend>http://</template>
                  <template v-slot:append>.com</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="仓库管理员:" prop="administrator">
                <el-select
                  v-model="form.administrator"
                  placeholder="请选择仓库管理员"
                  class="ele-block"
                  clearable
                >
                  <el-option label="SunSmile" :value="1" />
                  <el-option label="Jasmine" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="审批人:" prop="approver">
                <el-select
                  v-model="form.approver"
                  placeholder="请选择审批人"
                  class="ele-block"
                  clearable
                >
                  <el-option label="SunSmile" :value="1" />
                  <el-option label="Jasmine" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="生效日期:" prop="datetime">
                <el-date-picker
                  v-model="form.datetime"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="ele-fluid"
                />
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="仓库类型:" prop="type">
                <el-select
                  v-model="form.type"
                  placeholder="请选择仓库类型"
                  class="ele-fluid"
                  clearable
                >
                  <el-option label="私密" :value="1" />
                  <el-option label="公开" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card
          shadow="never"
          header="任务信息"
          body-style="padding: 22px 22px 0 22px;"
        >
          <el-row :gutter="15">
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="任务名:" prop="task">
                <el-input
                  v-model="form.task"
                  placeholder="请输入任务名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="任务表述:" prop="description">
                <el-input
                  v-model="form.description"
                  placeholder="请输入任务表述"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="执行人:" prop="executor">
                <el-select
                  v-model="form.executor"
                  placeholder="请选择执行人"
                  class="ele-fluid"
                  clearable
                >
                  <el-option label="SunSmile" :value="1" />
                  <el-option label="Jasmine" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="责任人:" prop="officer">
                <el-select
                  v-model="form.officer"
                  placeholder="请选择责任人"
                  class="ele-fluid"
                  clearable
                >
                  <el-option label="SunSmile" :value="1" />
                  <el-option label="Jasmine" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="提醒时间:" prop="reminder">
                <el-time-picker
                  v-model="form.reminder"
                  placeholder="请选择提醒时间"
                  class="ele-fluid"
                  :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                />
              </el-form-item>
            </el-col>
            <el-col v-bind="styleResponsive ? { lg: 8, md: 12 } : { span: 8 }">
              <el-form-item label="任务类型:" prop="type">
                <el-select
                  v-model="form.taskType"
                  placeholder="请选择任务类型"
                  class="ele-block"
                  clearable
                >
                  <el-option label="私密" :value="1" />
                  <el-option label="公开" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!-- 选择成员 -->
        <user-select />
        <!-- 底部工具栏 -->
        <div class="ele-bottom-tool">
          <div v-if="validMsg" class="ele-text-danger">
            <i class="el-icon-circle-close"></i>
            <span>{{ validMsg }}</span>
          </div>
          <div class="ele-bottom-tool-actions">
            <el-button type="primary" :loading="loading" @click="submit">
              提交
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import UserSelect from './components/user-select.vue';

  export default {
    name: 'FormAdvanced',
    components: { UserSelect },
    data() {
      return {
        // 表单提交状态
        loading: false,
        // 表单数据
        form: {
          weight: 0,
          publicType: 1
        },
        // 表单验证规则
        rules: {
          name: [
            {
              required: true,
              message: '请输入仓库名',
              trigger: 'blur'
            }
          ],
          url: [
            {
              required: true,
              message: '请输入仓库域名',
              trigger: 'blur'
            }
          ],
          datetime: [
            {
              required: true,
              message: '请选择生效日期',
              trigger: 'blur'
            }
          ],
          administrator: [
            {
              required: true,
              message: '请选择仓库管理员',
              trigger: 'blur'
            }
          ],
          approver: [
            {
              required: true,
              message: '请选择审批人',
              trigger: 'blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择仓库类型',
              trigger: 'blur'
            }
          ],
          task: [
            {
              required: true,
              message: '请输入任务名',
              trigger: 'blur'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入任务表述',
              trigger: 'blur'
            }
          ],
          executor: [
            {
              required: true,
              message: '请选择执行人',
              trigger: 'blur'
            }
          ],
          officer: [
            {
              required: true,
              message: '请选择责任人',
              trigger: 'blur'
            }
          ],
          reminder: [
            {
              required: true,
              message: '请选择提醒时间',
              trigger: 'blur'
            }
          ],
          taskType: [
            {
              required: true,
              message: '请选择任务类型',
              trigger: 'blur'
            }
          ]
        },
        // 表单验证信息
        validMsg: ''
      };
    },
    computed: {
      // 是否开启响应式布局
      styleResponsive() {
        return this.$store.state.theme.styleResponsive;
      }
    },
    methods: {
      /* 表单提交 */
      submit() {
        this.$refs.form.validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$message.success('提交成功');
            }, 1500);
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      }
    }
  };
</script>
