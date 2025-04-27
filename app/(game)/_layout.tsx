import React from 'react'
import { Stack } from 'expo-router'

const GameLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='game'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default GameLayout
