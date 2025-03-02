<template>
  <div class="page-container flex flex-col min-h-screen">
    <!-- Full-width header at the top -->
    <Nav />
    
    <!-- Main content area without sidebar -->
    <main class="flex-1 w-full">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<style>
.page-container {
  min-height: 100vh;
}
</style>