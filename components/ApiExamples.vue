<template>
  <div class="w-96 border-l border-gray-200 dark:border-gray-800 h-full overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
    <div v-if="selectedOperation">
      <h3 class="text-lg font-semibold mb-4">Request Examples</h3>
      
      <div class="mb-6">
        <div class="flex gap-2 mb-2">
          <button 
            v-for="lang in ['cURL', 'JavaScript', 'Python', 'Go']" 
            :key="lang"
            class="px-3 py-1 text-sm rounded-full"
            :class="activeLanguage === lang ? 
              'bg-primary-100 dark:bg-primary-900/30 text-primary- 600 dark:text-primary-400' : 
              'hover:bg-gray-200 dark:hover:bg-gray-800'"
            @click="activeLanguage = lang"
          >
            {{ lang }}
          </button>
        </div>
        
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div class="p-2 bg-gray-200 dark:bg-gray-700 flex justify-between items-center">
            <span class="text-sm font-medium">{{ activeLanguage }} Example</span>
            <button 
              class="text-xs px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded"
              @click="copyExample"
            >
              Copy
            </button>
          </div>
          <pre class="p-4 text-sm font-mono overflow-x-auto" ref="codeExample">{{ getExample() }}</pre>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-4">Response Examples</h3>
      
      <div class="space-y-4">
        <div 
          v-for="(response, statusCode) in selectedOperation.responses" 
          :key="statusCode"
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <div class="p-2 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <Badge :type="getStatusCodeType(statusCode)">{{ statusCode }}</Badge>
              <span class="text-sm font-medium">{{ getShortResponseDescription(response.description) }}</span>
            </div>
            <button 
              class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded"
              @click="copyResponseExample(statusCode)"
            >
              Copy
            </button>
          </div>
          
          <pre class="p-4 text-sm font-mono overflow-x-auto">{{ getResponseExample(statusCode, response) }}</pre>
        </div>
      </div>
    </div>
    
    <div v-else-if="selectedSchema">
      <h3 class="text-lg font-semibold mb-4">Schema Example</h3>
      
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div class="p-2 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
          <span class="text-sm font-medium">{{ selectedSchemaName }}</span>
          <button 
            class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded"
            @click="copySchemaExample"
          >
            Copy
          </button>
        </div>
        
        <pre class="p-4 text-sm font-mono overflow-x-auto">{{ getSchemaExample() }}</pre>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <div class="i-carbon-code text-4xl mb-4"></div>
      <p>Select an operation or schema to see examples</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  apiSpec: {
    type: Object,
    required: true
  },
  selectedOperationInfo: {
    type: Object,
    default: null
  },
  selectedSchemaName: {
    type: String,
    default: ''
  }
})

const activeLanguage = ref('cURL')
const codeExample = ref(null)

const selectedOperation = computed(() => {
  if (!props.selectedOperationInfo || !props.apiSpec.paths) return null
  
  const { operationId, path, method } = props.selectedOperationInfo
  return props.apiSpec.paths[path]?.[method] || null
})

const selectedPath = computed(() => {
  return props.selectedOperationInfo?.path || ''
})

const selectedMethod = computed(() => {
  return props.selectedOperationInfo?.method?.toUpperCase() || ''
})

const selectedSchema = computed(() => {
  if (!props.selectedSchemaName || !props.apiSpec.components?.schemas) return null
  return props.apiSpec.components.schemas[props.selectedSchemaName] || null
})

function getExample() {
  if (!selectedOperation.value) return ''
  
  const method = selectedMethod.value
  const path = selectedPath.value
  const baseUrl = props.apiSpec.servers?.[0]?.url || 'https://api.example.com'
  const url = `${baseUrl}${path}`
  
  switch (activeLanguage.value) {
    case 'cURL':
      return generateCurlExample(method, url)
    case 'JavaScript':
      return generateJavaScriptExample(method, url)
    case 'Python':
      return generatePythonExample(method, url)
    case 'Go':
      return generateGoExample(method, url)
    default:
      return ''
  }
}

