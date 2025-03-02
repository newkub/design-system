<template>
  <div class="page-container flex flex-col min-h-screen">
    <!-- Full-width header at the top -->
    <DocsHeader />
    
    <!-- Main content area without sidebar -->
    <main class="flex-1 w-full">
      <slot />
    </main>
    
    <DocsFooter />
  </div>
</template>

<style>
.page-container {
  min-height: 100vh;
}
</style>