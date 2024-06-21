<template>
  <div class="ele-body">
    <lazy-tree-table />
    <default-sorter />
    <reset-sorter />
    <merge-cell />
  </div>
</template>

<script>
  import LazyTreeTable from './components/lazy-tree-table.vue';
  import DefaultSorter from './components/default-sorter.vue';
  import ResetSorter from './components/reset-sorter.vue';
  import MergeCell from './components/merge-cell.vue';

  export default {
    name: 'ExampleTable',
    components: { LazyTreeTable, DefaultSorter, ResetSorter, MergeCell }
  };
</script>
