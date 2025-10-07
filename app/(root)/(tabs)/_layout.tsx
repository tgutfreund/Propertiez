// This file defines the layout for the bottom tab navigation in the app.
// It uses the `expo-router` Tabs component to manage navigation between screens.
// Each tab is represented with an icon and a title, styled dynamically based on focus state.

// TabIcon: A reusable component for rendering tab icons and titles.
// Props:
// - focused: Boolean indicating if the tab is active.
// - icon: The icon to display for the tab.
// - title: The title to display below the icon.

// TabsLayout: The main layout component for the bottom tab navigation.
// It defines three tabs: Home, Explore, and Profile, each with its own icon and screen.

import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TabIcon = ({focused, icon, title}: {focused: boolean, icon: any, title: string}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image source={icon} tintColor={focused ? '#0061ff' : '#666876'}
        resizeMode='contain' className="size-6" />

        <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 
            'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
            {title}
        </Text>

    </View>
)

const TabsLayout = () => {
  return (
    <Tabs 
        screenOptions= {{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                minHeight: 70,
            }
        }}
    >
      <Tabs.Screen 
        name="index"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.home} focused={focused} title="Home" />
            )
        }}
      />

      <Tabs.Screen 
        name="explore"
        options={{
            title: 'Explore',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.search} focused={focused} title="Explore" />
            )
        }}
      />

      <Tabs.Screen 
        name="profile"
        options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.person} focused={focused} title="Profile" />
            )
        }}
      />

    </Tabs>
  )
}

export default TabsLayout