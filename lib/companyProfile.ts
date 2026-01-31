/**
 * Company Profile Data Management
 * Handles company profile data storage and retrieval from localStorage
 */

export interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  legalDocuments?: string[]; // Array of base64 strings for legal documents
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  taxId?: string;
  registrationNumber?: string;
}

/**
 * Default company profile
 */
const defaultCompanyProfile: CompanyProfile = {
  id: '1',
  name: 'Acme Corporation',
  logo: undefined,
  description: 'Your trusted source for quality products',
  email: 'contact@acmecorp.com',
  phone: '+1-555-0123',
  address: '123 Business Street, City, State 12345',
  website: 'https://www.acmecorp.com',
  taxId: '',
  registrationNumber: '',
};

/**
 * Get company profile from localStorage or return default
 */
export function getCompanyProfile(): CompanyProfile {
  if (typeof window === 'undefined') {
    return defaultCompanyProfile;
  }
  
  const stored = localStorage.getItem('companyProfile');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultCompanyProfile;
    }
  }
  
  return defaultCompanyProfile;
}

/**
 * Save company profile to localStorage
 */
export function saveCompanyProfile(profile: CompanyProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('companyProfile', JSON.stringify(profile));
  }
}
