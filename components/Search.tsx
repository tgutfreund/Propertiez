import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';


const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }
  return (
    <View className="flex flex-row items-center justify-between px-4 
    w-full rounded-lg bg-accent-100 border=primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput 
            value = {search}
            onChangeText = {handleSearch}
            placeholder='Search for anything'
            className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>

    </View>
  )
}

export default Search