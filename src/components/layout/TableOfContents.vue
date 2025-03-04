<script setup lang="ts">
defineProps<{
  components: Array<{
    id: string
    title: string
    component: any
  }>
  activeComponent: {
    id: string
    title: string
    component: any
  }
}>()

const emit = defineEmits<{
  (e: 'select', component: any): void
}>()
</script>

<template>
  <aside class="w-64 border-r border-border bg-bg-secondary overflow-y-auto">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4">Components</h2>
      <nav>
        <ul class="space-y-1">
          <li v-for="component in components" :key="component.id">
            <button
              class="w-full text-left px-3 py-2 rounded-md transition-colors"
              :class="{
                'bg-primary text-text-inverted': activeComponent.id === component.id,
                'hover:bg-bg-muted': activeComponent.id !== component.id
              }"
              @click="emit('select', component)"
            >
              {{ component.title }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>