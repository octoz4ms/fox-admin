<template>
  <div class="ele-body">
    <demo-basic />
    <demo-multiple />
    <demo-lazy />
    <demo-advanced />
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoMultiple from './components/demo-multiple.vue';
  import DemoLazy from './components/demo-lazy.vue';
  import DemoAdvanced from './components/demo-advanced.vue';

  export default {
    name: 'ExtensionTreeSelect',
    components: { DemoBasic, DemoMultiple, DemoLazy, DemoAdvanced }
  };
</script>
