import axios from "axios";
import { ArticlesList, Comment } from "../ArticlesStore";

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
}; //получаем данные по конкретной новости по id

export const getComments = async (storyId: number): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(
    `${storyURL + storyId}/comments.json`);
  return response.data;
}; // получаем комментарии для указанной новости (по идентификатору новости)
