<template>
  <div class="props-table mb-8">
    <h3 class="text-lg font-semibold mb-3">Props</h3>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-800 text-left">
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Default</th>
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name" class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ prop.name }}</td>
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ prop.type }}</td>
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ prop.default }}</td>
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  props: {
    type: Array,
    required: true
  }
})
</script>