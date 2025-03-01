<template>
  <div class="flex-1 overflow-y-auto px-8 py-6">
    <div v-if="selectedOperation">
      <div class="mb-6">
        <h1 :id="`operation-${selectedOperation.operationId}`" class="text-2xl font-bold mb-2">
          {{ selectedOperation.summary }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ selectedOperation.description }}
        </p>
      </div>
      
      <div class="flex items-center gap-2 mb-6">
        <span 
          class="font-mono text-sm px-2 py-1 rounded font-bold" 
          :class="methodColors[selectedMethod.toUpperCase()]"
        >
          {{ selectedMethod.toUpperCase() }}
        </span>
        <span class="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {{ selectedPath }}
        </span>
      </div>
      
      <!-- Authentication -->
      <div v-if="apiSpec.security && apiSpec.security.length > 0" class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Authentication</h2>
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div v-for="(securityRequirement, index) in apiSpec.security" :key="index">
            <div v-for="(scopes, name) in securityRequirement" :key="name">
              <div class="flex items-center gap-2">
                <span class="font-medium">{{ formatSecurityName(name) }}:</span>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ getSecurityDescription(name) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Parameters -->
      <div v-if="hasParameters" class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Parameters</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-800 text-left">
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Name</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Located in</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Description</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Type</th>
                <th class="px-4 py-2 border border-gray-200 dark:border-gray-700">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in allParameters" :key="param.name" class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">{{ param.name }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">{{ param.in }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">{{ param.description }}</td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700 font-mono text-sm">
                  {{ getParameterType(param) }}
                </td>
                <td class="px-4 py-2 border border-gray-200 dark:border-gray-700">
                  <span v-if="param.required" class="text-red-500">✓</span>
                  <span v-else>-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Request Body -->
      <div v-if="selectedOperation.requestBody" class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Request Body</h2>
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div v-if="selectedOperation.requestBody.description" class="mb-2 text-gray-600 dark:text-gray-400">
            {{ selectedOperation.requestBody.description }}
          </div>
          
          <div v-if="selectedOperation.requestBody.required" class="mb-2">
            <Badge type="error">Required</Badge>
          </div>
          
          <div v-if="selectedOperation.requestBody.content">
            <div v-for="(mediaType, contentType) in selectedOperation.requestBody.content" :key="contentType">
              <div class="mb-2">
                <Badge type="info">{{ contentType }}</Badge>
              </div>
              
              <div v-if="mediaType.schema">
                <SchemaViewer :schema="mediaType.schema" :components="apiSpec.components" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Responses -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Responses</h2>
        <div class="space-y-4">
          <div 
            v-for="(response, statusCode) in selectedOperation.responses" 
            :key="statusCode"
            class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-2">
                <Badge :type="getStatusCodeType(statusCode)">{{ statusCode }}</Badge>
                <span class="font-medium">{{ response.description }}</span>
              </div>
            </div>
            
            <div v-if="response.content" class="p-4">
              <div v-for="(mediaType, contentType) in response.content" :key="contentType">
                <div class="mb-2">
                  <Badge type="info">{{ contentType }}</Badge>
                </div>
                
                <div v-if="mediaType.schema">
                  <SchemaViewer :schema="mediaType.schema" :components="apiSpec.components" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Code Samples -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Code Samples</h2>
        <CodeGroup>
          <CodeBlock label="cURL" active language="bash">
{{ generateCurlExample() }}
          </CodeBlock>
          <CodeBlock label="JavaScript" language="js">
{{ generateJavaScriptExample() }}
          </CodeBlock>
          <CodeBlock label="Python" language="python">
{{ generatePythonExample() }}
          </CodeBlock>
        </CodeGroup>
      </div>
    </div>
    
    <div v-else-if="selectedSchema">
      <div class="mb-6">
        <h1 :id="`schema-${selectedSchemaName}`" class="text-2xl font-bold mb-2">
          {{ selectedSchemaName }}
        </h1>
        <p v-if="selectedSchema.description" class="text-gray-600 dark:text-gray-400">
          {{ selectedSchema.description }}
        </p>
      </div>
      
      <SchemaViewer :schema="selectedSchema" :components="apiSpec.components" :expanded="true" />
      
      <div v-if="selectedSchema.example || selectedSchema.examples" class="mt-6">
        <h2 class="text-lg font-semibold mb-2">Example</h2>
        <CodeBlock label="JSON" language="json">
{{ JSON.stringify(selectedSchema.example || Object.values(selectedSchema.examples || {})[0], null, 2) }}
        </CodeBlock>
      </div>
    </div>
    
    <div v-else>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="i-carbon-api text-6xl mb-4 text-gray-400"></div>
        <h2 class="text-2xl font-bold mb-2">API Reference</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">
          Select an operation from the sidebar to view its details.
        </p>
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

const methodColors = {
  GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  PATCH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

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

const allParameters = computed(() => {
  if (!selectedOperation.value) return []
  
  // Get path-level parameters
  const pathParams = props.apiSpec.paths[selectedPath.value]?.parameters || []
  
  // Get operation-level parameters
  const operationParams = selectedOperation.value.parameters || []
  
  // Combine and deduplicate parameters
  const allParams = [...pathParams, ...operationParams]
  const uniqueParams = []
  const paramNames = new Set()
  
  allParams.forEach(param => {
    const key = `${param.name}-${param.in}`
    if (!paramNames.has(key)) {
      paramNames.add(key)
      uniqueParams.push(param)
    }
  })
  
  return uniqueParams
})

const hasParameters = computed(() => {
  return allParameters.value.length > 0
})

function getParameterType(param) {
  if (!param.schema) return 'any'
  
  if (param.schema.$ref) {
    const refName = param.schema.$ref.split('/').pop()
    return refName
  }
  
  if (param.schema.type === 'array' && param.schema.items) {
    if (param.schema.items.$ref) {
      const refName = param.schema.items.$ref.split('/').pop()
      return `array<${refName}>`
    }
    return `array<${param.schema.items.type || 'any'}>`
  }
  
  return param.schema.type || 'any'
}

function getStatusCodeType(statusCode) {
  const code = parseInt(statusCode, 10)
  if (code >= 200 && code < 300) return 'success'
  if (code >= 300 && code < 400) return 'info'
  if (code >= 400 && code < 500) return 'warning'
  if (code >= 500) return 'error'
  return 'info'
}

function formatSecurityName(name) {
  const securityScheme = props.apiSpec.components?.securitySchemes?.[name]
  if (!securityScheme) return name
  
  if (securityScheme.type === 'http') {
    return `${securityScheme.scheme.charAt(0).toUpperCase() + securityScheme.scheme.slice(1)} Auth`
  }
  
  if (securityScheme.type === 'apiKey') {
    return `API Key (${securityScheme.name})`
  }
  
  if (securityScheme.type === 'oauth2') {
    return 'OAuth 2.0'
  }
  
  return name
}

function getSecurityDescription(name) {
  const securityScheme = props.apiSpec.components?.securitySchemes?.[name]
  if (!securityScheme) return ''
  
  if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
    return 'Username and password as Basic Auth'
  }
  
  if (securityScheme.type === 'http' && securityScheme.scheme === 'bearer') {
    return 'JWT or OAuth2 token in Authorization header'
  }
  
  if (securityScheme.type === 'apiKey') {
    return `API key in ${securityScheme.in} parameter "${securityScheme.name}"`
  }
  
  return securityScheme.description || ''
}

function generateCurlExample() {
  if (!selectedOperation.value || !selectedPath.value || !selectedMethod.value) {
    return 'curl https://api.example.com'
  }
  
  const method = selectedMethod.value
  const path = selectedPath.value
  const baseUrl = props.apiSpec.servers?.[0]?.url || 'https://api.example.com'
  const url = `${baseUrl}${path}`
  
  let curl = `curl -X ${method} "${url}"`
  
  // Add headers
  curl += '\n  -H "Content-Type: application/json"'
  
  // Add authentication if required
  if (props.apiSpec.security && props.apiSpec.security.length > 0) {
    const securityRequirement = props.apiSpec.security[0]
    const securityName = Object.keys(securityRequirement)[0]
    const securityScheme = props.apiSpec.components?.securitySchemes?.[securityName]
    
    if (securityScheme) {
      if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
        curl += '\n  -H "Authorization: Basic YOUR_CREDENTIALS"'
      } else if (securityScheme.type === 'http' && securityScheme.scheme === 'bearer') {
        curl += '\n  -H "Authorization: Bearer YOUR_TOKEN"'
      } else if (securityScheme.type === 'apiKey' && securityScheme.in === 'header') {
        curl += `\n  -H "${securityScheme.name}: YOUR_API_KEY"`
      }
    }
  }
  
  // Add query parameters
  const queryParams = allParameters.value.filter(param => param.in === 'query')
  if (queryParams.length > 0) {
    const queryString = queryParams.map(param => {
      const defaultValue = param.schema?.default !== undefined ? param.schema.default : 'VALUE'
      return `${param.name}=${defaultValue}`
    }).join('&')
    
    // If the URL already has a query string, append to it
    if (url.includes('?')) {
      curl = curl.replace(`"${url}"`, `"${url}&${queryString}"`)
    } else {
      curl = curl.replace(`"${url}"`, `"${url}?${queryString}"`)
    }
  }
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      curl += '\n  -d \'{\n    "property": "value"\n  }\''
    }
  }
  
  return curl
}

