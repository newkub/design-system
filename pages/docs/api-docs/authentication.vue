<template>
  <NuxtLayout name="page">
    <div>
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/docs/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API Docs</NuxtLink>
        <div class="i-carbon-chevron-right text-gray-400"></div>
        <span>Authentication</span>
      </div>
      
      <h1 class="text-4xl font-bold mb-6">Authentication</h1>
      
      <div class="prose dark:prose-invert prose-primary max-w-none">
        <p class="text-lg mb-6">
          Learn how to authenticate your API requests and manage API keys securely.
        </p>
        
        <h2 id="api-keys">API Keys</h2>
        
        <p>
          Our API uses API keys to authenticate requests. API keys provide full access to your account, so be sure to keep them secure.
        </p>
        
        <Alert type="warning">
          Never share your API keys in publicly accessible areas such as GitHub, client-side code, etc.
        </Alert>
        
        <h3>Obtaining an API Key</h3>
        
        <p>
          To obtain an API key:
        </p>
        
        <ol>
          <li>Log in to your account dashboard</li>
          <li>Navigate to the API section</li>
          <li>Click "Generate API Key"</li>
          <li>Copy your API key and store it securely</li>
        </ol>
        
        <h3>Using API Keys</h3>
        
        <p>
          To authenticate an API request, include your API key in the Authorization header:
        </p>
        
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
        
        <h2 id="token-based-auth">Token-Based Authentication</h2>
        
        <p>
          For user-based applications, we also support token-based authentication. This allows you to authenticate on behalf of a user.
        </p>
        
        <h3>Obtaining a User Token</h3>
        
        <p>
          To obtain a user token, make a POST request to the login endpoint:
        </p>
        
        <CodeBlock label="JSON" language="json">
          // POST https://api.example.com/v1/auth/login
          {
            "email": "user@example.com",
            "password": "password123"
          }
        </CodeBlock>
        
        <p>
          The response will include an access token and a refresh token:
        </p>
        
        <CodeBlock label="JSON" language="json">
          {
            "data": {
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "expires_in": 3600
            }
          }
        </CodeBlock>
        
        <h3>Using User Tokens</h3>
        
        <p>
          Use the access token in the Authorization header, just like an API key:
        </p>
        
        <CodeBlock label="bash" language="bash">
          curl -X GET "https://api.example.com/v1/users/me" \
            -H "Authorization: Bearer ACCESS_TOKEN"
        </CodeBlock>
        
        <h3>Refreshing Tokens</h3>
        
        <p>
          Access tokens expire after a period of time. Use the refresh token to obtain a new access token:
        </p>
        
        <CodeBlock label="JSON" language="json">
          // POST https://api.example.com/v1/auth/refresh
          {
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        </CodeBlock>
        
        <h2 id="security-best-practices">Security Best Practices</h2>
        
        <h3>Store API Keys Securely</h3>
        
        <ul>
          <li>Never hardcode API keys in your application code</li>
          <li>Use environment variables or a secure key management service</li>
          <li>Restrict API key access to only the necessary services</li>
        </ul>
        
        <h3>Rotate API Keys Regularly</h3>
        
        <p>
          Regularly rotating your API keys helps minimize the impact of a potential key compromise.
          We recommend rotating your keys every 90 days.
        </p>
        
        <h3>Use HTTPS</h3>
        
        <p>
          Always use HTTPS when making API requests to ensure your API key and data are encrypted in transit.
        </p>
        
        <h2 id="troubleshooting">Troubleshooting</h2>
        
        <h3>401 Unauthorized</h3>
        
        <p>
          If you receive a 401 Unauthorized response, check that:
        </p>
        
        <ul>
          <li>You're using a valid API key</li>
          <li>The API key is correctly formatted in the Authorization header</li>
          <li>Your API key has not been revoked or expired</li>
        </ul>
        
        <h3>403 Forbidden</h3>
        
        <p>
          If you receive a 403 Forbidden response, check that:
        </p>
        
        <ul>
          <li>Your API key has permission to access the requested resource</li>
          <li>Your account is in good standing</li>
        </ul>
        
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          Now that you understand authentication, you can:
        </p>
        
        <ul>
          <li>Explore the <NuxtLink to="/docs/api-docs" class="text-primary-600 dark:text-primary-400 hover:underline">API documentation</NuxtLink> to learn about available endpoints</li>
          <li>Try out the API using the <NuxtLink to="/docs/api-docs/explorer" class="text-primary-600 dark:text-primary-400 hover:underline">API Explorer</NuxtLink></li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>