import * as React from 'react'
import camelcaseKeys from 'camelcase-keys'
import Category from '@/interfaces/Category'
import { API_URL } from '@/constants/Global'
import Menu from '@/interfaces/Menu'
import RestaurantView from '@/components/RestaurantView'

interface Props {
    params: Promise<{ restaurant?: string }>
}

// Data fetching helper functions running directly on the server
async function getCategories(restaurantId: string): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories/${restaurantId}`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    const data = await res.json()
    return camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
}

async function getMenus(restaurantId: string): Promise<Menu[]> {
    const res = await fetch(`${API_URL}/menus/${restaurantId}`)
    if (!res.ok) throw new Error('Failed to fetch menus')
    const data = await res.json()
    return camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
}

export default async function RestaurantPage({ params }: Props) {
    const resolvedParams = await params
    const restaurantId = resolvedParams.restaurant || ''

    try {
        // Fetch data concurrently on the server
        const [categories, menus] = await Promise.all([
            getCategories(restaurantId),
            getMenus(restaurantId)
        ])

        // Pass server-fetched data to the interactive Client Component wrapper
        return (
            <RestaurantView 
                restaurantId={restaurantId} 
                initialCategories={categories} 
                initialMenus={menus} 
            />
        )
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
    }
}
