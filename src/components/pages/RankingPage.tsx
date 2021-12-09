/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Footer from '../Footer'

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

    React.useEffect(() => {
        fetch('https://api.tokyo-dinner.com/rankings/', {
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
        const basePath = 'https://sakaba.link'
        const baseImagePath = 'https://tokyo-takeout.com'

        return (
            <>
                <header className="header">
                    <h1 className="header-label">{`フードランキング`}</h1>
                    <a href={`${basePath}/`}>Back</a>
                </header>
                <div className="contents">
                    <ul className="ranking-list">
                    {rankings ? rankings.map((ranking: Ranking) => {
                        const restaurantId = ranking.restaurant_id
                        const restaurantImageDir = `${baseImagePath}/images/restaurants/${restaurantId}`
                        return (
                        <li className="ranking-item" key={`${ranking.dish}#${ranking.rank}`}>
                            <div>
                                <span>{`${ranking.dish} #${ranking.rank}`}</span>
                                <span>【</span>
                                <a href={ranking.restaurant_url} rel="nofollow noopener" target="_blank">{ranking.restaurant}</a>
                                <span>】</span><br />
                                <img src={`${restaurantImageDir}/${ranking.photo}_thumbnail.jpg`} className="dish-image" alt={`${ranking.dish}#${ranking.rank}`} />
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
