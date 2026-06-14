'use client'

import * as React from 'react'
import Category from '@/interfaces/Category'
import Menu from '@/interfaces/Menu'
import { IMG_URL } from '@/constants/Global'
import MenuList from '@/components/MenuList'
import CategorySwitch from '@/components/CategorySwitch'

interface RestaurantViewProps {
    restaurantId: string
    initialCategories: Category[]
    initialMenus: Menu[]
}

export default function RestaurantView({ restaurantId, initialCategories, initialMenus }: RestaurantViewProps) {
    const defaultCategory = { id: 0, name: '' }
    
    // Initialize states immediately using Server-passed data
    const [category, setCategory] = React.useState<Category>(initialCategories[0] || defaultCategory)
    const categories = initialCategories
    const menus = initialMenus

    const handleCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        const selectedCategoryId = Number(event.currentTarget.id)
        setCategory(categories.find((c: Category) => c.id === selectedCategoryId) ?? defaultCategory)
    }

    const imageDir = `${IMG_URL}/images`

    return (
        <>
            <header className="menu-header"
                    style={{ backgroundImage: `url(${imageDir}/menu-headers/${restaurantId}.png)`}}>
                <CategorySwitch categoryId={ category.id } onCategoryClick={ handleCategoryClick } restaurantId={restaurantId} />
            </header>
            <div className="contents">
                <div>
                {
                    (categories.filter((c: Category) => c.parentId === category.id).length === 0) ? (
                        <MenuList menus={menus.filter((menu: Menu) => menu.category === category.id && menu.subCategory === 0 && menu.region === 0)} />
                    ) : (
                        <>
                        {
                            categories.filter((c: Category) => c.parentId === category.id).map((subCategory: Category) => {
                                const regions = categories.filter((c: Category) => c.parentId === subCategory.id)
                                return (menus.filter((menu: Menu) => menu.category === category.id && menu.subCategory === subCategory.id).length > 0) ? (
                                    <React.Fragment key={subCategory.id}>
                                        <h4 className="menu-sub-category">{subCategory.name}</h4>
                                        <div>
                                        {
                                            (regions.length === 0) ? (
                                                <MenuList menus={menus.filter((menu: Menu) => menu.category === category.id && menu.subCategory === subCategory.id && menu.region === 0)} />
                                            ) : (
                                                <div>
                                                {
                                                    regions.map((region: Category) => {
                                                        return (menus.filter((menu: Menu) => menu.category === category.id && menu.subCategory === subCategory.id && menu.region === region.id).length > 0) ? (
                                                            <React.Fragment key={region.id}>
                                                                <h6 className="menu-region">{region.name}</h6>
                                                                <div>
                                                                    <MenuList menus={menus.filter((menu: Menu) => menu.category === category.id && menu.subCategory === subCategory.id && menu.region === region.id)} />
                                                                </div>
                                                            </React.Fragment>
                                                        ) : null
                                                    })
                                                }
                                                </div>
                                            )
                                        }
                                        </div>
                                    </React.Fragment>
                                ) : null
                            })
                        }
                        </>
                    )
                }
                </div>
            </div>
        </>
    )
}
