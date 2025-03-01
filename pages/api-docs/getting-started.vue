<template>
  <NuxtLayout name="page">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API Docs</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Getting Started</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Getting Started with the API</h1>
      
      <div class="prose dark:prose-invert prose-primary max-w-none">
        <p class="text-lg mb-6">
          This guide will help you get started with our API. You'll learn how to authenticate, make requests, and handle responses.
        </p>
        
        <h2 id="authentication">Authentication</h2>
        
        <p>
          All API requests require authentication. We use API keys to authenticate requests.
          You can obtain an API key from your account dashboard.
        </p>
        
        <Alert type="info">
          Keep your API keys secure! Do not share them in publicly accessible areas such as GitHub, client-side code, etc.
        </Alert>
        
        <p>To authenticate an API request, you should provide your API key in the Authorization header:</p>
        
        <CodeGroup>
          <CodeBlock label="cURL" active language="bash">
            curl -X GET "https://api.example.com/v1/users" \
              -H "Authorization: Bearer YOUR_API_KEY"
          </CodeBlock>
          <CodeBlock label="JavaScript" language="js">
            fetch('https://api.example.com/v1/users', {
              headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
              }
            })
              .then(response => response.json())
              .then(data => console.log(data));
          </CodeBlock>
          <CodeBlock label="Python" language="python">
            import requests

            headers = {
              'Authorization': 'Bearer YOUR_API_KEY'
            }

            response = requests.get('https://api.example.com/v1/users', headers=headers)
            data = response.json()
            print(data)
          </CodeBlock>
        </CodeGroup>
        
        <h2 id="base-url">Base URL</h2>
        
        <p>
          All API requests should be made to the following base URL:
        </p>
        
        <pre><code>https://api.example.com/v1</code></pre>
        
        <h2 id="request-format">Request Format</h2>
        
        <p>
          The API accepts request data in JSON format. Make sure to include the following header when sending data:
        </p>
        
        <pre><code>Content-Type: application/json</code></pre>
        
        <h2 id="response-format">Response Format</h2>
        
        <p>
          All responses are returned in JSON format. A typical response structure looks like this:
        </p>
        
        <CodeBlock label="JSON" language="json">
          {
            "data": {
              // Response data here
            },
            "meta": {
              "pagination": {
                "total": 100,
                "count": 10,
                "per_page": 10,
                "current_page": 1,
                "total_pages": 10
              }
            }
          }
        </CodeBlock>
        
        <h2 id="error-handling">Error Handling</h2>
        
        <p>
          When an error occurs, the API will return an appropriate HTTP status code and a JSON response with error details:
        </p>
        
        <CodeBlock label="JSON" language="json">
          {
            "error": {
              "code": "invalid_request",
              "message": "The request was invalid",
              "details": [
                "The 'name' field is required"
              ]
            }
          }
        </CodeBlock>
        
        <h3>Common Error Codes</h3>
        
        <table>
          <thead>
            <tr>
              <th>Status Code</th>
              <th>Error Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>400</td>
              <td>invalid_request</td>
              <td>The request was invalid</td>
            </tr>
            <tr>
              <td>401</td>
              <td>unauthorized</td>
              <td>Authentication failed</td>
            </tr>
            <tr>
              <td>403</td>
              <td>forbidden</td>
              <td>You don't have permission to access this resource</td>
            </tr>
            <tr>
              <td>404</td>
              <td>not_found</td>
              <td>The requested resource was not found</td>
            </tr>
            <tr>
              <td>429</td>
              <td>rate_limited</td>
              <td>You've exceeded the rate limit</td>
            </tr>
            <tr>
              <td>500</td>
              <td>server_error</td>
              <td>An error occurred on the server</td>
            </tr>
          </tbody>
        </table>
        
        <h2 id="rate-limits">Rate Limits</h2>
        
        <p>
          The API has rate limits to prevent abuse. The current limits are:
        </p>
        
        <ul>
          <li>100 requests per minute for standard accounts</li>
          <li>1000 requests per minute for premium accounts</li>
        </ul>
        
        <p>
          If you exceed the rate limit, you'll receive a 429 Too Many Requests response.
          The response will include a Retry-After header indicating how many seconds to wait before making another request.
        </p>
        
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          Now that you understand the basics, you can:
        </p>
        
        <ul>
          <li>Explore the <NuxtLink to="/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API documentation</NuxtLink> to learn about available endpoints</li>
          <li>Try out the API using the <NuxtLink to="/api-docs/explorer" class="text-primary-600 dark:text-primary-400 hover:underline">API Explorer</NuxtLink></li>
          <li>Download one of our <NuxtLink to="/api-docs/sdks" class="text-primary-600 dark:text-primary-400 hover:underline">SDKs</NuxtLink> to get started quickly</li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>