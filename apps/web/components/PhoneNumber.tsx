/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import IconLink from './UI/IconLink'

interface Props {
  tel: string
}

const PhoneNumber: React.FC<Props> = (props) => {
  const { tel } = props

  return (
     <IconLink
       href={`tel:${tel}`}
       imagePath="tel"
       alt="Phone Number"
       />
    )
}

export default PhoneNumber
