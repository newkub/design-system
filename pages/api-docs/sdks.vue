<template>
  <NuxtLayout name="page">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API Docs</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>SDKs</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">SDK Downloads</h1>
      
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Use our official SDKs to integrate with our API quickly and easily in your preferred programming language.
      </p>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- JavaScript SDK -->
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-logos-javascript text-3xl"></div>
            <h2 class="text-xl font-semibold">JavaScript SDK</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Our JavaScript SDK works in both Node.js and browser environments.
          </p>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Installation</h3>
            <CodeGroup>
              <CodeBlock label="npm" active language="bash">
                npm install @example/api-sdk
              </CodeBlock>
              <CodeBlock label="yarn" language="bash">
                yarn add @example/api-sdk
              </CodeBlock>
              <CodeBlock label="pnpm" language="bash">
                pnpm add @example/api-sdk
              </CodeBlock>
            </CodeGroup>
          </div>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Usage</h3>
            <CodeBlock label="JavaScript" language="js">
              import { ApiClient } from '@example/api-sdk';

              const client = new ApiClient('YOUR_API_KEY');

              // Get all users
              client.users.list()
                .then(users => console.log(users))
                .catch(error => console.error(error));
            </CodeBlock>
          </div>
          
          <div class="flex justify-between items-center">
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>Documentation</span>
              <div class="i-carbon-document"></div>
            </a>
            
            <a href="#" class="btn btn-primary">
              Download v1.2.0
            </a>
          </div>
        </div>
        
        <!-- Python SDK -->
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-logos-python text-3xl"></div>
            <h2 class="text-xl font-semibold">Python SDK</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Our Python SDK supports Python 3.7 and above.
          </p>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Installation</h3>
            <CodeBlock label="pip" language="bash">
              pip install example-api-sdk
            </CodeBlock>
          </div>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Usage</h3>
            <CodeBlock label="Python" language="python">
              from example_api_sdk import ApiClient

              client = ApiClient('YOUR_API_KEY')

              # Get all users
              users = client.users.list()
              print(users)
            </CodeBlock>
          </div>
          
          <div class="flex justify-between items-center">
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>Documentation</span>
              <div class="i-carbon-document"></div>
            </a>
            
            <a href="#" class="btn btn-primary">
              Download v1.1.0
            </a>
          </div>
        </div>
        
        <!-- PHP SDK -->
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-logos-php text-3xl"></div>
            <h2 class="text-xl font-semibold">PHP SDK</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Our PHP SDK requires PHP 7.4 or higher.
          </p>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Installation</h3>
            <CodeBlock label="composer" language="bash">
              composer require example/api-sdk
            </CodeBlock>
          </div>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Usage</h3>
            <CodeBlock label="PHP" language="php">
              // PHP code example
              
              require_once 'vendor/autoload.php';
              
              $client = new Example\ApiSdk\ApiClient('YOUR_API_KEY');
              
              // Get all users
              $users = $client->users->list();
              print_r($users);
            </CodeBlock>
          </div>
          
          <div class="flex justify-between items-center">
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>Documentation</span>
              <div class="i-carbon-document"></div>
            </a>
            
            <a href="#" class="btn btn-primary">
              Download v1.0.2
            </a>
          </div>
        </div>
        
        <!-- Ruby SDK -->
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="i-logos-ruby text-3xl"></div>
            <h2 class="text-xl font-semibold">Ruby SDK</h2>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Our Ruby SDK supports Ruby 2.6 and above.
          </p>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Installation</h3>
            <CodeBlock label="gem" language="bash">
              gem install example-api-sdk
            </CodeBlock>
          </div>
          
          <div class="mb-4">
            <h3 class="text-lg font-medium mb-2">Usage</h3>
            <CodeBlock label="Ruby" language="ruby">
              require 'example_api_sdk'
              
              client = ExampleApiSdk::Client.new('YOUR_API_KEY')
              
              # Get all users
              users = client.users.list
              puts users
            </CodeBlock>
          </div>
          
          <div class="flex justify-between items-center">
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              <span>Documentation</span>
              <div class="i-carbon-document"></div>
            </a>
            
            <a href="#" class="btn btn-primary">
              Download v0.9.5
            </a>
          </div>
        </div>
      </div>
      
      <div class="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Need an SDK for a Different Language?</h2>
        
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          We're constantly working on expanding our SDK offerings. If you need an SDK for a language not listed here, please let us know.
        </p>
        
        <div class="flex gap-4">
          <a href="#" class="btn btn-primary">
            Request an SDK
          </a>
          
          <a href="#" class="btn btn-outline">
            View API Reference
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>