import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteconfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  project: "66d8671a0026e861a3f8",
  platform: "com.aora",
  databaseId: "66d868f7000ad8d9f182",
  userCollectionId: "66d86929001e87417887",
  videosCollectionId: "66d86960001e37d69274",
  postsCollectionId: "66dbc4ae00070dfe37c3",
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
    logoutUser();
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error();

    console.log("User created:", newAccount.$id);
    const avaterUrl = avatars.getInitials(name);

    await signInUser({
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
        accountid: newAccount.$id,
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
    logoutUser();
    const section = await account.createEmailPasswordSession(email, password);
    console.log("User signed in successfully");
    const user = await getCurrentUser();
  } catch (error) {
    console.log(error, "ERROR IN SIGN IN USER:");
    throw error;
  }
};

//GET CURRENT USER
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();
    const currentUser = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) throw new Error();

    const user: UserModel = {
      accountid: currentUser.documents[0].$id,
      email: currentUser.documents[0].email,
      username: currentUser.documents[0].username,
      avatar: currentUser.documents[0].avatar,
    };

    return user;
  } catch (error) {
    console.error("ERROR IN GET CURRENT USER:", error);
    throw error;
  }
};

//FETCH ALL POSTS
export const fetchAllPosts = async (): Promise<PostModel[]> => {
  try {
    const postsdocments = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId
    );
    if (!postsdocments) return [];

    const posts: PostModel[] = postsdocments.documents.map((post) => {
      return {
        id: post.$id,
        title: post.title,
        content: post.promot,
        video: post.video,
        thumbnail: post.thumbline,
        user: post.users,
      };
    });

    return posts;
  } catch (error) {
    console.error("ERROR IN FETCH ALL POSTS:", error);
    return [];
  }
};

//FETCH LATEST POSTS
export const fetchLaTESTPosts = async (): Promise<PostModel[]> => {
  try {
    const postsdocments = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(4)]
    );
    if (!postsdocments) return [];

    const posts: PostModel[] = postsdocments.documents.map((post) => {
      return {
        id: post.$id,
        title: post.title,
        content: post.promot,
        video: post.video,
        thumbnail: post.thumbline,
        user: post.users,
      };
    });

    return posts;
  } catch (error) {
    console.error("ERROR IN FETCH ALL POSTS:", error);
    return [];
  }
};

//FETCH SEARCH POSTS
export const fetchSearchPosts = async (query: string): Promise<PostModel[]> => {
  try {
    const postsdocments = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.search("title", query)]
    );
    if (!postsdocments) return [];

    const posts: PostModel[] = postsdocments.documents.map((post) => {
      return {
        id: post.$id,
        title: post.title,
        content: post.promot,
        video: post.video,
        thumbnail: post.thumbline,
        user: post.users,
      };
    });

    return posts;
  } catch (error) {
    console.error("ERROR IN FETCH ALL POSTS:", error);
    return [];
  }
};

//FETCH USER POSTS
export const fetchUserPosts = async (userId: string): Promise<PostModel[]> => {
  try {
    const postsdocments = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.equal("users", userId)]
    );
    if (!postsdocments) return [];

    const posts: PostModel[] = postsdocments.documents.map((post) => {
      return {
        id: post.$id,
        title: post.title,
        content: post.promot,
        video: post.video,
        thumbnail: post.thumbline,
        user: post.users,
      };
    });

    return posts;
  } catch (error) {
    console.error("ERROR IN FETCH ALL POSTS:", error);
    return [];
  }
};

//LOGOUT USER

export const logoutUser = async () => {
  try {
    const section = await account.deleteSession("current");

    return section;
  } catch (error) {
    console.error("ERROR IN LOGOUT USER:", error);
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

export interface UserModel {
  email: string;
  username: string;
  avatar: string;
  accountid: string;
}

export interface PostModel {
  id?: string;
  title?: string;
  content?: string;
  thumbnail: string;
  user: UserModel;
}
