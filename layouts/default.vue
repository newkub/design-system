<template>
  <div class="docs-container flex flex-col min-h-screen">
    <!-- Full-width header at the top -->
    <DocsHeader />
    
    <!-- Main content area with sidebar inside -->
    <div class="flex flex-1 relative">
      <DocsSidebar />
      <main class="flex-1 p-6 w-full">
        <div class="max-w-4xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
    
    <DocsFooter />
    <MobileSidebar />
  </div>
</template>

<style>
.docs-container {
  min-height: 100vh;
}
</style>