function generateCurlExample(method, url) {
  let curl = `curl -X ${method} "${url}"`
  
  // Add headers
  curl += '\n  -H "Content-Type: application/json"'
  curl += '\n  -H "Authorization: Bearer YOUR_API_KEY"'
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      curl += '\n  -d \'{\n'
      
      // Generate example data based on schema
      const schema = selectedOperation.value.requestBody.content[contentType].schema
      if (schema) {
        const example = generateExampleFromSchema(schema)
        curl += `    ${JSON.stringify(example, null, 4).replace(/^{|}$/g, '').trim()}`
      } else {
        curl += '    "property": "value"'
      }
      
      curl += '\n  }\''
    }
  }
  
  return curl
}

function generateJavaScriptExample(method, url) {
  let code = 'const options = {\n'
  code += `  method: "${method}",\n`
  code += '  headers: {\n'
  code += '    "Content-Type": "application/json",\n'
  code += '    "Authorization": "Bearer YOUR_API_KEY"\n'
  code += '  }'
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      code += ',\n  body: JSON.stringify({\n'
      
      // Generate example data based on schema
      const schema = selectedOperation.value.requestBody.content[contentType].schema
      if (schema) {
        const example = generateExampleFromSchema(schema)
        code += `    ${JSON.stringify(example, null, 4).replace(/^{|}$/g, '').trim()}`
      } else {
        code += '    "property": "value"'
      }
      
      code += '\n  })'
    }
  }
  
  code += '\n};\n\n'
  code += `fetch("${url}", options)\n`
  code += '  .then(response => response.json())\n'
  code += '  .then(data => console.log(data))\n'
  code += '  .catch(error => console.error("Error:", error));'
  
  return code
}

function generatePythonExample(method, url) {
  let code = 'import requests\n\n'
  
  // Add headers
  code += 'headers = {\n'
  code += '    "Content-Type": "application/json",\n'
  code += '    "Authorization": "Bearer YOUR_API_KEY"\n'
  code += '}\n\n'
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method.toLowerCase()) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      code += 'data = {\n'
      
      // Generate example data based on schema
      const schema = selectedOperation.value.requestBody.content[contentType].schema
      if (schema) {
        const example = generateExampleFromSchema(schema)
        code += `    ${JSON.stringify(example, null, 4).replace(/^{|}$/g, '').trim()}`
      } else {
        code += '    "property": "value"'
      }
      
      code += '\n}\n\n'
    }
  }
  
  // Build request
  code += `response = requests.${method.toLowerCase()}("${url}", headers=headers`
  
  if (['post', 'put', 'patch'].includes(method.toLowerCase()) && selectedOperation.value.requestBody) {
    code += ', json=data'
  }
  
  code += ')\n\n'
  code += 'print(response.json())'
  
  return code
}

function generateGoExample(method, url) {
  let code = 'package main\n\n'
  code += 'import (\n'
  code += '    "bytes"\n'
  code += '    "encoding/json"\n'
  code += '    "fmt"\n'
  code += '    "io/ioutil"\n'
  code += '    "net/http"\n'
  code += ')\n\n'
  code += 'func main() {\n'
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      code += '    // Create request body\n'
      code += '    requestBody, err := json.Marshal(map[string]interface{}{\n'
      
      // Generate example data based on schema
      const schema = selectedOperation.value.requestBody.content[contentType].schema
      if (schema) {
        const example = generateExampleFromSchema(schema)
        Object.entries(example).forEach(([key, value]) => {
          code += `        "${key}": ${JSON.stringify(value)},\n`
        })
      } else {
        code += '        "property": "value",\n'
      }
      
      code += '    })\n'
      code += '    if err != nil {\n'
      code += '        fmt.Println("Error creating request body:", err)\n'
      code += '        return\n'
      code += '    }\n\n'
    }
  }
  
  // Create request
  code += '    // Create request\n'
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    code += '    req, err := http.NewRequest("' + method + '", "' + url + '", bytes.NewBuffer(requestBody))\n'
  } else {
    code += '    req, err := http.NewRequest("' + method + '", "' + url + '", nil)\n'
  }
  
  code += '    if err != nil {\n'
  code += '        fmt.Println("Error creating request:", err)\n'
  code += '        return\n'
  code += '    }\n\n'
  
  // Add headers
  code += '    // Add headers\n'
  code += '    req.Header.Set("Content-Type", "application/json")\n'
  code += '    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")\n\n'
  
  // Send request
  code += '    // Send request\n'
  code += '    client := &http.Client{}\n'
  code += '    resp, err := client.Do(req)\n'
  code += '    if err != nil {\n'
  code += '        fmt.Println("Error sending request:", err)\n'
  code += '        return\n'
  code += '    }\n'
  code += '    defer resp.Body.Close()\n\n'
  
  // Process response
  code += '    // Read response\n'
  code += '    body, err := ioutil.ReadAll(resp.Body)\n'
  code += '    if err != nil {\n'
  code += '        fmt.Println("Error reading response:", err)\n'
  code += '        return\n'
  code += '    }\n\n'
  code += '    fmt.Println("Response Status:", resp.Status)\n'
  code += '    fmt.Println("Response Body:", string(body))\n'
  code += '}'
  
  return code
}

