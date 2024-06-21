<template>
  <el-card shadow="never" header="弹幕功能">
    <!-- 操作按钮 -->
    <div style="margin-bottom: 10px" class="ele-action-group">
      <div style="display: inline-block; width: 160px" class="ele-action">
        <el-input
          v-model="text"
          placeholder="请输入弹幕内容"
          size="mini"
          :disabled="!ready"
        />
      </div>
      <el-button size="mini" :disabled="!ready" @click="shoot">发射</el-button>
    </div>
    <!-- 播放器 -->
    <xgplayer :config="config" @player="onPlayer" />
  </el-card>
</template>

<script>
  import Xgplayer from 'xgplayer-vue';

  export default {
    components: { Xgplayer },
    data() {
      return {
        // 视频播放器配置
        config: {
          id: 'demoPlayer2',
          lang: 'zh-cn',
          fluid: true,
          url: 'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_TheatricalTeaser_WeAreOverwatch_zhCN.mp4',
          poster:
            'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/general-video/css/img/scene/1.png',
          danmu: {
            comments: [
              {
                id: '1',
                start: 0,
                txt: '空降',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '2',
                start: 1500,
                txt: '前方高能',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '3',
                start: 3500,
                txt: '弹幕护体',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '4',
                start: 4500,
                txt: '弹幕护体',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '5',
                start: 6000,
                txt: '前方高能',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '6',
                start: 8500,
                txt: '弹幕护体',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '7',
                start: 10000,
                txt: '666666666',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '8',
                start: 12500,
                txt: '前方高能',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '9',
                start: 15500,
                txt: '666666666',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '10',
                start: 16500,
                txt: '666666666',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '11',
                start: 18000,
                txt: '关弹幕, 保智商',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '12',
                start: 20500,
                txt: '关弹幕, 保智商',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '13',
                start: 22000,
                txt: '666666666',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '14',
                start: 25500,
                txt: '666666666',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              },
              {
                id: '15',
                start: 26000,
                txt: '前方高能',
                duration: 15000,
                color: true,
                style: {
                  color: '#ffcd08',
                  fontSize: '20px'
                }
              }
            ]
          }
        },
        // 视频播放器实例
        player: null,
        // 视频播放器是否实例化完成
        ready: false,
        // 弹幕输入内容
        text: ''
      };
    },
    methods: {
      /* 播放器渲染完成 */
      onPlayer(e) {
        this.player = e;
        this.player.on('play', () => {
          this.ready = true;
        });
      },
      /* 发射弹幕 */
      shoot() {
        if (!this.text) {
          this.$message.error('请输入弹幕内容');
          return;
        }
        this.player.danmu.sendComment({
          id: new Date().getTime(),
          duration: 15000,
          color: true,
          start: this.player.currentTime * 1000,
          txt: this.text,
          style: {
            color: '#fa1f41',
            fontSize: '20px',
            border: 'solid 1px #fa1f41'
          }
        });
        this.text = '';
      }
    }
  };
</script>
