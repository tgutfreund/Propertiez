import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider } from 'react-native-appwrite';

export const config = {
    platform: 'com.tgdev.propertiez',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client()

client
    .setEndpoint(config.endpoint!) // Your API Endpoint
    .setProject(config.projectId!) // Your project ID
    .setPlatform(config.platform!) // Your platform

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(OAuthProvider.Google,
             redirectUri);

        if(!response) throw new Error('Failed to login');

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );

        if (browserResult.type !== 'success') throw new Error(
            'Authentication was not successful');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userID = url.searchParams.get('userId')?.toString();

        if (!secret || !userID) throw new Error('Failed to login');

        const session = await account.createSession(userID, secret);

        if(!session) throw new Error('Failed to create session');

        return true;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser(params: Record<string, string | number> = {}) {
    try {
        const response = await account.get();
        if (response.$id){
            const userAvatar = avatar.getInitials(response.name);
            return { ...response, avatar: userAvatar.toString() };
        }
        return null; // Add this line for when user doesn't exist
    } catch (error) {
        console.error(error);
        return null;
    }
}

