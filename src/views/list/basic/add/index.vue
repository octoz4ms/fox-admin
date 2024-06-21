<template>
  <div class="ele-body">
    <el-card shadow="never">
      <edit-form />
    </el-card>
  </div>
</template>

<script>
  import EditForm from '../components/edit-form.vue';

  export default {
    name: 'ListBasicAdd',
    components: { EditForm }
  };
</script>
