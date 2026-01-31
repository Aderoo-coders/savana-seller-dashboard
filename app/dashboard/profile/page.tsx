'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import CompanyProfileForm from '@/components/CompanyProfileForm';
import { getCompanyProfile } from '@/lib/companyProfile';

export default function CompanyProfilePage() {
  const companyProfile = getCompanyProfile();

  return (
    <SidebarLayout>
      <FullPageForm
        title="Company Profile"
        onCancel={() => {
          if (typeof window !== 'undefined') {
            window.history.back();
          }
        }}
        onSubmit={() => {
          const form = document.getElementById('company-profile-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Profile"
      >
        <CompanyProfileForm
          formId="company-profile-form"
          initialData={companyProfile}
          onSave={(data) => {
            // Trigger a custom event to update sidebar
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('companyProfileUpdated', { detail: data }));
              // Redirect to dashboard after successful submission
              window.location.href = '/dashboard';
            }
          }}
        />
      </FullPageForm>
    </SidebarLayout>
  );
}

