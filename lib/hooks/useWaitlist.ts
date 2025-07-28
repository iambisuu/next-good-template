import { useState } from 'react';

interface WaitlistSubmission {
  email: string;
  name?: string;
}

interface WaitlistData {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface WaitlistResponse {
  success: boolean;
  data?: WaitlistData;
  error?: string;
}

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitToWaitlist = async (submission: WaitlistSubmission): Promise<WaitlistResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return {
          success: false,
          error: data.error || 'Something went wrong',
        };
      }

      return data;
    } catch {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitToWaitlist,
    isLoading,
    error,
  };
}; 