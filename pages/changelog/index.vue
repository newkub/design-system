<template>
  <NuxtLayout name="page">
    <div>
      <h1 class="text-3xl font-bold mb-6">Changelog</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Track the latest updates, improvements, and fixes to our documentation site.
      </p>
      
      <div class="space-y-12">
        <div v-for="(release, index) in releases" :key="index" class="relative">
          <!-- Timeline connector -->
          <div v-if="index < releases.length - 1" class="absolute top-8 bottom-0 left-4 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div class="flex gap-6">
            <!-- Version badge and timeline dot -->
            <div class="relative">
              <div class="sticky top-24 flex flex-col items-center">
                <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${releaseTypeClasses[release.type]}`">
                  <div :class="releaseIconClasses[release.type]"></div>
                </div>
                <div class="text-sm font-mono mt-2">{{ release.version }}</div>
              </div>
            </div>
            
            <!-- Release content -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <h2 class="text-2xl font-bold">{{ release.title }}</h2>
                <Badge :type="release.type">{{ release.type }}</Badge>
                <span class="text-gray-500 dark:text-gray-400 text-sm">{{ release.date }}</span>
              </div>
              
              <div class="prose dark:prose-invert max-w-none">
                <p v-if="release.description" class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ release.description }}
                </p>
                
                <div v-for="(category, catIndex) in release.changes" :key="catIndex" class="mb-6">
                  <h3 class="text-lg font-semibold mb-2">{{ category.title }}</h3>
                  <ul class="space-y-2">
                    <li v-for="(change, changeIndex) in category.items" :key="changeIndex" class="flex gap-2">
                      <span class="text-gray-500 dark:text-gray-400">•</span>
                      <span>{{ change }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Release type styling
const releaseTypeClasses = {
  'major': 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
  'feature': 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
  'fix': 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
}

const releaseIconClasses = {
  'major': 'i-carbon-rocket',
  'feature': 'i-carbon-add',
  'fix': 'i-carbon-checkmark'
}

// Sample changelog data
const releases = [
  {
    version: 'v1.2.0',
    title: 'Showcase and Changelog',
    type: 'feature',
    date: 'May 15, 2025',
    description: 'Added new showcase and changelog pages to the documentation site.',
    changes: [
      {
        title: 'Features',
        items: [
          'Added Showcase page with grid layout for project examples',
          'Added Changelog page with timeline view',
          'Improved Table of Contents with active state tracking',
          'Enhanced mobile responsiveness across all pages'
        ]
      },
      {
        title: 'Improvements',
        items: [
          'Optimized page loading performance',
          'Updated navigation to include new sections',
          'Improved dark mode contrast for better readability'
        ]
      }
    ]
  },
  {
    version: 'v1.1.0',
    title: 'Code Highlighting Improvements',
    type: 'feature',
    date: 'April 28, 2025',
    changes: [
      {
        title: 'Features',
        items: [
          'Added copy button to code blocks',
          'Implemented line numbers in code blocks',
          'Added language badges to code blocks'
        ]
      },
      {
        title: 'Fixes',
        items: [
          'Fixed syntax highlighting in dark mode',
          'Resolved issue with code block overflow on mobile'
        ]
      }
    ]
  },
  {
    version: 'v1.0.1',
    title: 'Bug Fixes and Improvements',
    type: 'fix',
    date: 'April 15, 2025',
    changes: [
      {
        title: 'Fixes',
        items: [
          'Fixed color mode toggle button',
          'Resolved navigation issues on mobile devices',
          'Fixed broken links in API documentation'
        ]
      },
      {
        title: 'Improvements',
        items: [
          'Improved accessibility across all pages',
          'Enhanced search functionality'
        ]
      }
    ]
  },
  {
    version: 'v1.0.0',
    title: 'Initial Release',
    type: 'major',
    date: 'April 1, 2025',
    description: 'First public release of the documentation site.',
    changes: [
      {
        title: 'Features',
        items: [
          'Complete documentation structure',
          'Responsive design with mobile support',
          'Dark mode support',
          'Markdown content with code highlighting',
          'Custom components for documentation'
        ]
      }
    ]
  }
]
</script>