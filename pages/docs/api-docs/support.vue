<template>
  <NuxtLayout name="page">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/docs/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API Docs</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Support</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">API Support</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Get help with API integration issues and find answers to common questions.
      </p>
      
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-carbon-chat text-3xl text-primary-500"></div>
            <h2 class="text-xl font-semibold">Contact Support</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Our support team is available to help with any API integration issues.
          </p>
          
          <a href="#" class="btn btn-primary">
            Open Support Ticket
          </a>
        </div>
        
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-carbon-forum text-3xl text-primary-500"></div>
            <h2 class="text-xl font-semibold">Developer Community</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Join our developer community to ask questions and share knowledge.
          </p>
          
          <a href="#" class="btn btn-primary">
            Join Community
          </a>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div class="space-y-4 mb-12">
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <button class="flex justify-between items-center w-full text-left font-medium">
            <span>How do I get an API key?</span>
            <div class="i-carbon-chevron-down"></div>
          </button>
          <div class="mt-2 text-gray-600 dark:text-gray-400">
            <p>
              You can get an API key by logging into your account dashboard and navigating to the API section.
              Click on "Generate API Key" to create a new key.
            </p>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <button class="flex justify-between items-center w-full text-left font-medium">
            <span>What are the rate limits for the API?</span>
            <div class="i-carbon-chevron-down"></div>
          </button>
          <div class="mt-2 text-gray-600 dark:text-gray-400">
            <p>
              Standard accounts have a rate limit of 100 requests per minute.
              Premium accounts have a rate limit of 1000 requests per minute.
              If you need higher limits, please contact our sales team.
            </p>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <button class="flex justify-between items-center w-full text-left font-medium">
            <span>How do I handle API errors?</span>
            <div class="i-carbon-chevron-down"></div>
          </button>
          <div class="mt-2 text-gray-600 dark:text-gray-400">
            <p>
              All API errors return an appropriate HTTP status code and a JSON response with error details.
              Check the "error" object in the response for more information about what went wrong.
              See our <NuxtLink to="/docs/api-docs/getting-started#error-handling" class="text-primary-600 dark:text-primary-400 hover:underline">Error Handling</NuxtLink> documentation for more details.
            </p>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <button class="flex justify-between items-center w-full text-left font-medium">
            <span>Do you offer webhooks?</span>
            <div class="i-carbon-chevron-down"></div>
          </button>
          <div class="mt-2 text-gray-600 dark:text-gray-400">
            <p>
              Yes, we offer webhooks for real-time event notifications.
              You can configure webhooks in your account dashboard under the API section.
              See our <NuxtLink to="/docs/api-docs/webhooks" class="text-primary-600 dark:text-primary-400 hover:underline">Webhooks</NuxtLink> documentation for more details.
            </p>
          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <button class="flex justify-between items-center w-full text-left font-medium">
            <span>How do I report a security vulnerability?</span>
            <div class="i-carbon-chevron-down"></div>
          </button>
          <div class="mt-2 text-gray-600 dark:text-gray-400">
            <p>
              If you discover a security vulnerability, please email us at security@example.com.
              Do not disclose the vulnerability publicly until we've had a chance to address it.
            </p>
          </div>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mb-6">Troubleshooting Guides</h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink to="#" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 class="text-lg font-semibold mb-2 text-primary-600 dark:text-primary-400">Authentication Issues</h3>
          <p class="text-gray-600 dark:text-gray-400">Troubleshoot common authentication problems.</p>
        </NuxtLink>
        
        <NuxtLink to="#" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 class="text-lg font-semibold mb-2 text-primary-600 dark:text-primary-400">Rate Limiting</h3>
          <p class="text-gray-600 dark:text-gray-400">Learn how to handle and avoid rate limit errors.</p>
        </NuxtLink>
        
        <NuxtLink to="#" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <h3 class="text-lg font-semibold mb-2 text-primary-600 dark:text-primary-400">Webhook Delivery</h3>
          <p class="text-gray-600 dark:text-gray-400">Troubleshoot webhook delivery issues.</p>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>