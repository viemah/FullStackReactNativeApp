import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CalendarList, DateData } from 'react-native-calendars'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'

type MarkedDateType = { [key: string]: { selected?: boolean; marked?: boolean } }

const CalendarPage = () => {
  const { width } = useWindowDimensions()
  const { colorScheme } = useColorScheme()
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().slice(0, 10))
  const [markedDates, setMarkedDates] = useState<MarkedDateType>({})

  const getMarkedDates = (year: number, month: number): { [key: string]: { selected?: boolean; marked?: boolean } } => {
    return {
      '2024-07-11': { marked: true },
      '2024-07-12': { marked: true },
      '2024-07-15': { marked: true },
      '2024-07-18': { marked: true },
    }
  }

  const onDayPress = (day: DateData) => {
    setMarkedDates(prev => {
      prev = { ...prev }
      if (prev[selectedDay]) prev[selectedDay].selected = false
      const newMarkedDay = prev[day.dateString] ?? {}
      newMarkedDay.selected = true
      prev[day.dateString] = newMarkedDay
      return prev
    })
    setSelectedDay(day.dateString)
  }

  useEffect(() => {
    // on start, get all marked dates for current month
    const todayDate = new Date()
    const today = todayDate.toISOString().slice(0, 10)

    const marked = getMarkedDates(todayDate.getFullYear(), todayDate.getMonth() + 1)
    const markedToday = marked[today] ?? {}
    markedToday.selected = true
    marked[today] = markedToday
    setMarkedDates(marked)
  }, [])

  return (
    <SafeAreaView className='h-full'>
      <ScrollView className='h-full'>
        <CalendarList
          staticHeader
          hideArrows
          horizontal
          pagingEnabled
          calendarWidth={width}
          markedDates={markedDates}
          onVisibleMonthsChange={months => {
            // console.log('now these months are visible', months)
          }}
          onDayPress={onDayPress}
          theme={{
            //@ts-ignore
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: NAV_THEME[colorScheme].notification,
              },
              dayTextAtIndex6: {
                color: NAV_THEME[colorScheme].primary,
              },
            },
            // 'todayTextColor': 'blue',
            'selectedDayBackgroundColor': '#00adf5',
            'selectedDayTextColor': '#ffffff',
            'calendarBackground': NAV_THEME[colorScheme].background,
            'dayTextColor': NAV_THEME[colorScheme].text,
            'monthTextColor': NAV_THEME[colorScheme].text,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CalendarPage
