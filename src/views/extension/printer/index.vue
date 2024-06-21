<template>
  <div class="ele-body">
    <print-this />
    <print-div />
    <print-html />
    <print-page />
    <print-advanced />
  </div>
</template>

<script>
  import PrintThis from './components/print-this.vue';
  import PrintDiv from './components/print-div.vue';
  import PrintHtml from './components/print-html.vue';
  import PrintPage from './components/print-page.vue';
  import PrintAdvanced from './components/print-advanced.vue';

  export default {
    name: 'ExtensionPrinter',
    components: {
      PrintThis,
      PrintDiv,
      PrintHtml,
      PrintPage,
      PrintAdvanced
    }
  };
</script>
