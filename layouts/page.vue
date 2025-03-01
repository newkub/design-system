<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>