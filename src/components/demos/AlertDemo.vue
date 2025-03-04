<script setup lang="ts">
import Alert from '../ui/Alert.vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold">Alerts</h1>
      <p class="text-text-secondary mt-2">Alert components for displaying important messages to users.</p>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Alert Variants</h2>
      
      <div class="space-y-4">
        <Alert>
          This is a default alert — check it out!
        </Alert>
        
        <Alert variant="primary">
          This is a primary alert — check it out!
        </Alert>
        
        <Alert variant="secondary">
          This is a secondary alert — check it out!
        </Alert>
        
        <Alert variant="success">
          This is a success alert — check it out!
        </Alert>
        
        <Alert variant="warning">
          This is a warning alert — check it out!
        </Alert>
        
        <Alert variant="danger">
          This is a danger alert — check it out!
        </Alert>
        
        <Alert variant="info">
          This is an info alert — check it out!
        </Alert>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Alerts with Title</h2>
      
      <div class="space-y-4">
        <Alert title="Default Alert">
          This is a default alert with a title.
        </Alert>
        
        <Alert variant="primary" title="Primary Alert">
          This is a primary alert with a title.
        </Alert>
        
        <Alert variant="success" title="Success!">
          Your changes have been saved successfully.
        </Alert>
        
        <Alert variant="warning" title="Warning!">
          Your account is about to expire. Please renew your subscription.
        </Alert>
        
        <Alert variant="danger" title="Error!">
          There was a problem processing your request. Please try again.
        </Alert>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Custom Icons</h2>
      
      <div class="space-y-4">
        <Alert icon="carbon:user" title="User Profile">
          Your profile has been updated successfully.
        </Alert>
        
        <Alert variant="primary" icon="carbon:cloud-upload" title="Upload Complete">
          Your files have been uploaded successfully.
        </Alert>
        
        <Alert variant="warning" icon="carbon:time" title="Session Timeout">
          Your session will expire in 5 minutes. Please save your work.
        </Alert>
      </div>
    </div>
    
    <div class="p-6 bg-bg-secondary rounded-lg border border-border">
      <h2 class="text-xl font-semibold mb-6">Usage Example</h2>
      
      <div class="space-y-4">
        <Alert variant="success" title="Payment Successful">
          <p>Your payment of <strong>$49.99</strong> has been processed successfully.</p>
          <p class="mt-2">Transaction ID: <code>TXN123456789</code></p>
        </Alert>
        
        <Alert variant="info" title="System Maintenance">
          <p>Our system will be undergoing maintenance on <strong>June 15, 2025</strong> from 2:00 AM to 4:00 AM UTC.</p>
          <p class="mt-2">During this time, the service may be temporarily unavailable.</p>
        </Alert>
      </div>
    </div>
  </div>
</template>