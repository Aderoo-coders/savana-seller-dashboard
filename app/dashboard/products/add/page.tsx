'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import ProductForm from '@/components/ProductForm';

export default function AddProductPage() {
  return (
    <SidebarLayout>
      <FullPageForm
        title="Add Product"
        onCancel={() => {
          if (typeof window !== 'undefined') {
            window.history.back();
          }
        }}
        onSubmit={() => {
          const form = document.getElementById('product-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Product"
      >
        <ProductForm
          formId="product-form"
          onFormSubmit={(data) => {
            // Redirect to products list after successful submission
            if (typeof window !== 'undefined') {
              window.location.href = '/dashboard/products';
            }
          }}
        />
      </FullPageForm>
    </SidebarLayout>
  );
}



