import { useEffect, useState } from "react";
import {
  fetchAllPosts,
  PostModel,
  fetchLaTESTPosts,
  fetchSearchPosts,
} from "./appwrite";

//GET ALL POSTS
export const getAllPosts = (): ReturnModel => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [data, setData] = useState<PostModel[]>([]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const posts = await fetchAllPosts();
      setData(posts);
    } catch (err) {
      console.error(err);
    }
    setFetchLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reFreshData = async (): Promise<void> => {
    fetchData();
  };

  return { fetchLoading, data, reFreshData };
};

//FETCH LATEST POSTS
export const getLatestPosts = (): ReturnModel => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [data, setData] = useState<PostModel[]>([]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const posts = await fetchLaTESTPosts();
      setData(posts);
    } catch (err) {
      console.error(err);
    }
    setFetchLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reFreshData = async (): Promise<void> => {
    fetchData();
  };

  return { fetchLoading, data, reFreshData };
};

//FETCH SEARCH POSTS
export const getSearchPosts = (query: string): ReturnModel => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [data, setData] = useState<PostModel[]>([]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const posts = await fetchSearchPosts(query);
      setData(posts);
    } catch (err) {
      console.error(err);
    }
    setFetchLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reFreshData = async (): Promise<void> => {
    fetchData();
  };

  return { fetchLoading, data, reFreshData };
};

interface ReturnModel {
  fetchLoading: boolean;
  data: PostModel[];
  reFreshData: () => Promise<void>;
}
