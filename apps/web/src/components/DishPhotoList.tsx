/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import React from 'react'
import { List, RowComponentProps } from 'react-window'
import Photo from '../interfaces/Photo'
import { API_URL } from '../constants/Global'

interface CustomRowData {
    openImageViewer: (index: number) => void
    photos: Photo[] | null
    restaurantId: string
    basePath: string
}

const PhotoColumn = ({ index, style, openImageViewer, photos, restaurantId, basePath }: RowComponentProps<CustomRowData>) => (
  <DishPhoto 
    index={index} 
    style={style} 
    data={{ openImageViewer, photos, restaurantId, basePath }}
  />
)

interface Props {
    basePath: string
    restaurantId: string
    setImageUrls: (imageUrls: string[]) => void
    setImageIndex: (imageIndex: number) => void
    setIsViewerOpen: (isViewerOpen: boolean) => void
}

interface ColumnProps {
    openImageViewer: (index: number) => void
    basePath: string
    restaurantId: string
    photos: Photo[] | null
}

interface ColumnStyle {
    index: number
    style: React.CSSProperties
    data: ColumnProps
}

const DishPhoto: React.FC<ColumnStyle> = (props) => {
    const { data, index, style } = props
    const restaurantImageDir = `${data.basePath}/images/restaurants/${data.restaurantId}`
    const photo = (data.photos && data.photos.length > index) ? data.photos[index] : null

    return photo ? (
        <div style={style} key={index}>
            <div className="dish-image-wrapper" onClick={ () => { data.openImageViewer(index) }}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                    <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="tile-image dish-image" alt={`店舗写真${index}`} />
                </picture>
            </div>
        </div>
    ) : <div></div> 
}

const DishPhotoList: React.FC<Props> = (props) => {
    const { basePath, restaurantId, setImageUrls, setImageIndex, setIsViewerOpen } = props
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const imageDir = `${basePath}/images`

    const openImageViewer = (index: number) => {
        const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
        const tmpImageUrls = photos.map((photo: Photo) => `${restaurantImageDir}/${photo.image}`)
        setImageUrls(tmpImageUrls)
        setImageIndex(index)
        setIsViewerOpen(true)
    }

    const dynamicRowProps = photos ? { openImageViewer, photos, restaurantId, basePath } : {}

    const VirtualList = List as any

    React.useEffect(() => {
        fetch(`${API_URL}/photos/${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setPhotos(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                console.error(error)
            }
        )
    }, [])

    return (<div>VirtualList</div>)
    /*return (
        <VirtualList
            layout="horizontal"
            width={window.innerWidth}
            height={85}
            rowCount={photos ? photos.length : 0}
            rowHeight={100}
            rowProps={dynamicRowProps}
            rowComponent={PhotoColumn}
        />
    )*/
}

export default DishPhotoList
