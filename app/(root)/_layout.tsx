// This file defines the root layout for the app's protected routes.
// It checks authentication and loading state using the global context.
// If the user is not logged in, it redirects to the sign-in screen.
// If loading, it shows a loading spinner.
// Otherwise, it renders the nested route content via <Slot />.

import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout() {
    const { isLoggedIn, loading } = useGlobalContext();


    if (loading) {
        return (
            <SafeAreaView className = "bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large"/>
            </SafeAreaView>
        )
    }

    if (!isLoggedIn) {
        return <Redirect href="/sign-in" />
    }

    return <Slot />;
}