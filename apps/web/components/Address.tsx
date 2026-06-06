/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import IconLink from './UI/IconLink'

interface Props {
  text: string
  latitude: string
  longitude: string
}

const Address: React.FC<Props> = (props) => {
  const { text, latitude, longitude } = props

  return (
     <IconLink
       href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
       imagePath="map"
       alt="Google Map"
       title={text}
       target="_blank"
      />
    )
}

export default Address
