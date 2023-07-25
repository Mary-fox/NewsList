import axios from "axios";
import { ArticlesList } from "../ArticlesStore";

const baseURL = "https://hacker-news.firebaseio.com/v0/";
const allStoriesURL = `${baseURL}newstories.json`; //url для всего списка новостей
const storyURL = `${baseURL}item/`; // url для 1 новости

export const getStoriesId = async (): Promise<number[]> => {
  const response = await axios.get<number[]>(allStoriesURL);
  return response.data.slice(0, 100);
};

export const getStory = async (storyId: number): Promise<ArticlesList> => {
  const response = await axios.get<ArticlesList>(`${storyURL + storyId}.json`);
  return response.data;
}; 
