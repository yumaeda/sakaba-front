/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import camelcaseKeys = require('camelcase-keys')
import { Category } from '@yumaeda/sakaba-interface'
import { API_URL } from '../constants/Global'

interface Props {
    categoryId: number
    onCategoryClick: React.MouseEventHandler<HTMLSpanElement>
    restaurantId: string
}

const CategorySwitch: React.FC<Props> = (props) => {
    const { categoryId, onCategoryClick, restaurantId } = props
    const [categories, setCategories] = React.useState<Category[]>([])

    React.useEffect(() => {
        fetch(`${API_URL}/categories/${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                const tmpCategories = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                setCategories(tmpCategories)
            },
            (error: Error) => {
                console.dir(error)
            }
        )
    }, [])

    return (
        <div className="category-switch">
        {
            categories?.filter((category: Category) => category.parentId === 0).map((category: Category) => (
                <div id={category.id.toString()}
                     key={category.id.toString()}
                     className={ (category.id == categoryId) ? 'category-button--selected' : 'category-button' }
                     onClick={onCategoryClick}>
                {
                    category.name
                }
                </div>
            ))
        }
        </div>
    )
}

export default CategorySwitch
