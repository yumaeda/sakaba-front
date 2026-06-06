import { notFound } from 'next/navigation'
import Link from 'next/link'
import { API_URL, IMG_URL } from '@/constants/Global'

interface Ranking {
  dish: string
  rank: number
  restaurant: string
  restaurant_id: string
  photo: string
  restaurant_url: string
}

interface DishGroup {
  dish: string
  items: Ranking[]
}

export default async function RankingPage() {
  let rankings: Ranking[] | undefined
  const imageDir = `${IMG_URL}/images`

  try {
    const res = await fetch(`${API_URL}/rankings/`, { headers: {} })
    if (!res.ok) {
      notFound()
    }
    const data = await res.json()
    rankings = JSON.parse(JSON.stringify(data.body))
  } catch (error) {
    return <div>Error: {(error as Error).message}</div>
  }

  // Group rankings by dish
  const groupedByDish: DishGroup[] = rankings
      ? rankings.reduce((groups: DishGroup[], ranking: Ranking) => {
        let group = groups.find(g => g.dish === ranking.dish)
        if (!group) {
          group = { dish: ranking.dish, items: [] }
          groups.push(group)
        }
        group.items.push(ranking)
        return groups
        }, [])
    : []

  const getRankIcon = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return ``
    }
  }

  return (
    <>
      <header className="header">
        <Link href="/">
          <picture className="back-image-container">
            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
          </picture>
        </Link>
        <p className="header-label">フードランキング</p>
      </header>
      <div className="contents">
        {rankings ? (
          <div className="ranking-container">
             <div className="ranking-groups">
               {groupedByDish.map((group: DishGroup) => (
                 <div key={group.dish} className="ranking-group">
                    <h2 className="ranking-dish-title">{group.dish}</h2>
                    <ul className="ranking-group-list">
                     {group.items.map((ranking: Ranking) => {
                       const restaurantId = ranking.restaurant_id
                       const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
                       return (
                         <li key={`${ranking.dish}#${ranking.rank}`} className="ranking-group-item">
                             <div className="ranking-item-card">
                               <div className="ranking-item-image">
                                 <img
                                  src={`${restaurantImageDir}/${ranking.photo}_thumbnail.jpg`}
                                  alt={`${ranking.dish} #${ranking.rank}`}
                                  className="ranking-image"
                                />
                               </div>
                               <div className="ranking-item-content">
                                 <div className="ranking-item-rank">
                                   <span className={`ranking-rank-badge rank-${ranking.rank}`}>
                                     {getRankIcon(ranking.rank)}
                                   </span>
                                   <span className="ranking-rank-number">
                                     {ranking.rank}位
                                   </span>
                                 </div>
                                 <div className="ranking-item-info">
                                   <a
                                    href={ranking.restaurant_url}
                                    rel="nofollow noopener"
                                    target="_blank"
                                    className="restaurant-link"
                                   >
                                     {ranking.restaurant}
                                   </a>
                                 </div>
                               </div>
                             </div>
                           </li>
                         )
                       })}
                     </ul>
                   </div>
                 ))}
               </div>
             </div>
           ) : (
             <div className="loading-container">
               <div className="loading-spinner"></div>
               <p>ランキングを読み込んでいます...</p>
             </div>
           )}
         </div>
       </>
     )
}
