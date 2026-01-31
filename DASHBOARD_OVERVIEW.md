# Savana Marketplace Seller Dashboard

A comprehensive seller dashboard built with Next.js 16, TypeScript, Material-UI (MUI), and React.

## Features

### 🎨 **Sidebar Navigation**
- Modern, responsive sidebar with gradient background
- 10+ navigation links with icons from Lucide React
- Active state highlighting
- Notification badge for unread notifications
- Collapsible help and logout sections

### 📊 **Dashboard Pages**

#### 1. **Dashboard Home** (`/dashboard`)
- Overview statistics cards
- Total products, orders, revenue metrics
- Recent orders table
- Trend indicators (↑/↓)

#### 2. **Products** (`/dashboard/products`)
- Product grid layout
- Product cards with images
- Status badges (draft, active, out of stock, archived)
- Quick action buttons (View, Edit, Delete)
- Add product button

#### 3. **Orders** (`/dashboard/orders`)
- Orders table with all details
- Customer information
- Order status with color coding
- Export functionality
- Filterable by status

#### 4. **Categories** (`/dashboard/categories`)
- Category grid display
- Subcategories with indentation
- Product count per category
- Add/Edit/Delete actions

#### 5. **Analytics** (`/dashboard/analytics`)
- Revenue metrics
- Conversion rate tracking
- Sales breakdown by status
- Top products leaderboard
- Visual progress bars

#### 6. **Customers** (`/dashboard/customers`)
- Customer list table
- Total orders per customer
- Total spending calculation
- Last order date
- Avatar initials

#### 7. **Addresses** (`/dashboard/addresses`)
- Address cards
- Default address badge
- Full address details
- Edit and delete actions

#### 8. **Notifications** (`/dashboard/notifications`)
- Telegram-style chat interface
- Grouped by date with date separators
- Color-coded notification types
- Unread badge indicator
- Action links
- Mark as read functionality
- Clear all option
- Tabbed interface (All, Unread, Read)

#### 9. **Revenue** (`/dashboard/revenue`)
- Total revenue display
- Average order value
- Revenue growth tracking
- Pending payouts
- Transaction history

#### 10. **Settings** (`/dashboard/settings`)
- Settings categories grid with sidebar navigation
- Profile management
- Notification preferences
- Billing settings
- Security options
- Localization settings
- Appearance settings

#### 11. **Company Profile** (`/dashboard/profile`)
- Company logo upload with preview
- Legal documents upload (multiple files)
- Company information management
- Real-time sidebar synchronization

#### 12. **Help & Support** (`/dashboard/help`)
- Live chat option
- Email support
- Knowledge base
- FAQ section
- Help topics organized by category

## Data Models

### Entities with Mock Data

1. **Product**
   - Basic info (name, description, SKU, status)
   - Product properties (color, size, etc.)
   - Product pricing (base, compare, cost prices)
   - Product images with primary flag
   - Category association
   - Order items

2. **Product Property**
   - Name, value, type
   - Supports: text, number, boolean, color, size

3. **Product Pricing**
   - Base price, compare at price, cost price
   - Currency support
   - Tax inclusion flag
   - Discounts

4. **Product Image**
   - Image URL
   - Alt text
   - Primary flag
   - Display order

5. **Order**
   - Order number, status
   - Customer info (name, email)
   - Shipping and billing addresses
   - Order items
   - Total amount, currency

6. **Order Item**
   - Product association
   - Quantity, unit price, total price

7. **Category**
   - Name, slug, description
   - Parent-child relationships
   - Product count
   - Image support

8. **Address**
   - Full address details
   - First/last name
   - Company (optional)
   - Phone number
   - Default address flag

9. **Notification**
   - Title, message
   - Type (info, success, warning, error)
   - Read status
   - Action URL
   - Timestamp

## File Structure

```
apps/seller/
├── app/
│   ├── dashboard/
│   │   ├── addresses/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── help/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── page.tsx (dashboard home)
│   │   ├── products/page.tsx
│   │   ├── revenue/page.tsx
│   │   └── settings/page.tsx
│   ├── logout/page.tsx
│   ├── page.tsx (redirects to dashboard)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── AddressForm.tsx
│   ├── CategoryForm.tsx
│   ├── CompanyProfileForm.tsx
│   ├── DashboardCard.tsx
│   ├── DataTable.tsx
│   ├── FileUpload.tsx
│   ├── FormDialog.tsx
│   ├── FullPageForm.tsx
│   ├── OrderForm.tsx
│   ├── ProductForm.tsx
│   ├── ProductGroupForm.tsx
│   ├── ProductImageForm.tsx
│   ├── ProductPricingForm.tsx
│   ├── ProductPropertyForm.tsx
│   ├── Sidebar.tsx
│   ├── SidebarLayout.tsx
│   └── ThemeRegistry.tsx
└── lib/
    ├── companyProfile.ts
    ├── mockData.ts
    ├── theme.ts
    └── types.ts
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library and styling
- **Material Icons** - Icon library

## Design Features

- ✅ Modern, clean UI
- ✅ Responsive design
- ✅ Dark sidebar with gradient
- ✅ Color-coded status badges
- ✅ Hover effects and transitions
- ✅ Professional data tables
- ✅ Interactive cards
- ✅ Consistent spacing and typography

## Key Features

- ✅ **Responsive Design** - Fully responsive across all devices
- ✅ **Modern UI** - Bazaar template-inspired design
- ✅ **File Upload** - Company logo and legal documents
- ✅ **Real-time Sync** - Sidebar updates when profile changes
- ✅ **Advanced Filtering** - Filter drawer on all data tables
- ✅ **Pagination** - Built-in pagination for all tables
- ✅ **Telegram-style Notifications** - Chat interface for notifications
- ✅ **Dynamic Company Profile** - Editable company name and logo
- ✅ **Multi-variant Products** - Support for product variants
- ✅ **Multiple Pricing** - Support for multiple pricing tiers

## Future Enhancements

When integrating with backend:
1. Replace mock data with API calls
2. Add authentication middleware
3. Implement form validation
4. Add real-time data synchronization
5. CSV export for orders/products
6. Analytics charts and graphs
7. Real-time notifications

