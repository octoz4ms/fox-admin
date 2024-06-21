<template>
  <div class="ele-body">
    <el-card shadow="never" header="省市区级联选择">
      <div style="max-width: 280px">
        <regions-select
          v-model="city"
          placeholder="请选择省市区"
          class="ele-fluid"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="省市级联选择">
      <div style="max-width: 280px">
        <regions-select
          v-model="provinceCity"
          placeholder="请选择省市"
          type="provinceCity"
          class="ele-fluid"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="省选择">
      <div style="max-width: 280px">
        <regions-select
          v-model="province"
          placeholder="请选择省"
          type="province"
          class="ele-fluid"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="可多选">
      <div style="max-width: 280px">
        <regions-select
          v-model="citys"
          placeholder="请选择省市区"
          :props="{ multiple: true }"
          class="ele-fluid"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
  import RegionsSelect from '@/components/RegionsSelect/index.vue';

  export default {
    name: 'ExtensionRegions',
    components: { RegionsSelect },
    data() {
      return {
        city: [],
        provinceCity: [],
        province: [],
        citys: []
      };
    }
  };
</script>
