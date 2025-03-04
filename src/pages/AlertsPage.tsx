import React from 'react';
import { Alert } from '../lib/components/Alert';
import ComponentPreview from '../components/ComponentPreview';
import { Bell } from 'lucide-react';

const AlertsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 id="alerts" className="text-3xl font-bold mb-4">Alerts</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Alert components for providing feedback to users.
        </p>
      </div>
      
      <ComponentPreview
        title="Alert Variants"
        description="Different alert styles for various types of messages."
        code={`<Alert variant="info">This is an informational alert with useful details.</Alert>\n\n<Alert variant="success">Your changes have been saved successfully!</Alert>\n\n<Alert variant="warning">Please review your information before continuing </Alert>\n\n<Alert variant="error">There was an error processing your request.</Alert>`}
      >
        <div className="w-full space-y-4">
          <Alert variant="info">
            This is an informational alert with useful details.
          </Alert>
          
          <Alert variant="success">
            Your changes have been saved successfully!
          </Alert>
          
          <Alert variant="warning">
            Please review your information before continuing.
          </Alert>
          
          <Alert variant="error">
            There was an error processing your request.
          </Alert>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Alert with Title"
        description="Alerts can include a title for more context."
        code={`<Alert variant="info" title="Information">This alert provides additional context with a title.</Alert>\n\n<Alert variant="success" title="Success">Your profile has been updated successfully.</Alert>`}
      >
        <div className="w-full space-y-4">
          <Alert
            variant="info"
            title="Information"
          >
            This alert provides additional context with a title.
          </Alert>
          
          <Alert
            variant="success"
            title="Success"
          >
            Your profile has been updated successfully.
          </Alert>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Dismissible Alert"
        description="Alerts can be dismissible by adding a close button."
        code={`<Alert variant="warning" title="Warning" onClose={() => alert('Alert dismissed')}>This alert can be dismissed by clicking the close button.</Alert>`}
      >
        <div className="w-full">
          <Alert
            variant="warning"
            title="Warning"
            onClose={() => alert('Alert dismissed')}
          >
            This alert can be dismissed by clicking the close button.
          </Alert>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Custom Icon Alert"
        description="Alerts can use custom icons instead of the default ones."
        code={`<Alert variant="info" title="Notification" icon={<Bell className="h-5 w-5 text-info-500" />}>You have 3 new messages in your inbox.</Alert>`}
      >
        <div className="w-full">
          <Alert
            variant="info"
            title="Notification"
            icon={<Bell className="h-5 w-5 text-info-500" />}
          >
            You have 3 new messages in your inbox.
          </Alert>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default AlertsPage;