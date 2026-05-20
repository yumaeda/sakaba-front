/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Footer from '../Footer'
import { API_URL, IMG_URL, WEB_URL } from '../../constants/Global'

interface Ranking {
    dish: string
    rank: number
    restaurant: string
    restaurant_id: string
    photo: string
    restaurant_url: string
}

const RankingPage: React.FC = () => {
    const [error, setError] = React.useState<Error>()
    const [rankings, setRankings] = React.useState<Ranking[]>()
    const imageDir = `${IMG_URL}/images`

    React.useEffect(() => {
        fetch(`${API_URL}/rankings/`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRankings(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {

        return (
            <>
                <header className="header">
                    <a href={`${WEB_URL}/`}>
                        <picture className="back-image-container">
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <p className="header-label">{`フードランキング`}</p>
                </header>
                <div className="contents">
                    <ul className="ranking-list">
                    {rankings ? rankings.map((ranking: Ranking) => {
                        const restaurantId = ranking.restaurant_id
                        const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
                        return (
                        <li className="ranking-item" key={`${ranking.dish}#${ranking.rank}`}>
                            <div>
                                <span>{`${ranking.dish} #${ranking.rank}`}</span>
                                <span>【</span>
                                <a href={ranking.restaurant_url} rel="nofollow noopener" target="_blank">{ranking.restaurant}</a>
                                <span>】</span><br />
                                <img src={`${restaurantImageDir}/${ranking.photo}_thumbnail.jpg`} alt={`${ranking.dish}#${ranking.rank}`} />
                            </div>
                        </li>
                        )}) : <div>Loading...</div>}
                    </ul>
                </div> 
                <Footer />
            </>
        )
    }
}

export default RankingPage
