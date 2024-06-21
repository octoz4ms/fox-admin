<template>
  <div class="ele-body">
    <el-card
      shadow="never"
      style="margin-bottom: 15px"
      body-style="padding: 40px 15px;"
    >
      <div class="top-search-group">
        <el-input placeholder="请输入内容" v-model="keyword" />
        <el-button type="primary">搜索</el-button>
      </div>
    </el-card>
    <el-row :gutter="15">
      <el-col
        v-for="(item, index) in data"
        :key="index"
        v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }"
      >
        <el-card class="application-list-item ele-card-border" shadow="never">
          <div class="application-list-body">
            <div class="ele-cell">
              <el-avatar :size="34" :src="item.cover" />
              <h6 class="ele-cell-content">
                <b>{{ item.title }}</b>
              </h6>
            </div>
            <div class="application-body-item ele-elip">
              网址: {{ item.url }}
            </div>
            <div class="application-body-item ele-elip">
              最后更新时间: {{ item.time }}
            </div>
          </div>
          <el-divider />
          <div class="application-list-footer">
            <div class="application-list-tool">
              <el-tooltip content="下载" placement="top">
                <i class="el-icon-download ele-text-secondary"></i>
              </el-tooltip>
            </div>
            <el-divider direction="vertical" class="line-color-light" />
            <div class="application-list-tool">
              <el-tooltip content="编辑" placement="top">
                <i class="el-icon-edit ele-text-secondary"></i>
              </el-tooltip>
            </div>
            <el-divider direction="vertical" class="line-color-light" />
            <div class="application-list-tool">
              <el-tooltip content="分享" placement="top">
                <i class="el-icon-share ele-text-secondary"></i>
              </el-tooltip>
            </div>
            <el-divider direction="vertical" class="line-color-light" />
            <div class="application-list-tool">
              <el-dropdown placement="bottom">
                <i class="el-icon-more ele-text-secondary"></i>
                <template v-slot:dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>1st menu item</el-dropdown-item>
                    <el-dropdown-item>2nd menu item</el-dropdown-item>
                    <el-dropdown-item>3d menu item</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ListCardApplication',
    data() {
      return {
        keyword: '',
        data: [
          {
            title: 'ElementUI',
            url: 'https://element.eleme.cn',
            time: '2 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
          },
          {
            title: 'Vue.js',
            url: 'https://cn.vuejs.org',
            time: '4 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
          },
          {
            title: 'Vuex',
            url: 'https://vuex.vuejs.org',
            time: '12 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
          },
          {
            title: 'Vue Router',
            url: 'https://vuex.vuejs.org',
            time: '14 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
          },
          {
            title: 'Sass',
            url: 'https://www.sass.hk',
            time: '10 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
          },
          {
            title: 'Axios',
            url: 'http://www.axios-js.com',
            time: '16 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/faa0202700ee455b90fe77d8bef98bc0.jpg'
          },
          {
            title: 'Webpack',
            url: 'https://www.webpackjs.com',
            time: '6 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/d3519518b00d42d3936b2ab5ce3a4cc3.jpg'
          },
          {
            title: 'Node.js',
            url: 'http://nodejs.cn',
            time: '8 小时前',
            cover:
              'https://cdn.eleadmin.com/20200609/fe9196dd091e438fba115205c1003ee7.jpg'
          }
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
  .top-search-group {
    max-width: 500px;
    margin: 0 auto;
    display: flex;

    :deep(.el-input input) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-width: 0;
    }

    .el-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  /* 应用列表 */
  .application-list-item {
    margin-bottom: 15px;

    :deep(.el-card__body) {
      padding: 0;
    }
  }

  .application-list-body {
    padding: 12px 15px 15px 15px;
  }

  .application-body-item {
    margin-top: 12px;
  }

  .application-body-item + .application-body-item {
    margin-top: 8px;
  }

  .application-list-footer {
    display: flex;
    padding: 8px 0;

    :deep(.el-divider--vertical) {
      height: 36px;
    }
  }

  .application-list-tool {
    flex: 1;
    text-align: center;

    :deep(i) {
      font-size: 18px;
      line-height: 36px;
      cursor: pointer;
    }
  }
</style>
