<template>
  <div style="padding: 0 15px">
    <ele-result title="操作成功" desc="预计两小时内到账">
      <el-form label-width="100px" size="mini" class="ele-form-detail">
        <el-form-item label="付款账户:">
          <span style="word-break: break-all">{{ data.account }}</span>
        </el-form-item>
        <el-form-item label="收款账户:">
          <span style="word-break: break-all">{{ data.receiver }}</span>
        </el-form-item>
        <el-form-item label="收款人姓名:">
          <span>{{ data.name }}</span>
        </el-form-item>
        <el-form-item label="转账金额:" style="margin-bottom: 0">
          <span style="font-size: 24px">{{ data.amount }}</span>
          <span> 元</span>
        </el-form-item>
      </el-form>
      <template v-slot:actions>
        <el-button type="primary" @click="back">再转一笔</el-button>
        <el-button>查看账单</el-button>
      </template>
    </ele-result>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      back() {
        this.$emit('back');
      }
    }
  };
</script>
