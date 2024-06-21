<template>
  <el-card shadow="never" header="轨迹回放">
    <div ref="trackMap" style="max-width: 800px; height: 300px"></div>
    <div style="margin-top: 15px">
      <el-button size="small" @click="startTrackAnim">开始移动</el-button>
      <el-button size="small" @click="pauseTrackAnim">暂停移动</el-button>
      <el-button size="small" @click="resumeTrackAnim">继续移动</el-button>
    </div>
  </el-card>
</template>

<script>
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { MAP_KEY } from '@/config/setting';

  export default {
    data() {
      return {
        // 小车轨迹地图的实例
        mapInsTrack: null,
        // 小车的 marker
        carMarker: null,
        // 轨迹路线
        lineData: [
          [116.478935, 39.997761],
          [116.478939, 39.997825],
          [116.478912, 39.998549],
          [116.478912, 39.998549],
          [116.478998, 39.998555],
          [116.478998, 39.998555],
          [116.479282, 39.99856],
          [116.479658, 39.998528],
          [116.480151, 39.998453],
          [116.480784, 39.998302],
          [116.480784, 39.998302],
          [116.481149, 39.998184],
          [116.481573, 39.997997],
          [116.481863, 39.997846],
          [116.482072, 39.997718],
          [116.482362, 39.997718],
          [116.483633, 39.998935],
          [116.48367, 39.998968],
          [116.484648, 39.999861]
        ]
      };
    },
    computed: {
      // 是否是暗黑模式
      darkMode() {
        return this.$store?.state?.theme?.darkMode;
      }
    },
    mounted() {
      this.renderTrackMap();
    },
    methods: {
      /* 渲染轨迹回放地图 */
      renderTrackMap() {
        AMapLoader.load({
          key: MAP_KEY,
          version: '2.0',
          plugins: ['AMap.MoveAnimation', 'AMap.Marker', 'AMap.Polyline']
        })
          .then((AMap) => {
            // 渲染地图
            const option = {
              zoom: 17,
              center: [116.478935, 39.997761]
            };
            if (this.darkMode) {
              option.mapStyle = 'amap://styles/dark';
            }
            this.mapInsTrack = new AMap.Map(this.$refs.trackMap, option);
            // 创建小车 marker
            this.carMarker = new AMap.Marker({
              map: this.mapInsTrack,
              position: [116.478935, 39.997761],
              icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
              offset: new AMap.Pixel(-13, -26)
            });
            // 绘制轨迹
            new AMap.Polyline({
              map: this.mapInsTrack,
              path: this.lineData,
              showDir: true,
              strokeColor: '#28F', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 6 // 线宽
              //strokeStyle: 'solid'  // 线样式
            });
            // 通过的轨迹
            const passedPolyline = new AMap.Polyline({
              map: this.mapInsTrack,
              showDir: true,
              strokeColor: '#4B5', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 6 // 线宽
            });
            // 小车移动回调
            this.carMarker.on('moving', function (e) {
              passedPolyline.setPath(e.passedPath);
            });
            // 地图自适应
            this.mapInsTrack.setFitView();
          })
          .catch((e) => {
            console.error(e);
          });
      },
      /* 开始轨迹回放动画 */
      startTrackAnim() {
        if (this.carMarker) {
          this.carMarker.stopMove();
          this.carMarker.moveAlong(this.lineData, {
            duration: 200,
            autoRotation: true
          });
        }
      },
      /* 暂停轨迹回放动画 */
      pauseTrackAnim() {
        if (this.carMarker) {
          this.carMarker.pauseMove();
        }
      },
      /* 继续开始轨迹回放动画 */
      resumeTrackAnim() {
        if (this.carMarker) {
          this.carMarker.resumeMove();
        }
      }
    },
    watch: {
      darkMode(value) {
        if (this.mapInsTrack) {
          if (value) {
            this.mapInsTrack.setMapStyle('amap://styles/dark');
          } else {
            this.mapInsTrack.setMapStyle('amap://styles/normal');
          }
        }
      }
    },
    unmounted() {
      if (this.mapInsTrack) {
        this.mapInsTrack.destroy();
      }
      this.carMarker = null;
    }
  };
</script>
