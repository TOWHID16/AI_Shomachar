import React from 'react';
import { Settings } from 'lucide-react';
import { Heading } from '@/components/Heading';

const SettingsPage = () => {
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          You can manage your account settings here.
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
