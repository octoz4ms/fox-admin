<template>
  <div class="ele-body">
    <demo-basic />
    <demo-basic-page />
    <demo-multiple />
    <demo-advanced />
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoBasicPage from './components/demo-basic-page.vue';
  import DemoMultiple from './components/demo-multiple.vue';
  import DemoAdvanced from './components/demo-advanced.vue';

  export default {
    name: 'ExtensionTableSelect',
    components: { DemoBasic, DemoBasicPage, DemoMultiple, DemoAdvanced }
  };
</script>
