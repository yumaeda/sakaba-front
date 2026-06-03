/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import React from 'react'
import { Grid, type CellComponentProps } from 'react-window'
import Photo from 'interfaces/Photo'
import { API_URL } from 'constants/Global'

const CellComponent = ({ columnIndex, style, openImageViewer, photos = [], restaurantId, basePath }: CellComponentProps<ColumnProps>) => (
  <DishPhoto 
    index={columnIndex} 
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
    photos: Photo[]
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
        <div style={{ ...style, display: 'inline-block' }} key={index}>
            <div className="dish-image-wrapper" onClick={ () => { data.openImageViewer(index) }}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                    <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="tile-image dish-image" alt={`店舗写真${index}`} />
                </picture>
            </div>
        </div>
    ) : <div style={style}></div> 
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

    const dynamicCellProps = {
        openImageViewer,
        photos: photos || [],
        restaurantId: restaurantId || '',
        basePath: basePath || ''
    }

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

    const VirtualGrid = Grid as any

    return (
        <VirtualGrid
            width={window.innerWidth}
            height={85}
            cellComponent={CellComponent}
            cellProps={dynamicCellProps}
            columnCount={photos ? photos.length : 0}
            columnWidth={100}
            rowCount={1}
            rowHeight={85}
        />
    )
}

export default DishPhotoList
