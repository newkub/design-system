<template>
  <NuxtLayout name="docs">
    <div class="flex flex-col h-screen">
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
  </NuxtLayout>
</template>

<script setup>
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
  } catch (error) {
    console.error('Error fetching OpenAPI spec:', error)
  }
})
</script>