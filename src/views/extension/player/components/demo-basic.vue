<template>
  <el-card shadow="never" header="基础演示">
    <!-- 操作按钮 -->
    <div style="margin-bottom: 10px" class="ele-action-group">
      <el-button size="mini" :disabled="!ready" @click="play">播放</el-button>
      <el-button size="mini" :disabled="!ready" @click="pause">暂停</el-button>
      <el-button size="mini" :disabled="!ready" @click="replay">
        重新播放
      </el-button>
      <el-button size="mini" :disabled="!ready" @click="changeSrc">
        切换视频源
      </el-button>
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
          id: 'demoPlayer1',
          lang: 'zh-cn',
          // 宽度 100%
          fluid: true,
          // 视频地址
          url: 'https://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
          // 封面
          poster:
            'https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/solution/general-video/css/img/scene/1.png',
          // 开启倍速播放
          playbackRate: [0.5, 1, 1.5, 2],
          // 开启画中画
          pip: true
        },
        // 视频播放器实例
        player: null,
        // 视频播放器是否实例化完成
        ready: false
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
      /* 播放 */
      play() {
        if (this.player.paused) {
          this.player.play();
        }
      },
      /* 暂停 */
      pause() {
        if (!this.player.paused) {
          this.player.pause();
        }
      },
      /* 重新播放 */
      replay() {
        this.player.replay();
      },
      /* 切换视频源 */
      changeSrc() {
        this.player.src =
          'https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_TheatricalTeaser_WeAreOverwatch_zhCN.mp4';
        if (this.player.paused) {
          this.player.play();
        }
      }
    }
  };
</script>
