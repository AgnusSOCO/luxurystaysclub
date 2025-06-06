import { parseAPIError, shouldRetry, getRetryDelay, APIError } from './validation';

export interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: APIError) => void;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 16000,
    onRetry
  } = options;

  let lastError: APIError;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = parseAPIError(error);
      
      if (!shouldRetry(lastError, attempt, maxAttempts)) {
        throw lastError;
      }
      
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }
      
      // Wait before retrying
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

export class RetryableError extends Error {
  constructor(message: string, public retryable: boolean = true) {
    super(message);
    this.name = 'RetryableError';
  }
}

// Specific retry configurations for different operations
export const RETRY_CONFIGS = {
  quote: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 8000
  },
  reservation: {
    maxAttempts: 2,
    baseDelay: 2000,
    maxDelay: 10000
  },
  availability: {
    maxAttempts: 3,
    baseDelay: 500,
    maxDelay: 4000
  },
  listings: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 8000
  }
};

