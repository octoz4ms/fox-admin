<template>
  <div class="ele-body">
    <excel-export />
    <excel-import />
  </div>
</template>

<script>
  import ExcelExport from './components/excel-export.vue';
  import ExcelImport from './components/excel-import.vue';

  export default {
    name: 'ExtensionExcel',
    components: { ExcelExport, ExcelImport }
  };
</script>
