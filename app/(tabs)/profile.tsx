import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, FormField, LogoutButton } from '~/components/Common'
import { useAuth } from '~/providers/AuthProvider'
import { cn } from '~/lib/utils'

const Profile = () => {
  const { user, currentAvatarUrl, changeProfile } = useAuth()

  return (
    <SafeAreaView>
      <ScrollView className='h-full'>
        <View className='w-full h-full items-center px-6 mb-12'>
          <View className='mt-12 justify-center items-center'>
            {user?.isParent === false ? (
              <Avatar uri={currentAvatarUrl} />
            ) : (
              <Text className='font-regular text-lg text-muted-foreground'>Your profile</Text>
            )}
          </View>
          <FormField title='Name' value={user?.name ?? ''} editable={false} handleChangeText={() => {}} otherStyles='mb-4' />
          <FormField title='Username' value={user?.username ?? ''} editable={false} handleChangeText={() => {}} otherStyles='mt-0 mb-4' />
          <FormField title='Email' value={user?.email ?? ''} editable={false} handleChangeText={() => {}} otherStyles='mt-0' />
          {user?.isParent ? (
            <>
              <Text className='font-regular text-lg text-muted-foreground mb-2'>Your Children profile</Text>
              {user?.child.map((child, i) => {
                return (
                  <TouchableOpacity
                    key={`child-${i}`}
                    activeOpacity={0.8}
                    onPress={() => changeProfile(child.id)}
                    className={cn(
                      `w-full flex-row justify-between border-2 border-border px-4 py-4 rounded-2xl mt-2`,
                      child.id === user.currentProfileID && 'bg-border/40'
                    )}>
                    <View className='justify-center'>
                      <Text className='text-lg font-semibold text-foreground'>{child.name}</Text>
                      <View className='flex-row gap-2'>
                        <Text className='text-base font-light text-foreground'>{child.birthday}</Text>
                        <Text className='text-base font-light text-foreground'>({child.gender})</Text>
                      </View>
                    </View>
                    <Avatar
                      uri={user.savedAvatars?.find(avatar => avatar.childID === child.id)?.avatarLocalUrl}
                      containerStyles='w-17 h-17'
                      imageStyles='w-16 h-16'
                    />
                  </TouchableOpacity>
                )
              })}
            </>
          ) : (
            <View className='flex-row w-full flex-wrap gap-4 justify-center'>
              <FormField
                title='Birthday'
                value={user?.child[0].birthday ?? ''}
                editable={false}
                handleChangeText={() => {}}
                otherStyles='mt-0 flex-1'
              />
              <FormField title='Gender' value={user?.child[0].gender ?? ''} editable={false} handleChangeText={() => {}} otherStyles='mt-0 flex-1' />
            </View>
          )}
          <View className='mt-6 w-full border-t-[1px] border-border pt-4'>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
