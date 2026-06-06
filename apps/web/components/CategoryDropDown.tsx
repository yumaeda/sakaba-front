/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import SelectDropdown from './UI/SelectDropdown'
import { Category } from '@yumaeda/sakaba-interface'

interface Props {
  categories: Category[]
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
  column: string
  value: number
}

const CategoryDropDown: React.FC<Props> = (props) => {
  const { categories, column, handleChange, value } = props

  return (
     <SelectDropdown
       items={categories}
       value={value.toString()}
       onChange={handleChange}
       name={column}
       defaultValue={value.toString()}
       prependDefaultOption
       defaultOptionName="未選択"
      />
     )
}

export default CategoryDropDown
