<template>
  <div class="w-64 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto">
    <div class="p-4">
      <div class="relative mb-4">
        <input 
          type="text" 
          placeholder="Search API..." 
          class="w-full px-3 py-2 pl-9 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <div class="i-carbon-search"></div>
        </div>
      </div>
      
      <!-- API Info -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <div class="i-carbon-api text-primary-500"></div>
          <h3 class="font-semibold">{{ apiSpec.info?.title || 'API Reference' }}</h3>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {{ apiSpec.info?.description || 'API Documentation' }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-500">
          Version: {{ apiSpec.info?.version || '1.0.0' }}
        </div>
      </div>
      
      <!-- Endpoints -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold uppercase text-gray-500">Endpoints</h3>
          <button class="text-xs text-primary-500 hover:underline">Expand All</button>
        </div>
        
        <div v-if="apiSpec.tags" class="space-y-2">
          <div v-for="tag in apiSpec.tags" :key="tag.name" class="endpoint-group">
            <div 
              class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="toggleTag(tag.name)"
            >
              <div class="flex items-center gap-2">
                <div class="i-carbon-folder"></div>
                <span class="font-medium">{{ tag.name }}</span>
              </div>
              <div :class="expandedTags[tag.name] ? 'i-carbon-chevron-down' : 'i-carbon-chevron-right'"></div>
            </div>
            
            <div v-if="expandedTags[tag.name]" class="pl-4 mt-1 space-y-1">
              <div 
                v-for="operation in getOperationsByTag(tag.name)" 
                :key="operation.operationId"
                class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                :class="{ 'bg-primary-50 dark:bg-primary-900/30': isSelectedOperation(operation) }"
                @click="selectOperation(operation)"
              >
                <span 
                  class="text-xs px-1.5 py-0.5 rounded font-bold" 
                  :class="methodColors[operation.method.toUpperCase()]"
                >
                  {{ operation.method.toUpperCase() }}
                </span>
                <span class="text-sm truncate">{{ getOperationName(operation) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Schemas -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold uppercase text-gray-500">Schemas</h3>
          <button class="text-xs text-primary-500 hover:underline">Expand All</button>
        </div>
        
        <div v-if="apiSpec.components?.schemas" class="space-y-1">
          <div 
            v-for="(schema, name) in apiSpec.components.schemas" 
            :key="name"
            class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            :class="{ 'bg-primary-50 dark:bg-primary-900/30': selectedSchemaName === name }"
            @click="selectSchema(name)"
          >
            <div class="i-carbon-data-base"></div>
            <span class="text-sm">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  apiSpec: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select-operation', 'select-schema'])

const expandedTags = ref({})
const selectedOperationId = ref('')
const selectedSchemaName = ref('')

const methodColors = {
  GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  PATCH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

// Initialize expanded tags
onMounted(() => {
  if (props.apiSpec.tags) {
    props.apiSpec.tags.forEach(tag => {
      expandedTags.value[tag.name] = false
    })
    
    // Expand the first tag by default
    if (props.apiSpec.tags.length > 0) {
      expandedTags.value[props.apiSpec.tags[0].name] = true
    }
  }
})

function toggleTag(tagName) {
  expandedTags.value[tagName] = !expandedTags.value[tagName]
}

function getOperationsByTag(tagName) {
  const operations = []
  
  if (!props.apiSpec.paths) return operations
  
  Object.entries(props.apiSpec.paths).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (method !== 'parameters' && operation.tags && operation.tags.includes(tagName)) {
        operations.push({
          ...operation,
          path,
          method
        })
      }
    })
  })
  
  return operations
}

function getOperationName(operation) {
  return operation.summary || operation.operationId || operation.path
}

function selectOperation(operation) {
  selectedOperationId.value = operation.operationId
  selectedSchemaName.value = ''
  
  emit('select-operation', {
    operationId: operation.operationId,
    path: operation.path,
    method: operation.method
  })
}

function isSelectedOperation(operation) {
  return selectedOperationId.value === operation.operationId
}

function selectSchema(name) {
  selectedSchemaName.value = name
  selectedOperationId.value = ''
  
  emit('select-schema', name)
}
</script>