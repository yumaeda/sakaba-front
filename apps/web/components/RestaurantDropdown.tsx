/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import SelectDropdown from './UI/SelectDropdown'
import Restaurant from '@/interfaces/Restaurant'

interface Props {
  restaurants: Restaurant[]
  restaurantId: string
  onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const RestaurantDropDown: React.FC<Props> = (props) => {
  const { restaurantId, restaurants, onSelect } = props

  return (
     <SelectDropdown
       items={restaurants}
       value={restaurantId}
       onChange={onSelect}
      />
    )
}

export default RestaurantDropDown
