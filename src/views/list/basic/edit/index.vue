<template>
  <div class="ele-body">
    <el-card shadow="never">
      <div v-loading="loading">
        <edit-form :data="user" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import EditForm from '../components/edit-form.vue';
  import { getUser } from '@/api/system/user';

  export default {
    name: 'ListBasicEdit',
    components: { EditForm },
    data() {
      return {
        loading: true,
        user: undefined
      };
    },
    created() {
      this.query();
    },
    methods: {
      query() {
        const { query } = this.$route;
        if (query.id) {
          getUser(Number(query.id))
            .then((data) => {
              this.loading = false;
              this.user = data;
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        }
      }
    }
  };
</script>
