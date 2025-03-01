<template>
  <div class="schema-viewer">
    <div v-if="isRef" class="schema-ref">
      <span class="font-mono text-sm text-primary-600 dark:text-primary-400">
        {{ refName }}
      </span>
    </div>
    
    <div v-else-if="schema.type === 'object'" class="schema-object">
      <div v-if="schema.properties" class="schema-properties">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800 text-left">
              <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Property</th>
              <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
              <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
              <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Required</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(propSchema, propName) in schema.properties" 
              :key="propName"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ propName }}</td>
              <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">
                {{ getPropertyType(propSchema) }}
              </td>
              <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                {{ propSchema.description || '-' }}
              </td>
              <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                <span v-if="isRequired(propName)" class="text-red-500">✓</span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
        No properties defined
      </div>
    </div>
    
    <div v-else-if="schema.type === 'array'" class="schema-array">
      <div class="text-sm mb-2">
        <span class="font-medium">Array of:</span>
      </div>
      
      <div class="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
        <SchemaViewer 
          v-if="schema.items" 
          :schema="schema.items" 
          :components="components" 
          :expanded="false" 
        />
      </div>
    </div>
    
    <div v-else class="schema-primitive">
      <div class="text-sm">
        <span class="font-medium">Type:</span> {{ schema.type }}
        <span v-if="schema.format" class="ml-2">
          <span class="font-medium">Format:</span> {{ schema.format }}
        </span>
        <span v-if="schema.enum" class="ml-2">
          <span class="font-medium">Enum:</span> {{ schema.enum.join(', ') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  components: {
    type: Object,
    default: () => ({})
  },
  expanded: {
    type: Boolean,
    default: false
  }
})

const isRef = computed(() => {
  return !!props.schema.$ref
})

const refName = computed(() => {
  if (!isRef.value) return ''
  
  return props.schema.$ref.split('/').pop()
})

function getPropertyType(propSchema) {
  if (propSchema.$ref) {
    return propSchema.$ref.split('/').pop()
  }
  
  if (propSchema.type === 'array' && propSchema.items) {
    if (propSchema.items.$ref) {
      const refName = propSchema.items.$ref.split('/').pop()
      return `array<${refName}>`
    }
    return `array<${propSchema.items.type || 'any'}>`
  }
  
  return propSchema.type || 'any'
}

function isRequired(propName) {
  return props.schema.required && props.schema.required.includes(propName)
}
</script>