import type { PropsWithChildren, ReactElement } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '@/components/ThemedView'

const HEADER_HEIGHT = 250

type Props = PropsWithChildren<{
  headerBackgroundColor: string | { dark: string; light: string }
  time: number
  timerComponent: React.ReactNode
}>

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
  timerComponent,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const backgroundColor =
    typeof headerBackgroundColor === 'string'
      ? headerBackgroundColor
      : headerBackgroundColor[colorScheme]

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[styles.header, { backgroundColor }, headerAnimatedStyle]}
        >
          <Animated.View style={styles.timerContainer}>{timerComponent}</Animated.View>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingTop: 35,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
