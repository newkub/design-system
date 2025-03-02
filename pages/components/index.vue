</button>
      </div>
    </div>
    
    <!-- Components Grid -->
    <div v-else class="py-8 px-4 bg-white">
      <div class="max-w-6xl mx-auto">
        <!-- No results message -->
        <div v-if="searchResults.length === 0" class="text-center py-12">
          <div class="i-carbon-search text-5xl text-gray-300 mx-auto mb-4"></div>
          <h3 class="text-lg font-medium text-gray-900 mb-1">No components found</h3>
          <p class="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
        
        <!-- Components grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComponentCard 
            v-for="component in searchResults" 
            :key="component.id"
            :component="component"
            @open-modal="openComponentModal"
          />
        </div>
      </div>
    </div>
    
    <!-- Component Modal -->
    <ComponentModal 
      :is-open="isModalOpen" 
      :component="selectedComponent || {}"
      @close="closeComponentModal"
    />
    
    <!-- CTA Section -->
    <div class="py-12 px-4 bg-gray-50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Need a custom component?</h2>
        <p class="text-gray-600 mb-6">Our design system is constantly evolving. If you need a component that's not listed here, let us know.</p>
        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Request Component
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>