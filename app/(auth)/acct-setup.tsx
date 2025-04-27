import React, { useRef, useState } from 'react'
import { View, FlatList, Animated, useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import axios from '~/lib/axios'
import { AccountSetupGlobalFormType, AccountSetupPageType } from '@/types/acctSetup'
import { Loader, LogoutButton, Paginator } from '~/components/Common'
import { useAuth } from '~/providers/AuthProvider'
import { Ionicons } from '@expo/vector-icons'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import AccountSetupMain from '~/components/AccountSetup/AccountSetupMain'
import NextPageButton from '~/components/AccountSetup/NextPageButton'
import { UNEXPECTED_ERROR } from '~/constants/errorMessage'

const AcctSetUp = () => {
  const { width } = useWindowDimensions()
  const { refreshSession, getMe } = useAuth()
  const { colorScheme } = useColorScheme()

  const flatListRef = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentPage(viewableItems[0].index)
  }).current

  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  // Initial pages to be rendered on Flatlist. Additional pages will be added dynamically afterwards
  const [pages, setPages] = useState<AccountSetupPageType[]>([
    { component: 'AccountInfoPage', valid: false },
    { component: 'SimpleInfoPageOne', valid: true },
    { component: 'SimpleInfoPageTwo', valid: true },
  ])
  const [globalForm, setGlobalForm] = useState<AccountSetupGlobalFormType>({
    name: '',
    username: '',
    isParent: true,
    noOfChild: 1,
    child: [],
    infoPageOne: {
      childDevelopmentAssessment: false,
      senAssessment: false,
      personalizedHomeLearningGuide: false,
      toysPlayingGuide: false,
      aiTraining: false,
      professionalClassesWorkshops: false,
      globalProfessionalNetwork: false,
    },
    infoPageTwo: {
      facebook: false,
      instagram: false,
      google: false,
      publicEvents: false,
      friends: false,
      organizations: false,
    },
  })

  // If index is supplied, navigate to index, if not, go next page
  const navigateToPage = (index: number = currentPage + 1, requireValid: boolean = true) => {
    if (index >= pages.length) {
      // All pages are done, complete account setup
      completeSetup()
      return
    }
    if (!requireValid || pages[currentPage].valid) flatListRef.current?.scrollToIndex({ index })
  }

  const completeSetup = async () => {
    setLoading(true)
    try {
      const formData = new FormData()

      const child = globalForm.child.slice(0, globalForm.noOfChild)

      child.forEach((children, i) => {
        if (children.avatar) {
          const extension = children.avatar.uri.substring(children.avatar.uri.lastIndexOf('.') + 1)
          // @ts-expect-error: popular ts error. formData is expecting Blob type.
          formData.append('avatar', {
            uri: children.avatar.uri,
            name: `children-${i}.${extension}`,
            type: children.avatar.mimeType,
          })
        }
      })
      // infoPageOneKeys & infoPageTwoKeys are string of keys that are 'true' in format of "a,c" if only a c are true or empty string '' if none are true
      formData.append(
        'body',
        JSON.stringify({
          child: child.map(children => ({ ...children, avatar: undefined })),
          isParent: globalForm.isParent,
          name: globalForm.name,
          username: globalForm.username,
          infoPageOneKeys: Object.keys(globalForm.infoPageOne)
            .filter(key => globalForm.infoPageOne[key as keyof AccountSetupGlobalFormType['infoPageOne']])
            .join(','),
          infoPageTwoKeys: Object.keys(globalForm.infoPageTwo)
            .filter(key => globalForm.infoPageTwo[key as keyof AccountSetupGlobalFormType['infoPageTwo']])
            .join(','),
        })
      )

      await axios.post('/auth/acct-setup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
          return formData
        },
      })
      await refreshSession()
      await getMe()
      while (router.canGoBack()) router.back()
      router.replace('/home')
    } catch (error: any) {
      console.error('error', error.response?.data)
      Alert.alert('Oops', error.response?.data ?? UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }

  // This listener blocks user from scrolling to the next page if the page is not valid yet.
  const onScrollListener = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x
    if (!pages[currentPage].valid && scrollOffset >= currentPage * width) {
      // Disable scrolling to the right
      flatListRef.current?.scrollToOffset({ offset: currentPage * width, animated: false })
    }
  }

  return (
    <SafeAreaView>
      <View className='h-full items-center' style={{ width }}>
        <FlatList
          ref={flatListRef}
          data={pages}
          renderItem={({ item, index }) => (
            // All Item will be rendered with AccountSetupMain separately, AccountSetupMain will identify which component to render.
            <View style={{ width }}>
              <AccountSetupMain page={item} setPages={setPages} globalForm={globalForm} setGlobalForm={setGlobalForm} pageNumber={index} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item: AccountSetupPageType, index: number) => `${item.component}-${index}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
            listener: onScrollListener,
          })}
          scrollEventThrottle={16}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
        {currentPage > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigateToPage(currentPage - 1, false)
            }}
            className='absolute top-0 left-0 px-4 py-2 '>
            <Ionicons name='arrow-back-outline' size={28} color={NAV_THEME[colorScheme]['text']} style={{ opacity: 0.8 }} />
          </TouchableOpacity>
        )}
        <View className='absolute bottom-0 w-full h-[140px] gap-10 items-center'>
          <NextPageButton goNextPage={navigateToPage} canGoNext={pages[currentPage]['valid']} percentage={(currentPage + 1) * (100 / pages.length)} />
          <Paginator data={pages} scrollX={scrollX} />
          <LogoutButton buttonStyles={'absolute bottom-4 left-8'} />
        </View>
      </View>
      <Loader transparent isLoading={loading} />
    </SafeAreaView>
  )
}

export default AcctSetUp