function generateJavaScriptExample() {
  if (!selectedOperation.value || !selectedPath.value || !selectedMethod.value) {
    return 'fetch("https://api.example.com")'
  }
  
  const method = selectedMethod.value
  const path = selectedPath.value
  const baseUrl = props.apiSpec.servers?.[0]?.url || 'https://api.example.com'
  const url = `${baseUrl}${path}`
  
  let code = 'const options = {\n'
  code += `  method: "${method}",\n`
  code += '  headers: {\n'
  code += '    "Content-Type": "application/json",\n'
  
  // Add authentication if required
  if (props.apiSpec.security && props.apiSpec.security.length > 0) {
    const securityRequirement = props.apiSpec.security[0]
    const securityName = Object.keys(securityRequirement)[0]
    const securityScheme = props.apiSpec.components?.securitySchemes?.[securityName]
    
    if (securityScheme) {
      if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
        code += '    "Authorization": "Basic YOUR_CREDENTIALS",\n'
      } else if (securityScheme.type === 'http' && securityScheme.scheme === 'bearer') {
        code += '    "Authorization": "Bearer YOUR_TOKEN",\n'
      } else if (securityScheme.type === 'apiKey' && securityScheme.in === 'header') {
        code += `    "${securityScheme.name}": "YOUR_API_KEY",\n`
      }
    }
  }
  
  code += '  },\n'
  
  // Add request body if applicable
  if (['POST', 'PUT', 'PATCH'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      code += '  body: JSON.stringify({\n'
      code += '    "property": "value"\n'
      code += '  }),\n'
    }
  }
  
  code += '};\n\n'
  
  // Build URL with query parameters
  const queryParams = allParameters.value.filter(param => param.in === 'query')
  if (queryParams.length > 0) {
    code += 'const params = new URLSearchParams();\n'
    queryParams.forEach(param => {
      const defaultValue = param.schema?.default !== undefined ? JSON.stringify(param.schema.default) : '"VALUE"'
      code += `params.append("${param.name}", ${defaultValue});\n`
    })
    code += '\n'
    code += `fetch(\`${url}?\${params}\`, options)\n`
  } else {
    code += `fetch("${url}", options)\n`
  }
  
  code += '  .then(response => response.json())\n'
  code += '  .then(data => console.log(data))\n'
  code += '  .catch(error => console.error("Error:", error));'
  
  return code
}

