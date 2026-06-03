import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/constants/Global'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
     }

  try {
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${request.headers.get('Authorization')?.replace('Bearer ', '')}`,
         },
      body: JSON.stringify({ id }),
          })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${request.headers.get('Authorization')?.replace('Bearer ', '')}`,
         },
      body: JSON.stringify(body),
          })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${request.headers.get('Authorization')?.replace('Bearer ', '')}`,
         },
      body: JSON.stringify(body),
          })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${request.headers.get('Authorization')?.replace('Bearer ', '')}`,
         },
      body: JSON.stringify(body),
          })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
    } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 })
    }
}
