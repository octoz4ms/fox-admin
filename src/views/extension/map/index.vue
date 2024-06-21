<template>
  <div class="ele-body">
    <demo-picker />
    <demo-map />
    <demo-track />
  </div>
</template>

<script>
  import DemoPicker from './components/demo-picker.vue';
  import DemoMap from './components/demo-map.vue';
  import DemoTrack from './components/demo-track.vue';

  export default {
    name: 'ExtensionMap',
    components: { DemoPicker, DemoMap, DemoTrack }
  };
</script>
