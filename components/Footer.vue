<script setup>
import { useDocsConfig } from '~/composables/useDocsConfig';

const { themeConfig } = useDocsConfig();
const { footer, socialLinks } = themeConfig;
</script>

<template>
  <footer class="border-t border-gray-200 py-12 px-6 mt-auto bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-sm text-gray-500">
          <p v-if="footer?.message" class="mb-1">{{ footer.message }}</p>
          <p v-if="footer?.copyright">{{ footer.copyright }}</p>
        </div>
        
        <div class="flex items-center gap-4" v-if="socialLinks?.length">
          <a 
            v-for="link in socialLinks" 
            :key="link.icon"
            :href="link.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <div class="text-xl" :class="link.icon"></div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>