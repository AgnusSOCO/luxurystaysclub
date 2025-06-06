// Validation utilities for booking forms and API calls

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface GuestDetailsValidation {
  name: ValidationResult;
  email: ValidationResult;
  phone: ValidationResult;
  overall: ValidationResult;
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone.trim()) {
    errors.push('Phone number is required');
  } else {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errors.push('Phone number must be at least 10 digits');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name.trim()) {
    errors.push('Full name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateGuestDetails = (guestDetails: {
  name: string;
  email: string;
  phone: string;
}): GuestDetailsValidation => {
  const nameValidation = validateName(guestDetails.name);
  const emailValidation = validateEmail(guestDetails.email);
  const phoneValidation = validatePhone(guestDetails.phone);
  
  const allErrors = [
    ...nameValidation.errors,
    ...emailValidation.errors,
    ...phoneValidation.errors
  ];
  
  return {
    name: nameValidation,
    email: emailValidation,
    phone: phoneValidation,
    overall: {
      isValid: allErrors.length === 0,
      errors: allErrors
    }
  };
};

export const validateDateRange = (checkIn: Date | null, checkOut: Date | null, minStay: number = 2): ValidationResult => {
  const errors: string[] = [];
  
  if (!checkIn) {
    errors.push('Check-in date is required');
  }
  
  if (!checkOut) {
    errors.push('Check-out date is required');
  }
  
  if (checkIn && checkOut) {
    if (checkIn >= checkOut) {
      errors.push('Check-out date must be after check-in date');
    } else {
      const daysDifference = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDifference < minStay) {
        errors.push(`Minimum stay is ${minStay} nights`);
      }
    }
    
    // Check if check-in is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkIn < today) {
      errors.push('Check-in date cannot be in the past');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateGuestCount = (guests: number, maxCapacity: number): ValidationResult => {
  const errors: string[] = [];
  
  if (guests < 1) {
    errors.push('At least 1 guest is required');
  }
  
  if (guests > maxCapacity) {
    errors.push(`Maximum ${maxCapacity} guests allowed`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// API Error handling utilities
export interface APIError {
  message: string;
  code?: string;
  status?: number;
  retryable?: boolean;
}

export const parseAPIError = (error: any): APIError => {
  // Handle Axios errors
  if (error.response) {
    return {
      message: error.response.data?.error || error.response.data?.message || 'API request failed',
      code: error.response.data?.code,
      status: error.response.status,
      retryable: error.response.status >= 500 || error.response.status === 429
    };
  }
  
  // Handle network errors
  if (error.request) {
    return {
      message: 'Network error. Please check your connection and try again.',
      retryable: true
    };
  }
  
  // Handle other errors
  return {
    message: error.message || 'An unexpected error occurred',
    retryable: false
  };
};

export const getRetryDelay = (attempt: number): number => {
  // Exponential backoff: 1s, 2s, 4s, 8s, 16s
  return Math.min(1000 * Math.pow(2, attempt), 16000);
};

export const shouldRetry = (error: APIError, attempt: number, maxAttempts: number = 3): boolean => {
  return error.retryable && attempt < maxAttempts;
};

// User-friendly error messages
export const getErrorMessage = (error: APIError): string => {
  switch (error.status) {
    case 400:
      return 'Invalid request. Please check your information and try again.';
    case 401:
      return 'Authentication failed. Please refresh the page and try again.';
    case 403:
      return 'Access denied. You may not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'This booking conflicts with existing reservations. Please select different dates.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Server error. Please try again in a few moments.';
    default:
      return error.message;
  }
};

