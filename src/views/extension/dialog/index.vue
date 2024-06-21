<template>
  <div class="ele-body ele-body-card">
    <demo-modal />
    <multiple-modal />
  </div>
</template>

<script>
  import DemoModal from './components/demo-modal.vue';
  import MultipleModal from './components/multiple-modal.vue';

  export default {
    name: 'ExtensionDialog',
    components: {
      DemoModal,
      MultipleModal
    }
  };
</script>
