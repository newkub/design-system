<template>
  <div 
    class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 cursor-pointer"
    @click="openComponentModal"
  >
    <!-- Component Preview -->
    <div class="h-32 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-200">
      <component 
        v-if="component.preview"
        :is="component.preview().component" 
        v-bind="component.preview().props"
      >
        {{ component.preview().content }}
        <template v-if="component.preview().slots" v-for="(slotContent, name) in component.preview().slots" #[name]>
          {{ slotContent }}
        </template>
      </component>
      <div v-else class="text-gray-400 text-sm">Preview not available</div>
    </div>
    
    <div class="p-4">
      <!-- Component Title and Link -->
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-bold">{{ component.title }}</h3>
        <div class="text-blue-600 hover:text-blue-800">
          <div class="i-carbon-arrow-right"></div>
        </div>
      </div>
      
      <!-- Component Description -->
      <p class="text-gray-600 text-sm mb-4">{{ component.description }}</p>
      
      <!-- Tags and Category -->
      <div class="flex flex-wrap items-center gap-2 mt-auto">
        <!-- Category Badge -->
        <span 
          class="text-xs px-2 py-1 rounded-full"
          :class="getCategoryColor(component.category)"
        >
          {{ component.category }}
        </span>
        
        <!-- Tags -->
        <span 
          v-for="tag in component.tags" 
          :key="tag"
          class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  component: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['open-modal']);

// Get color for category badge
function getCategoryColor(category) {
  const colorMap = {
    'layout': 'bg-purple-100 text-purple-800',
    'form': 'bg-blue-100 text-blue-800',
    'feedback': 'bg-amber-100 text-amber-800',
    'navigation': 'bg-green-100 text-green-800',
    'data-display': 'bg-indigo-100 text-indigo-800'
  };
  
  return colorMap[category] || 'bg-gray-100 text-gray-800';
}

function openComponentModal() {
  emit('open-modal', props.component);
}
</script>