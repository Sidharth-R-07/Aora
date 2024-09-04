import React from "react";
import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

export const appwriteconfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  project: "66d8671a0026e861a3f8",
  platform: "com.aora",
  databaseId: "66d868f7000ad8d9f182",
  userCollectionId: "66d86929001e87417887",
  videosCollectionId: "66d86960001e37d69274",
  storageId: "66d86bf60005322ab4d4",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteconfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteconfig.project)
  .setPlatform(appwriteconfig.platform); // YOUR application ID

const account = new Account(client);

const avatars = new Avatars(client);

const database = new Databases(client);

// CREATE NEW USER ACCOUNT
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserProps): Promise<void> => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    console.log(newAccount);

    if (!newAccount) throw new Error();

    const avaterUrl = avatars.getInitials(name);

    const newUser = await signInUser({
      email: email,
      password: password,
    });

    await database.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.userCollectionId,
      ID.unique(),
      {
        email: email,
        username: name,
        avatar: avaterUrl,
        accountid: "123",
      }
    );
  } catch (error) {
    console.error("ERROR IN CREATE USER:", error);
    throw error;
  }
};

// SIGN IN USER

export const signInUser = async ({
  email,
  password,
}: SignInProps): Promise<void> => {
  try {
    const section = await account.createEmailPasswordSession(email, password);
    console.log("User signed in successfully");
    console.log(section);
  } catch (error) {
    console.log(error, "ERROR IN SIGN IN USER:");
    throw error;
  }
};

interface SignInProps {
  email: string;
  password: string;
}

interface CreateUserProps {
  email: string;
  password: string;
  name: string;
}