function getResponseExample(statusCode, response) {
  if (!response.content) return '// No content defined for this response'
  
  const contentType = Object.keys(response.content)[0]
  if (!contentType) return '// No content type defined for this response'
  
  const mediaType = response.content[contentType]
  if (!mediaType.schema) return '// No schema defined for this response'
  
  // If there's an example, use it
  if (mediaType.example) {
    return JSON.stringify(mediaType.example, null, 2)
  }
  
  // Otherwise, generate an example from the schema
  const example = generateExampleFromSchema(mediaType.schema)
  return JSON.stringify(example, null, 2)
}

function getSchemaExample() {
  if (!selectedSchema.value) return '{}'
  
  // If there's an example, use it
  if (selectedSchema.value.example) {
    return JSON.stringify(selectedSchema.value.example, null, 2)
  }
  
  // Otherwise, generate an example from the schema
  const example = generateExampleFromSchema(selectedSchema.value)
  return JSON.stringify(example, null, 2)
}

function generateExampleFromSchema(schema, visited = new Set()) {
  // Handle circular references
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    
    // Avoid infinite recursion
    if (visited.has(refName)) {
      return { [refName]: '...' }
    }
    
    visited.add(refName)
    
    const refSchema = props.apiSpec.components?.schemas?.[refName]
    if (refSchema) {
      return generateExampleFromSchema(refSchema, visited)
    }
    
    return { [refName]: {} }
  }
  
  // Handle allOf, oneOf, anyOf
  if (schema.allOf) {
    let result = {}
    schema.allOf.forEach(subSchema => {
      result = { ...result, ...generateExampleFromSchema(subSchema, visited) }
    })
    return result
  }
  
  if (schema.oneOf || schema.anyOf) {
    const subSchemas = schema.oneOf || schema.anyOf
    if (subSchemas.length > 0) {
      return generateExampleFromSchema(subSchemas[0], visited)
    }
  }
  
  // Handle different types
  switch (schema.type) {
    case 'object':
      const result = {}
      
      if (schema.properties) {
        Object.entries(schema.properties).forEach(([propName, propSchema]) => {
          result[propName] = generateExampleFromSchema(propSchema, new Set([...visited]))
        })
      }
      
      return result
      
    case 'array':
      if (schema.items) {
        return [generateExampleFromSchema(schema.items, visited)]
      }
      return []
      
    case 'string':
      if (schema.enum && schema.enum.length > 0) {
        return schema.enum[0]
      }
      
      if (schema.format === 'date') {
        return '2025-01-01'
      }
      
      if (schema.format === 'date-time') {
        return '2025-01-01T12:00:00Z'
      }
      
      if (schema.format === 'email') {
        return 'user@example.com'
      }
      
      if (schema.format === 'uri') {
        return 'https://example.com'
      }
      
      return 'string'
      
    case 'number':
    case 'integer':
      return 0
      
    case 'boolean':
      return false
      
    default:
      return null
  }
}

function getStatusCodeType(statusCode) {
  const code = parseInt(statusCode, 10)
  if (code >= 200 && code < 300) return 'success'
  if (code >= 300 && code < 400) return 'info'
  if (code >= 400 && code < 500) return 'warning'
  if (code >= 500) return 'error'
  return 'info'
}

function getShortResponseDescription(description) {
  if (!description) return ''
  return description.length > 30 ? description.substring(0, 30) + '...' : description
}

function copyExample() {
  if (codeExample.value) {
    navigator.clipboard.writeText(getExample())
  }
}

function copyResponseExample(statusCode) {
  const response = selectedOperation.value.responses[statusCode]
  navigator.clipboard.writeText(getResponseExample(statusCode, response))
}

function copySchemaExample() {
  navigator.clipboard.writeText(getSchemaExample())
}
</script>