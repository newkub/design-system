<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ComponentPreview from '../components/ComponentPreview.vue'
import { loadComponents, ComponentMeta } from '../utils/componentLoader'

// Dynamic component discovery and code extraction
const componentPreviews = ref<ComponentMeta[]>([])
const isLoading = ref(true)

// Load all components automatically
onMounted(async () => {
  try {
    isLoading.value = true
    // Load all components using the componentLoader utility
    componentPreviews.value = await loadComponents()
    
    // Sort components alphabetically
    componentPreviews.value.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error loading components:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section id="components" class="mb-12">
    <h2 class="text-3xl font-heading font-bold mb-6 text-primary">Components</h2>
    <p class="mb-8 text-foreground">
      Our design system includes a set of reusable components that you can use to build your applications.
      Each component is designed to be accessible, responsive, and customizable.
    </p>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin i-mdi-loading text-3xl text-primary"></div>
      <span class="ml-3 text-lg text-muted-foreground">Loading components...</span>
    </div>
    
    <!-- Error state -->
    <div v-else-if="componentPreviews.length === 0" class="p-8 border border-dashed border-danger rounded-md text-center">
      <div class="i-mdi-alert-circle text-3xl text-danger mx-auto mb-3"></div>
      <p class="text-lg text-danger">No components found. Please check the component loader configuration.</p>
    </div>
    
    <!-- Components list -->
    <template v-else>
      <!-- Button Component Preview -->
      <template v-for="component in componentPreviews" :key="component.name">
        <ComponentPreview 
          :title="component.name" 
          :description="component.description"
          :code="component.code"
          :component-name="component.name"
        >
          <!-- Button component -->
          <div v-if="component.name === 'Button'" class="space-y-8">
            <div>
              <h4 class="text-lg font-semibold mb-4">Button Variants</h4>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline-primary">Outline</Button>
              </div>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold mb-4">Button Sizes</h4>
              <div class="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold mb-4">Button States</h4>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
          
          <!-- Alert component -->
          <div v-else-if="component.name === 'Alert'" class="space-y-4">
            <Alert type="info" title="Information">
              This is an information alert. It provides general information to the user.
            </Alert>
            <Alert type="success" title="Success">
              This is a success alert. It indicates that an action was completed successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              This is a warning alert. It indicates that something might need attention.
            </Alert>
            <Alert type="danger" title="Danger">
              This is a danger alert. It indicates that something went wrong or needs immediate attention.
            </Alert>
            <Alert type="info" title="Dismissible Alert" dismissible>
              This alert can be dismissed by clicking the close button.
            </Alert>
          </div>
          
          <!-- Modal component -->
          <div v-else-if="component.name === 'Modal'" class="space-y-4">
            <div class="flex flex-col items-center gap-4">
              <ModalExample />
            </div>
          </div>
          
          <!-- Default component preview -->
          <div v-else class="p-4 border border-dashed border-muted rounded-md text-center text-muted-foreground">
            <p class="mb-2">{{ component.name }} component preview</p>
            <p class="text-sm" v-if="component.props">
              <strong>Props:</strong> {{ Object.keys(component.props).join(', ') }}
            </p>
            <p class="text-sm" v-if="component.events && component.events.length">
              <strong>Events:</strong> {{ component.events.join(', ') }}
            </p>
            <p class="text-sm" v-if="component.slots && component.slots.length">
              <strong>Slots:</strong> {{ component.slots.join(', ') }}
            </p>
          </div>
        </ComponentPreview>
      </template>
    </template>
  </section>
</template>

<!-- Modal Example Component -->
<script setup name="ModalExample">
import { ref } from 'vue'
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'
import Alert from '../components/Alert.vue'

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template name="ModalExample">
  <Button @click="toggleModal">Open Example Modal</Button>
  
  <Modal :show="showModal" title="Example Modal" @close="toggleModal">
    <div class="p-4">
      <Alert type="info" title="Modal Content">
        This is an example modal with a title and footer buttons.
      </Alert>
      <p class="mt-4">Modals are useful for displaying content that requires user attention or interaction.</p>
    </div>
    
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button variant="outline-primary" size="sm" @click="toggleModal">Cancel</Button>
        <Button variant="primary" size="sm" @click="toggleModal">Confirm</Button>
      </div>
    </template>
  </Modal>
</template>