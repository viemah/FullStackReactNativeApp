import React from 'react'
import { Tabs } from 'expo-router'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image, TouchableOpacity, View } from 'react-native'
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { cn } from '~/lib/utils'
import { useAuth } from '~/providers/AuthProvider'
import { icons, images } from '~/constants'

const TabLayout = () => {
  const { colorScheme } = useColorScheme()
  const { currentAvatarUrl } = useAuth()

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#5386c0',
          tabBarInactiveTintColor: '#5386c0',
          tabBarActiveBackgroundColor: '#d2e4ee',
          tabBarInactiveBackgroundColor: 'white',
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderCurve: 'circular',
            height: 80,
            backgroundColor: NAV_THEME[colorScheme]['background'],
          },
        }}>
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={icons.homeIcon} style={{ width: 30, height: 30, tintColor: color }} />
            ),
          }}
        />
        <Tabs.Screen
          name='shop'
          options={{
            title: 'Shop',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={icons.marketIcon} style={{ width: 30, height: 30, tintColor: color }} />
            ),
          }}
        />
        <Tabs.Screen
          name='assessment'
          options={{
            title: 'assessment',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Image source={icons.assesmentIcon} style={{ width: 30, height: 30, tintColor: color }} />
            ),
            tabBarButton: props => <MiddleTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name='calendar'
          options={{
            title: 'Calendar',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image source={icons.calendarIcon} style={{ width: 30, height: 30, tintColor: color }} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarButton: props => <ProfileTabBarButton {...props} />,
            tabBarIcon: ({ color, focused }) => (
              <>
                {currentAvatarUrl ? (
                  <View className={cn(`justify-center items-center rounded-full p-0.5`, focused && 'border-2 border-primary')}>
                    <Image source={{ uri: currentAvatarUrl }} className='w-[33px] h-[33px] rounded-full' />
                  </View>
                ) : (
                  <Ionicons name='person-circle-outline' size={35} color={color} />
                )}
              </>
            ),
          }}
        />
      </Tabs>
    </View>
  )
}

const MiddleTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className='w-20 h-20 bg-border rounded-full top-[-24px] justify-center items-center'>
      {children}
    </TouchableOpacity>
  )
}

const ProfileTabBarButton = ({ children, onPress, style }: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      {children}
    </TouchableOpacity>
  )
}

export default TabLayout
