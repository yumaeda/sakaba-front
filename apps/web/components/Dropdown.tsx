/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import SelectDropdown from './UI/SelectDropdown'
import Item from '@/interfaces/Item'

interface Props {
  items: Item[]
  itemId: string
  useIdAsValue: boolean
  onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const Dropdown: React.FC<Props> = (props) => {
  const { itemId, items, useIdAsValue, onSelect } = props

  return (
    <SelectDropdown
      items={items}
      value={itemId}
      onChange={onSelect}
      useIdAsValue={useIdAsValue}
    />
  )
}

export default Dropdown