function generatePythonExample() {
  if (!selectedOperation.value || !selectedPath.value || !selectedMethod.value) {
    return 'import requests\n\nresponse = requests.get("https://api.example.com")'
  }
  
  const method = selectedMethod.value.toLowerCase()
  const path = selectedPath.value
  const baseUrl = props.apiSpec.servers?.[0]?.url || 'https://api.example.com'
  const url = `${baseUrl}${path}`
  
  let code = 'import requests\n\n'
  
  // Add headers
  code += 'headers = {\n'
  code += '    "Content-Type": "application/json",\n'
  
  // Add authentication if required
  if (props.apiSpec.security && props.apiSpec.security.length > 0) {
    const securityRequirement = props.apiSpec.security[0]
    const securityName = Object.keys(securityRequirement)[0]
    const securityScheme = props.apiSpec.components?.securitySchemes?.[securityName]
    
    if (securityScheme) {
      if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
        code += '    "Authorization": "Basic YOUR_CREDENTIALS",\n'
      } else if (securityScheme.type === 'http' && securityScheme.scheme === 'bearer') {
        code += '    "Authorization": "Bearer YOUR_TOKEN",\n'
      } else if (securityScheme.type === 'apiKey' && securityScheme.in === 'header') {
        code += `    "${securityScheme.name}": "YOUR_API_KEY",\n`
      }
    }
  }
  
  code += '}\n\n'
  
  // Add query parameters
  const queryParams = allParameters.value.filter(param => param.in === 'query')
  if (queryParams.length > 0) {
    code += 'params = {\n'
    queryParams.forEach(param => {
      const defaultValue = param.schema?.default !== undefined ? JSON.stringify(param.schema.default) : '"VALUE"'
      code += `    "${param.name}": ${defaultValue},\n`
    })
    code += '}\n\n'
  }
  
  // Add request body if applicable
  if (['post', 'put', 'patch'].includes(method) && selectedOperation.value.requestBody) {
    const contentType = Object.keys(selectedOperation.value.requestBody.content || {})[0]
    if (contentType === 'application/json') {
      code += 'data = {\n'
      code += '    "property": "value"\n'
      code += '}\n\n'
    }
  }
  
  // Build request
  code += `response = requests.${method}("${url}"`
  
  if (queryParams.length > 0) {
    code += ', params=params'
  }
  
  code += ', headers=headers'
  
  if (['post', 'put', 'patch'].includes(method) && selectedOperation.value.requestBody) {
    code += ', json=data'
  }
  
  code += ')\n\n'
  code += 'print(response.json())'
  
  return code
}
</script>