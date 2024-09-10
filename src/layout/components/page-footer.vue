<!-- 全局页脚 -->
<template>
  <div class="ele-text-center" style="padding: 16px 0">
    <div>
      <a target="_blank" class="ele-text-secondary" href="https://eleadmin.com">
        {{ $t('layout.footer.website') }}
      </a>
      <em></em>
      <a
        target="_blank"
        class="ele-text-secondary"
        href="https://eleadmin.com/doc/eleadmin/"
      >
        {{ $t('layout.footer.document') }}
      </a>
      <em></em>
      <a
        target="_blank"
        class="ele-text-secondary"
        href="https://eleadmin.com/goods/8"
      >
        {{ $t('layout.footer.authorization') }}
      </a>
    </div>
    <div class="ele-text-secondary" style="margin-top: 8px">
      {{ $t('layout.footer.copyright') }}
      <a href="https://beian.miit.gov.cn">京ICP备2024074477号-1</a>
    </div>
  </div>
</template>

<script>
  export default {};
</script>
