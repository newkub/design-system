<template>
  <div class="events-table mb-8">
    <h3 class="text-lg font-semibold mb-3">Events</h3>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-800 text-left">
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Payload</th>
            <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name" class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ event.name }}</td>
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ event.payload }}</td>
            <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  }
})
</script>