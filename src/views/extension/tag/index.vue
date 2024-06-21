<template>
  <div class="ele-body">
    <el-card shadow="never" header="标签组件" body-style="overflow: auto;">
      <div style="min-width: 460px">
        <div class="ele-cell">
          <div>默认样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme">标签一</el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="success">
              标签二
            </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="info">
              标签三
            </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="warning">
              标签四
            </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="danger">
              标签五
            </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div>圆角样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme" class="ele-tag-radius">
              标签一
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="success"
              class="ele-tag-radius"
            >
              标签二
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="info"
              class="ele-tag-radius"
            >
              标签三
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="warning"
              class="ele-tag-radius"
            >
              标签四
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="danger"
              class="ele-tag-radius"
            >
              标签五
            </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div>圆形样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme" class="ele-tag-round">
              1
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="success"
              class="ele-tag-round"
            >
              2
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="info"
              class="ele-tag-round"
            >
              3
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="warning"
              class="ele-tag-round"
            >
              4
            </el-tag>
            <el-tag
              :size="tagSize"
              :effect="tagTheme"
              type="danger"
              class="ele-tag-round"
            >
              5
            </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div>尺寸设置:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="tagSize">
              <el-radio label="large">默认</el-radio>
              <el-radio label="medium">中等</el-radio>
              <el-radio label="small">小型</el-radio>
              <el-radio label="mini">超小</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="ele-cell">
          <div>主题设置:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="tagTheme">
              <el-radio label="light">light</el-radio>
              <el-radio label="dark">dark</el-radio>
              <el-radio label="plain">plain</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="标签输入">
      <ele-tags-input v-model="tags" :size="tagSize" :effect="tagTheme" />
      <div style="margin: 8px 0">{{ JSON.stringify(tags) }}</div>
      <div style="margin: 8px 0">自定义异步验证:</div>
      <ele-tags-input
        :validator="validator"
        v-model="tags2"
        :size="tagSize"
        :effect="tagTheme"
      />
    </el-card>
    <el-card shadow="never" header="状态文字" body-style="overflow: auto;">
      <div style="min-width: 360px">
        <div class="ele-cell">
          <div>默认效果:</div>
          <div class="ele-cell-content">
            <ele-dot :ripple="ripple" text="运行中" />
            <ele-dot type="success" :ripple="ripple" text="已上线" />
            <ele-dot type="danger" :ripple="ripple" text="异常" />
            <ele-dot type="info" :ripple="ripple" text="关闭" />
          </div>
        </div>
        <div class="ele-cell">
          <div>大小设置:</div>
          <div class="ele-cell-content">
            <ele-dot :ripple="ripple" text="运行中" size="8px" />
            <ele-dot type="success" :ripple="ripple" text="已上线" size="8px" />
            <ele-dot type="danger" :ripple="ripple" text="异常" size="8px" />
            <ele-dot type="info" :ripple="ripple" text="关闭" size="8px" />
          </div>
        </div>
        <div class="ele-cell">
          <div>显示动画:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="ripple">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionTag',
    data() {
      return {
        tagSize: 'small',
        tagTheme: 'light',
        tags: ['标签一', '标签二', '标签三'],
        tags2: ['标签一', '标签二', '标签三'],
        ripple: true
      };
    },
    methods: {
      validator(value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error(value + '不合法, 请重新输入'));
          }, 1000);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ele-cell + .ele-cell {
    margin-top: 16px;
  }

  .ele-dot + .ele-dot {
    margin-left: 16px;
  }
</style>
