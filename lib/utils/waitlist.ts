export type WaitlistSubmission = {
  name?: string
  email: string
}

export async function submitToWaitlist({ name, email }: WaitlistSubmission) {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Something went wrong. Please try again later.',
      }
    }

    return data
  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }
} 