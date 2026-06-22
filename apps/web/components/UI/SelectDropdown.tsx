/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface SelectDropdownProps<T extends { id: string | number; name: string }> {
  items: T[]
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  useIdAsValue?: boolean
  prependDefaultOption?: boolean
  defaultOptionName?: string
  name?: string
  defaultValue?: string
}

const SelectDropdown: React.FC<SelectDropdownProps<any>> = (props) => {
  const {
    items,
    value,
    onChange,
    useIdAsValue = true,
    prependDefaultOption = false,
    defaultOptionName = '未選択',
    name,
    defaultValue,
    } = props

  if (items.length === 0) {
    return <></>
    }

  const options = prependDefaultOption
       ? [{ id: 0, name: defaultOptionName }, ...items]
       : items

  return (
      <select name={name} onChange={onChange} value={value} defaultValue={defaultValue}>
         {options.map((item, index: number) => (
           <option value={useIdAsValue ? String(item.id) : (item.value ?? item.name)} key={index}>
             {item.name}
           </option>
         ))}
       </select>
      )
}

export default SelectDropdown
