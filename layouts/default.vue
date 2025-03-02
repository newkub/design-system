<template>
  <div class="docs-container">
    <DocsSidebar />
    <div class="docs-content">
      <DocsHeader />
      <main class="p-6 w-full max-w-4xl mx-auto">
        <slot />
      </main>
      <DocsFooter />
    </div>
    <MobileSidebar />
  </div>
</template>

<style>
.docs-container {
  display: flex;
  min-height: 100vh;
}

.docs-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>