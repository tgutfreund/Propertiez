// This file defines the Home screen, which serves as the main entry point for the app.
// It displays featured properties, recommended properties, and allows users to search and filter properties.

// Key Components:
// - Search: A search bar for querying properties.
// - Filters: A component for filtering property results.
// - Card: A reusable component for displaying individual property details.
// - FeaturedCard: A specialized card for displaying featured properties.
// - NoResults: A fallback component displayed when no properties match the search.

// Key Functions:
// - handleCardPress: Navigates to the property details page when a card is pressed.
// - useEffect: Refetches property data whenever the search parameters change.

import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{query?: string; filter: string;}>();

  const {data: latestPropertiesRaw, loading: latestPropertiesLoading} = useAppwrite({
    fn: getLatestProperties
  });

  // Ensure latestProperties are of type PropertyDocument
  const latestProperties = latestPropertiesRaw?.map((item: any) => ({
    ...item,
    image: item.image ?? "",
    rating: item.rating ?? 0,
    name: item.name ?? "",
    address: item.address ?? "",
    price: item.price ?? 0,
  })) ?? [];

  const {data: propertiesRaw, loading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true
  });

  // Ensure properties are of type PropertyDocument
  const properties = propertiesRaw?.map((item: any) => ({
    ...item,
    image: item.image ?? "",
    rating: item.rating ?? 0,
    name: item.name ?? "",
    address: item.address ?? "",
    price: item.price ?? 0,
  })) ?? [];

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6
    })
  }, [params.filter, params.query])


  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? 
                <ActivityIndicator size={"large"} className="text-primary-300" />
              : !latestProperties || latestProperties.length === 0 ? <NoResults /> : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="flex gap-5 mt-5"
                /> 
              )}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
