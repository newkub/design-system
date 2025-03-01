<template>
  <div class="flex flex-col min-h-screen w-full">
    <Navbar />
    <div class="flex-1 w-full">
      <main class="px-4 py-8 md:px-8 lg:px-12 w-full">
        <div class="max-w-5xl mx-auto w-full">
          <slot />
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>