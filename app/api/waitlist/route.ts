import { NextResponse } from 'next/server'
import { prisma } from '@/lib/utils/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const entry = await prisma.waitlistEntry.create({
      data: {
        name: name || '',
        email,
      },
    })

    return NextResponse.json({ success: true, data: entry })
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false,
          error: 'This email is already on the waitlist.' 
        },
        { status: 409 }
      )
    }

    console.error('Error submitting to waitlist:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    )
  }
} 