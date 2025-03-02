# Routing

Learn how to set up and customize routing in your application.

## Basic Routing

Routing in Nuxt is file-based. Simply create a file in the `pages` directory and it will be automatically available as a route:

```
pages/
  index.vue         # -> /
  about.vue         # -> /about
  users/
    index.vue       # -> /users
    [id].vue        # -> /users/:id
```

## Navigation

Use the `<NuxtLink>` component to navigate between pages:

```vue
<template>
  <NuxtLink to="/about">About Page</NuxtLink>
</template>
```

## Route Parameters

Access route parameters using the `useRoute` composable:

```vue
<script setup>
const route = useRoute()
const userId = route.params.id
</script>

<template>
  <div>User ID: {{ userId }}</div>
</template>
```

## Nested Routes

Create nested routes by creating a directory with the same name as the parent route and an `index.vue` file:

```
pages/
  users/
    index.vue       # -> /users
    [id]/
      index.vue     # -> /users/:id
      profile.vue   # -> /users/:id/profile
```

## Route Middleware

Create middleware to run code before navigating to a route:

```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  const isAuthenticated = true
  
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

Apply middleware to a page:

```vue
<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>
```