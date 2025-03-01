<template>
  <NuxtLayout name="page">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API Docs</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>API Explorer</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">API Explorer</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Test API endpoints directly from your browser.
      </p>
      
      <div class="grid md:grid-cols-5 gap-6">
        <!-- Sidebar with endpoints -->
        <div class="md:col-span-1 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div class="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold">Endpoints</h3>
          </div>
          
          <div class="p-2">
            <div v-for="(category, index) in apiCategories" :key="index" class="mb-3">
              <div 
                class="flex items-center justify-between p-2 text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                @click="toggleCategory(index)"
              >
                <span>{{ category.name }}</span>
                <div :class="expandedCategories[index] ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'"></div>
              </div>
              
              <div v-show="expandedCategories[index]" class="ml-2 space-y-1 mt-1">
                <div 
                  v-for="(endpoint, eIndex) in category.endpoints" 
                  :key="eIndex"
                  class="flex items-center gap-2 p-2 text-sm rounded cursor-pointer"
                  :class="selectedEndpoint === `${index}-${eIndex}` ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                  @click="selectEndpoint(index, eIndex)"
                >
                  <span class="px-1.5 py-0.5 text-xs font-bold rounded" :class="methodColors[endpoint.method]">
                    {{ endpoint.method }}
                  </span>
                  <span class="truncate">{{ endpoint.path.split('/').pop() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main content area -->
        <div class="md:col-span-4 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span v-if="currentEndpoint" class="px-2 py-0.5 text-xs font-bold rounded" :class="methodColors[currentEndpoint.method]">
                {{ currentEndpoint.method }}
              </span>
              <code class="text-sm font-mono">{{ currentEndpoint ? currentEndpoint.path : 'Select an endpoint' }}</code>
            </div>
            
            <button 
              class="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!currentEndpoint"
              @click="sendRequest"
            >
              Send Request
            </button>
          </div>
          
          <div v-if="currentEndpoint" class="p-4">
            <!-- Request configuration -->
            <div class="mb-6">
              <div class="flex items-center gap-4 mb-4">
                <button 
                  v-for="tab in ['Params', 'Headers', 'Body']" 
                  :key="tab"
                  class="px-3 py-1 text-sm font-medium rounded-full"
                  :class="activeTab === tab ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                  @click="activeTab = tab"
                >
                  {{ tab }}
                </button>
              </div>
              
              <!-- Params tab -->
              <div v-if="activeTab === 'Params'" class="space-y-3">
                <div v-for="(param, index) in requestParams" :key="index" class="flex items-center gap-2">
                  <input 
                    v-model="param.key" 
                    type="text" 
                    placeholder="Parameter name"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm w-1/3"
                  >
                  <input 
                    v-model="param.value" 
                    type="text" 
                    placeholder="Value"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm flex-1"
                  >
                  <button 
                    @click="removeParam(index)"
                    class="p-2 text-gray-500 hover:text-red-500"
                  >
                    <div class="i-carbon-close"></div>
                  </button>
                </div>
                
                <button 
                  @click="addParam"
                  class="px-3 py-1 text-sm text-primary-600 dark:text-primary-400 border border-primary-500 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  Add Parameter
                </button>
              </div>
              
              <!-- Headers tab -->
              <div v-if="activeTab === 'Headers'" class="space-y-3">
                <div v-for="(header, index) in requestHeaders" :key="index" class="flex items-center gap-2">
                  <input 
                    v-model="header.key" 
                    type="text" 
                    placeholder="Header name"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm w-1/3"
                  >
                  <input 
                    v-model="header.value" 
                    type="text" 
                    placeholder="Value"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm flex-1"
                  >
                  <button 
                    @click="removeHeader(index)"
                    class="p-2 text-gray-500 hover:text-red-500"
                  >
                    <div class="i-carbon-close"></div>
                  </button>
                </div>
                
                <button 
                  @click="addHeader"
                  class="px-3 py-1 text-sm text-primary-600 dark:text-primary-400 border border-primary-500 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  Add Header
                </button>
              </div>
              
              <!-- Body tab -->
              <div v-if="activeTab === 'Body'" class="space-y-3">
                <div class="border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
                  <div class="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
                    <div class="text-sm font-medium">Request Body</div>
                    <div class="flex items-center gap-2">
                      <button 
                        v-for="format in ['JSON', 'Form']" 
                        :key="format"
                        class="px-2 py-0.5 text-xs rounded"
                        :class="bodyFormat === format ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'"
                        @click="bodyFormat = format"
                      >
                        {{ format }}
                      </button>
                    </div>
                  </div>
                  <textarea 
                    v-model="requestBody" 
                    rows="8"
                    class="w-full p-3 bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none"
                    placeholder="Enter request body"
                  ></textarea>
                </div>
                
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  <span v-if="bodyFormat === 'JSON'">Enter a valid JSON object</span>
                  <span v-else>Enter key=value pairs, one per line</span>
                </div>
              </div>
            </div>
            
            <!-- Response section -->
            <div v-if="response" class="border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
              <div class="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <div class="text-sm font-medium">Response</div>
                <div class="flex items-center gap-2">
                  <span 
                    class="px-2 py-0.5 text-xs rounded font-medium"
                    :class="responseStatusClass"
                  >
                    {{ response.status }} {{ response.statusText }}
                  </span>
                  <span class="text-xs text-gray-500">{{ response.time }}ms</span>
                </div>
              </div>
              <pre class="p-3 bg-white dark:bg-gray-900 font-mono text-sm overflow-auto max-h-80">{{ formattedResponse }}</pre>
            </div>
          </div>
          
          <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400">
            <div class="i-carbon-api text-4xl mx-auto mb-4"></div>
            <p class="text-lg font-medium mb-2">Select an endpoint</p>
            <p class="text-sm">Choose an API endpoint from the sidebar to start testing</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const expandedCategories = ref([true, false, false, false])
const selectedEndpoint = ref(null)
const currentEndpoint = ref(null)
const activeTab = ref('Params')
const bodyFormat = ref('JSON')

// Request data
const requestParams = ref([{ key: '', value: '' }])
const requestHeaders = ref([
  { key: 'Content-Type', value: 'application/json' },
  { key: 'Authorization', value: 'Bearer YOUR_API_KEY' }
])
const requestBody = ref('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}')

// Response data
const response = ref(null)

function toggleCategory(index) {
  expandedCategories.value[index] = !expandedCategories.value[index]
}

function selectEndpoint(categoryIndex, endpointIndex) {
  selectedEndpoint.value = `${categoryIndex}-${endpointIndex}`
  currentEndpoint.value = apiCategories[categoryIndex].endpoints[endpointIndex]
  
  // Reset response
  response.value = null
  
  // Set default request body based on endpoint
  if (currentEndpoint.value.method === 'POST' || currentEndpoint.value.method === 'PUT' || currentEndpoint.value.method === 'PATCH') {
    if (currentEndpoint.value.path.includes('users')) {
      requestBody.value = '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "role": "user"\n}'
    } else if (currentEndpoint.value.path.includes('content')) {
      requestBody.value = '{\n  "title": "New Content",\n  "body": "Content body goes here"\n}'
    } else if (currentEndpoint.value.path.includes('login')) {
      requestBody.value = '{\n  "email": "user@example.com",\n  "password": "password123"\n}'
    }
  } else {
    requestBody.value = '{}'
  }
}

function addParam() {
  requestParams.value.push({ key: '', value: '' })
}

function removeParam(index) {
  requestParams.value.splice(index, 1)
}

function addHeader() {
  requestHeaders.value.push({ key: '', value: '' })
}

function removeHeader(index) {
  requestHeaders.value.splice(index, 1)
}

function sendRequest() {
  // Simulate API request
  const startTime = Date.now()
  
  // Generate mock response based on endpoint
  setTimeout(() => {
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    let mockResponse = {}
    let status = 200
    let statusText = 'OK'
    
    if (currentEndpoint.value.method === 'GET') {
      if (currentEndpoint.value.path.includes('users')) {
        if (currentEndpoint.value.path.includes('{id}')) {
          mockResponse = {
            id: 'usr_123456',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            created_at: '2025-05-15T12:00:00Z'
          }
        } else {
          mockResponse = {
            data: [
              {
                id: 'usr_123456',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'admin'
              },
              {
                id: 'usr_789012',
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'user'
              }
            ],
            pagination: {
              total: 2,
              limit: 10,
              offset: 0,
              has_more: false
            }
          }
        }
      } else if (currentEndpoint.value.path.includes('content')) {
        mockResponse = {
          data: [
            {
              id: 'cnt_123456',
              title: 'Getting Started',
              slug: 'getting-started',
              created_at: '2025-05-10T10:00:00Z'
            },
            {
              id: 'cnt_789012',
              title: 'Advanced Features',
              slug: 'advanced-features',
              created_at: '2025-05-12T14:30:00Z'
            }
          ],
          pagination: {
            total: 2,
            limit: 10,
            offset: 0,
            has_more: false
          }
        }
      }
    } else if (currentEndpoint.value.method === 'POST') {
      try {
        const requestData = JSON.parse(requestBody.value)
        
        if (currentEndpoint.value.path.includes('users')) {
          mockResponse = {
            id: 'usr_' + Math.floor(Math.random() * 1000000),
            ...requestData,
            created_at: new Date().toISOString()
          }
        } else if (currentEndpoint.value.path.includes('login')) {
          mockResponse = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            user: {
              id: 'usr_123456',
              name: 'John Doe',
              email: requestData.email
            }
          }
        }
      } catch (e) {
        status = 400
        statusText = 'Bad Request'
        mockResponse = {
          error: {
            code: 'invalid_json',
            message: 'Invalid JSON in request body'
          }
        }
      }
    } else if (currentEndpoint.value.method === 'DELETE') {
      mockResponse = {
        success: true,
        message: 'Resource deleted successfully'
      }
    }
    
    response.value = {
      data: mockResponse,
      status,
      statusText,
      time: responseTime
    }
  }, 500)
}

const formattedResponse = computed(() => {
  if (!response.value) return ''
  return JSON.stringify(response.value.data, null, 2)
})

const responseStatusClass = computed(() => {
  if (!response.value) return ''
  
  const status = response.value.status
  if (status >= 200 && status < 300) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  } else if (status >= 400 && status < 500) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  } else if (status >= 500) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  }
  
  return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
})

