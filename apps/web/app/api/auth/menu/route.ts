import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '@/constants/Global'
import { getAuthToken } from '@/utils/HttpAuth'

const getHeaders = async () => {
  const authHeader = await getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(authHeader ? { 'Authorization': authHeader } : {}),
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    const headers = await getHeaders()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'GET',
      headers,
      body: JSON.stringify({ id }),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = await getHeaders()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = await getHeaders()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = await getHeaders()
    const res = await fetch(`${API_URL}/auth/menu/`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 })
  }
}
