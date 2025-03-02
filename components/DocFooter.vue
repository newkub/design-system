<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-gray-950 w-full">
    <div class="w-full px-4 text-center">
      <p v-if="footer.message" class="text-gray-600 dark:text-gray-400">
        {{ footer.message }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
        {{ footer.copyright || `Copyright © ${new Date().getFullYear()}` }}
      </p>
    </div>
  </footer>
</template>

<script setup>
const { themeConfig } = useConfig()
const footer = computed(() => themeConfig.footer || {})
</script>