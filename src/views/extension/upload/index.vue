<template>
  <div class="ele-body">
    <demo-basic />
    <demo-advanced />
    <demo-multiple />
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoAdvanced from './components/demo-advanced.vue';
  import DemoMultiple from './components/demo-multiple.vue';

  export default {
    name: 'ExtensionUpload',
    components: { DemoBasic, DemoAdvanced, DemoMultiple }
  };
</script>
