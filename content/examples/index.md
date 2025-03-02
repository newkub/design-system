# Examples

This section contains examples demonstrating how to use the framework for various use cases.

## Basic Example

A simple example showing how to create a basic page:

```vue
<template>
  <div>
    <h1>Hello World</h1>
    <p>This is a basic example.</p>
  </div>
</template>
```

## Form Example

An example of a form with validation:

```vue
<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const errors = ref({})

function validate() {
  errors.value = {}
  
  if (!name.value) {
    errors.value.name = 'Name is required'
  }
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Email is invalid'
  }
  
  return Object.keys(errors.value).length === 0
}

function submitForm() {
  if (validate()) {
    // Submit form
    console.log('Form submitted', { name: name.value, email: email.value })
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="max-w-md mx-auto p-4">
    <div class="mb-4">
      <label for="name" class="block mb-1">Name</label>
      <input 
        id="name" 
        v-model="name" 
        type="text" 
        class="w-full p-2 border rounded"
        :class="errors.name ? 'border-red-500' : 'border-gray-300'"
      >
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>
    
    <div class="mb-4">
      <label for="email" class="block mb-1">Email</label>
      <input 
        id="email" 
        v-model="email" 
        type="email" 
        class="w-full p-2 border rounded"
        :class="errors.email ? 'border-red-500' : 'border-gray-300'"
      >
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>
    
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
      Submit
    </button>
  </form>
</template>
```

## Data Fetching Example

An example showing how to fetch and display data:

```vue
<script setup>
const { data: posts, pending, error } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <h1>Posts</h1>
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="mb-4 p-4 border rounded">
        <h2 class="text-xl font-bold">{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>
```