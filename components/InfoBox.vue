<template>
  <div class="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg my-4">
    <div class="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium mb-2">
      <div class="i-carbon-information"></div>
      <span>Information</span>
    </div>
    <div class="text-blue-700 dark:text-blue-300">
      <slot />
    </div>
  </div>
</template>