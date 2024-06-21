<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">分步表单</div>
      <div class="ele-page-desc">
        将一个冗长或用户不熟悉的表单任务分成多个步骤, 指导用户完成。
      </div>
    </div>
    <div class="ele-body">
      <el-card shadow="never" body-style="padding: 15px 0 25px 0;">
        <div style="max-width: 700px; margin: 0 auto">
          <el-steps
            :active="active"
            class="ele-steps-horizontal"
            style="margin: 10px 0 45px 0"
          >
            <el-step title="第一步" description="填写转账信息" />
            <el-step title="第二步" description="确认转账信息" />
            <el-step title="第三步" description="转账成功" />
          </el-steps>
          <!-- 第一步 -->
          <step-edit v-if="active === 0" @done="onDone" />
          <!-- 第二步 -->
          <step-confirm
            v-if="active === 1"
            :data="form"
            @done="onNext"
            @back="onBack"
          />
          <!-- 第三步 -->
          <step-success v-if="active === 2" :data="form" @back="onBack" />
        </div>
        <div v-if="active === 0" style="padding: 0 25px">
          <div style="margin: 35px 0 25px 0">
            <el-divider />
          </div>
          <el-alert type="info" :closable="false" class="ele-alert-border">
            <h6 style="margin: 5px 0 15px 0">说明</h6>
            <h6 style="margin-bottom: 10px">转账到支付宝</h6>
            <p style="margin-bottom: 15px">
              如果需要, 这里可以放一些关于产品的常见问题说明。如果需要,
              这里可以放一些关于产品的常见问题说明。如果需要,
              这里可以放一些关于产品的常见问题说明。
            </p>
            <h6 style="margin-bottom: 10px">转账到微信</h6>
            <p style="margin-bottom: 15px">
              如果需要, 这里可以放一些关于产品的常见问题说明。如果需要,
              这里可以放一些关于产品的常见问题说明。如果需要,
              这里可以放一些关于产品的常见问题说明。
            </p>
          </el-alert>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import StepEdit from './components/step-edit.vue';
  import StepConfirm from './components/step-confirm.vue';
  import StepSuccess from './components/step-success.vue';

  export default {
    name: 'FormStep',
    components: {
      StepEdit,
      StepConfirm,
      StepSuccess
    },
    data() {
      return {
        // 选中步骤
        active: 0,
        // 数据
        form: {}
      };
    },
    methods: {
      onDone(data) {
        Object.assign(this.form, data);
        this.active = 1;
      },
      onNext() {
        this.active = 2;
      },
      onBack() {
        this.active = 0;
      }
    }
  };
</script>
