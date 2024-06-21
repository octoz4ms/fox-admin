<template>
  <div class="ele-body ele-body-card">
    <demo-list />
    <demo-grid />
    <demo-table />
  </div>
</template>

<script>
  import DemoList from './components/demo-list.vue';
  import DemoGrid from './components/demo-grid.vue';
  import DemoTable from './components/demo-table.vue';

  export default {
    name: 'ExtensionDragSort',
    components: { DemoList, DemoGrid, DemoTable }
  };
</script>
