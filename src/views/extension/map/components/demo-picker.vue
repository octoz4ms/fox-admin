<template>
  <el-card shadow="never" header="地图位置选择器">
    <div style="display: flex; align-items: center">
      <div style="width: 140px; margin-right: 12px">
        <el-select size="small" class="ele-fluid" v-model="searchType">
          <el-option label="POI检索模式" :value="0" />
          <el-option label="关键字检索模式" :value="1" />
        </el-select>
      </div>
      <el-button size="small" class="ele-btn-icon" @click="openMapPicker">
        打开地图位置选择器
      </el-button>
    </div>
    <div style="margin-top: 12px">选择位置: {{ result.location }}</div>
    <div style="margin-top: 12px">详细地址: {{ result.address }}</div>
    <div style="margin-top: 12px"> 经 纬 度 : {{ result.coordinate }}</div>
    <!-- 地图位置选择弹窗 -->
    <ele-map-picker
      :need-city="true"
      :show.sync="visible"
      :lock-scroll="false"
      :close-on-click-modal="false"
      :search-type="searchType"
      :dark-mode="darkMode"
      @done="onChoose"
    />
  </el-card>
</template>

<script>
  import EleMapPicker from 'ele-admin/es/ele-map-picker';

  export default {
    components: { EleMapPicker },
    data() {
      return {
        // 是否显示地图选择弹窗
        visible: false,
        // 地点检索类型
        searchType: 0,
        // 选择结果
        result: {
          location: '',
          address: '',
          coordinate: ''
        }
      };
    },
    computed: {
      // 是否是暗黑模式
      darkMode() {
        return this.$store?.state?.theme?.darkMode;
      }
    },
    methods: {
      /* 地图选择后回调 */
      onChoose(location) {
        console.log(location);
        this.result = {
          location: [
            location.city.province,
            location.city.city,
            location.city.district
          ].join('/'),
          address: location.name + ' ' + location.address,
          coordinate: location.lng + ',' + location.lat
        };
        this.visible = false;
      },
      /* 打开地图选择弹窗 */
      openMapPicker() {
        this.visible = true;
      }
    }
  };
</script>
