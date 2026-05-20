/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Item from '../interfaces/Item'

interface Props {
    items: Item[]
    itemId: string
    useIdAsValue: boolean
    onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const Dropdown: React.FC<Props> = (props: Props) => {
    const { itemId, items, useIdAsValue, onSelect} = props
    if (items.length === 0) {
        return <></>
    }

    return (
        <select onChange={onSelect} value={itemId}>
        {
            items ? items.map((item: Item, index: number) => (
                <option value={useIdAsValue ? item.id : item.value} key={index}>{item.name}</option>
            )) : ''
        }
        </select>
    )
}
 
export default Dropdown
 