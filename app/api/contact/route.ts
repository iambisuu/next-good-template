import { NextResponse } from 'next/server'
import { prisma } from '@/lib/utils/prisma'

// Handle CORS preflight requests
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, countryName, companyType, message } = body

    // Check if at least one field is provided
    if (!firstName && !lastName && !email && !countryName && !companyType && !message) {
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      )
    }

    // Basic email validation (only if email is provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address' },
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          }
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
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error: unknown) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Something went wrong. Please try again later.' 
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
} 