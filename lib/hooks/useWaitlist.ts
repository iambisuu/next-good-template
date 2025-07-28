import { useState } from 'react'
import { submitToWaitlist, WaitlistSubmission } from '../utils/waitlist'

export function useWaitlist() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: WaitlistSubmission) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await submitToWaitlist(data)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submit,
    isLoading,
    error,
    success,
  }
} 