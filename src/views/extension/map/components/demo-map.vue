<template>
  <el-card shadow="never" header="官网底部地图">
    <div ref="locationMap" style="max-width: 800px; height: 300px"></div>
  </el-card>
</template>

<script>
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { MAP_KEY } from '@/config/setting';

  export default {
    data() {
      return {
        // 官网底部地图的实例
        mapInsLocation: null
      };
    },
    computed: {
      // 是否是暗黑模式
      darkMode() {
        return this.$store?.state?.theme?.darkMode;
      }
    },
    mounted() {
      this.renderLocationMap();
    },
    methods: {
      /* 渲染官网底部地图 */
      renderLocationMap() {
        AMapLoader.load({
          key: MAP_KEY,
          version: '2.0',
          plugins: ['AMap.InfoWindow', 'AMap.Marker']
        })
          .then((AMap) => {
            // 渲染地图
            const option = {
              zoom: 13, // 初缩放级别
              center: [114.346084, 30.511215 + 0.005] // 初始中心点
            };
            if (this.darkMode) {
              option.mapStyle = 'amap://styles/dark';
            }
            this.mapInsLocation = new AMap.Map(this.$refs.locationMap, option);
            // 创建信息窗体
            const infoWindow = new AMap.InfoWindow({
              content: `
            <div style="color: #333;">
              <div style="padding: 5px;font-size: 16px;">武汉易云智科技有限公司</div>
              <div style="padding: 0 5px;">地址: 湖北省武汉市洪山区雄楚大道222号</div>
              <div style="padding: 0 5px;">电话: 020-123456789</div>
            </div>
            <a
              style="padding: 8px 5px 0;text-decoration: none;display: inline-block;"
              href="//uri.amap.com/marker?position=114.346084,30.511215&name=武汉易云智科技有限公司"
              class="ele-text-primary"
              target="_blank"
            >到这里去→</a>
          `
            });
            infoWindow.open(this.mapInsLocation, [114.346084, 30.511215]);
            const icon = new AMap.Icon({
              size: new AMap.Size(25, 34),
              image:
                '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
              imageSize: new AMap.Size(25, 34)
            });
            const marker = new AMap.Marker({
              icon: icon,
              position: [114.346084, 30.511215],
              offset: new AMap.Pixel(-12, -28)
            });
            marker.setMap(this.mapInsLocation);
            marker.on('click', () => {
              infoWindow.open(this.mapInsLocation);
            });
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
    watch: {
      darkMode(value) {
        if (this.mapInsLocation) {
          if (value) {
            this.mapInsLocation.setMapStyle('amap://styles/dark');
          } else {
            this.mapInsLocation.setMapStyle('amap://styles/normal');
          }
        }
      }
    },
    unmounted() {
      if (this.mapInsLocation) {
        this.mapInsLocation.destroy();
      }
    }
  };
</script>
