import { NextResponse } from 'next/server'
import { prisma } from '@/lib/utils/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, countryName, companyType, message } = body

    // Check if at least one field is provided
    if (!firstName && !lastName && !email && !countryName && !companyType && !message) {
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { status: 400 }
      )
    }

    // Basic email validation (only if email is provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address' },
          { status: 400 }
        )
      }
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        countryName: countryName || '',
        companyType: companyType || '',
        message: message || '',
      },
    })

    return NextResponse.json({ 
      success: true, 
      data: submission,
      message: 'Contact form submitted successfully!' 
    })
  } catch (error: unknown) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    )
  }
} 