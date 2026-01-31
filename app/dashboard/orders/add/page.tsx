'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import OrderForm from '@/components/OrderForm';

export default function AddOrderPage() {
  return (
    <SidebarLayout>
      <FullPageForm
        title="Create Order"
        onCancel={() => {
          if (typeof window !== 'undefined') {
            window.history.back();
          }
        }}
        onSubmit={() => {
          const form = document.getElementById('order-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Create Order"
      >
        <OrderForm
          formId="order-form"
          onFormSubmit={(data) => {
            if (typeof window !== 'undefined') {
              window.location.href = '/dashboard/orders';
            }
          }}
        />
      </FullPageForm>
    </SidebarLayout>
  );
}



