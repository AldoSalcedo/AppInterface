import { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { getLatestGames } from '../lib/metacritic'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatedGameCard } from './GameCard'
import Screen from './screen'

export const MainContent = () => {
  const [games, setGames] = useState([])
  const insets = useSafeAreaInsets()

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games)
    })
  }, [])

  return (
    <Screen>
      {games.length === 0 ? (
        <ActivityIndicator color={'#fff'} size={'large'} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </Screen>
  )
}
