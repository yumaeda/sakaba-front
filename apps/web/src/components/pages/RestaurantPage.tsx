/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import camelcaseKeys = require('camelcase-keys')
import { Category, Menu } from '@yumaeda/sakaba-interface'
import { API_URL, IMG_URL } from '../../constants/Global'
import MenuList from '../MenuList'
import CategorySwitch from '../CategorySwitch'

const RestaurantPage: React.FC = () => {
    const params = useParams()
    const restaurantId = params.restaurant || ''
    const defaultCategory = { id: 0, name: ''}
    const [error, setError] = React.useState<Error>()
    const [category, setCategory] = React.useState<Category>(defaultCategory)
    const [categories, setCategories] = React.useState<Category[]>([])
    const [menus, setMenus] = React.useState<Menu[]>([])

    const handleCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        const selectedCategoryId = Number(event.currentTarget.id)
        setCategory(categories.find((currentCategory: Category) => currentCategory.id == selectedCategoryId) ?? defaultCategory)
    }

    React.useEffect(() => {
        fetch(`${API_URL}/categories/${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                const tmpCategories = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                setCategory(tmpCategories[0])
                setCategories(tmpCategories)
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${API_URL}/menus/${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                const tmpMenus = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                setMenus(tmpMenus)
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const imageDir = `${IMG_URL}/images`

        return (
            <>
                <header className="menu-header"
                        style={{ backgroundImage: `url(${imageDir}/menu-headers/${restaurantId}.png)`}}>
                    <CategorySwitch categoryId={ category.id } onCategoryClick={ handleCategoryClick } restaurantId={restaurantId} />
                </header>
                <div className="contents">
                {
                    <>
                        <div>
                        {
                            (categories.filter((currentCategory: Category) => currentCategory.parentId == category.id).length == 0) ? (
                                <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.subCategory == 0 && menu.region == 0)} />
                            ) : (
                                <>
                                {
                                    categories.filter((currentCategory: Category) => currentCategory.parentId == category.id).map((subCategory: Category) => {
                                        const regions = categories.filter((currentCategory: Category) => currentCategory.parentId == subCategory.id)
                                        return (menus.filter((menu: Menu) => menu.category == category.id && menu.subCategory == subCategory.id).length > 0) ? (
                                            <>
                                                <h4 className="menu-sub-category">{subCategory.name}</h4>
                                                <div>
                                                {
                                                    (regions.length == 0) ? (
                                                        <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.subCategory == subCategory.id && menu.region == 0)} />
                                                    ) : (
                                                        <div>
                                                        {
                                                            regions.map((region: Category) => {
                                                                return (menus.filter((menu: Menu) => menu.category == category.id && menu.subCategory == subCategory.id && menu.region == region.id).length > 0) ? (
                                                                <>
                                                                    <h6 className="menu-region">{region.name}</h6>
                                                                    <div>
                                                                        <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.subCategory == subCategory.id && menu.region == region.id)} />
                                                                    </div>
                                                                </>
                                                                ) : ''
                                                            })
                                                        }
                                                        </div>
                                                    )
                                                }
                                                </div>
                                            </>
                                        ) : ''
                                    })
                                }
                                </>
                            )
                        }
                        </div>
                    </>
                }
                </div>
            </>
        )
    }
}

export default RestaurantPage
