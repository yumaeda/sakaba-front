/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Menu } from '@yumaeda/sakaba-interface'
import MenuPrice from './MenuPrice'

interface Props {
    menus: Menu[]
}

const MenuList: React.FC<Props> = (props) => {
    const { menus } = props

    return (menus.length > 0) ?  (
        <div>
            <ul className="menu-list">
            {
                menus.filter((targetMenu: Menu) => targetMenu.isHidden == 0).map((menu: Menu) => {
                    return (
                        <li className="menu-item" key={menu.name}>
                            <div className="menu-name-cell">
                                <span className="menu-name">{menu.name}</span>
                                <br />
                                <span className="menu-name-ja">{menu.nameJpn}</span>
                            </div>
                            <MenuPrice price={menu.price} isMinPrice={menu.isMinPrice} />
                        </li>
                    )
                })
            }
            </ul>
        </div>
    ) : <></>
}

export default MenuList
