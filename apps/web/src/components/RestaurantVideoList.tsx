/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Video from '../interfaces/Video'

interface Props {
    videos: Video[] | null
}

const RestaurantVideoList: React.FC<Props> = (props) => {
    const { videos } = props

    return videos ? (
        <div className="video-container">
        {
            videos.map((video: Video) => (
                    <iframe width="100"
                            height="85"
                            src={video.url}
                            title={video.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
            ))
        }
        </div>
    ) : <div></div>
}

export default RestaurantVideoList
