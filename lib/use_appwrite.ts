import { useEffect, useState } from "react";
import { fetchAllPosts, PostModel } from "./appwrite";

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

interface ReturnModel {
  fetchLoading: boolean;
  data: PostModel[];
  reFreshData: () => Promise<void>;
}