const methodColors = {
  GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  PATCH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const apiCategories = [
  {
    name: 'Users',
    slug: 'users',
    icon: 'i-carbon-user',
    endpoints: [
      {
        method: 'GET',
        path: '/api/users',
        slug: 'list-users',
        description: 'List all users'
      },
      {
        method: 'GET',
        path: '/api/users/{id}',
        slug: 'get-user',
        description: 'Get a specific user'
      },
      {
        method: 'POST',
        path: '/api/users',
        slug: 'create-user',
        description: 'Create a new user'
      },
      {
        method: 'PUT',
        path: '/api/users/{id}',
        slug: 'update-user',
        description: 'Update a user'
      },
      {
        method: 'DELETE',
        path: '/api/users/{id}',
        slug: 'delete-user',
        description: 'Delete a user'
      }
    ]
  },
  {
    name: 'Content',
    slug: 'content',
    icon: 'i-carbon-document',
    endpoints: [
      {
        method: 'GET',
        path: '/api/content',
        slug: 'list-content',
        description: 'List all content'
      },
      {
        method: 'GET',
        path: '/api/content/{id}',
        slug: 'get-content',
        description: 'Get a specific content item'
      },
      {
        method: 'POST',
        path: '/api/content',
        slug: 'create-content',
        description: 'Create a new content item'
      }
    ]
  },
  {
    name: 'Authentication',
    slug: 'auth',
    icon: 'i-carbon-security',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/login',
        slug: 'login',
        description: 'Login to get access token'
      },
      {
        method: 'POST',
        path: '/api/auth/logout',
        slug: 'logout',
        description: 'Logout and invalidate token'
      },
      {
        method: 'POST',
        path: '/api/auth/refresh',
        slug: 'refresh-token',
        description: 'Refresh access token'
      }
    ]
  },
  {
    name: 'Settings',
    slug: 'settings',
    icon: 'i-carbon-settings',
    endpoints: [
      {
        method: 'GET',
        path: '/api/settings',
        slug: 'get-settings',
        description: 'Get application settings'
      },
      {
        method: 'PATCH',
        path: '/api/settings',
        slug: 'update-settings',
        description: 'Update application settings'
      }
    ]
  }
]
</script>