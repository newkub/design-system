<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <SiteHeader />
    
    <!-- Main content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <ApiSidebar 
        :api-spec="apiSpec" 
        @select-operation="handleSelectOperation"
        @select-schema="handleSelectSchema"
      />
      
      <!-- Main content -->
      <ApiContent 
        :api-spec="apiSpec" 
        :selected-operation-info="selectedOperationInfo"
        :selected-schema-name="selectedSchemaName"
      />
      
      <!-- Examples panel -->
      <ApiExamples 
        :api-spec="apiSpec" 
        :selected-operation-info="selectedOperationInfo"
        :selected-schema-name="selectedSchemaName"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const apiSpec = ref({})
const selectedOperationInfo = ref(null)
const selectedSchemaName = ref('')

function handleSelectOperation(info) {
  selectedOperationInfo.value = info
  selectedSchemaName.value = ''
}

function handleSelectSchema(name) {
  selectedSchemaName.value = name
  selectedOperationInfo.value = null
}

// Fetch the OpenAPI spec
onMounted(async () => {
  try {
    const response = await fetch('/api/openapi')
    apiSpec.value = await response.json()
    
    // Handle route parameters to select the right operation or schema
    const pathParts = route.params.path
    if (pathParts && pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1]
      
      // Check if it's an operation
      if (apiSpec.value.paths) {
        for (const [path, pathItem] of Object.entries(apiSpec.value.paths)) {
          for (const [method, operation] of Object.entries(pathItem)) {
            if (method !== 'parameters' && operation.operationId === lastPart) {
              selectedOperationInfo.value = {
                operationId: operation.operationId,
                path,
                method
              }
              return
            }
          }
        }
      }
      
      // Check if it's a schema
      if (apiSpec.value.components?.schemas && apiSpec.value.components.schemas[lastPart]) {
        selectedSchemaName.value = lastPart
      }
    }
  } catch (error) {
    console.error('Error fetching OpenAPI spec:', error)
  }
})
</script>