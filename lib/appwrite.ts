// This file configures Appwrite client and authentication for the app.
// It exports functions for login, logout, and fetching the current user.
// The Appwrite client is set up with environment variables for endpoint and project ID.
// Google OAuth is used for authentication.

import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from 'react-native-appwrite';

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

export async function getLatestProperties() {
    try{
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({ filter, query, limit }: {
    filter: string,
    query: string,
    limit?: number
}) {
    try{
        const buildQuery = [Query.orderDesc('$createdAt')];
        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('type', filter));
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    Query.search('address', query),
                    Query.search('type', query)
                ])
            )
        }

        if (limit) {
            buildQuery.push(Query.limit(limit));
        }

        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            buildQuery
        )
        return result.documents;


    } catch (error) {
        console.error(error);
        return [];
    }

}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
