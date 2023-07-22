import { makeAutoObservable } from "mobx";
import { getStoriesId, getStory, getComments } from "./Api/Api";

// Интерфейс для объектов новостей
export interface ArticlesList {
  id: number;
  title?: string;
  score?: number;
  url?: string;
  by?: string;
  time?: number;
  descendants?: number;
  kids?: number[];
}

// Интерфейс для объектов комментариев
export interface Comment {
  id: number;
  newsId: number;
  text: string;
  author: string;
  date: Date;
}
class ArticlesStore {
  articlesList: ArticlesList[] = [];
  commentsMap: Map<number, Comment[]> = new Map<number, Comment[]>(); // хранилище комментариев по каждой новости

  constructor() {
    makeAutoObservable(this);
    this.fetchArticles(); //загружаем новости при создании стора
  }

  fetchArticles = async () => {
    try {
      const storyAllId = await getStoriesId();
      const articlesList = await Promise.all(
        storyAllId.map((storyId) => this.fetchStory(storyId)), //загружаем инфу по каждой новости
      );
      this.articlesList = articlesList.filter((story) => !!story) as ArticlesList[]; // Устанавливаем список новостей, фильтруя пустые значения
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }; //aсинхронно подгружаем список новостей

  fetchStory = async (storyId: number): Promise<ArticlesList | undefined> => {
    try {
      const storyItem = await getStory(storyId); //получаем инфу по статье
      if (storyItem && storyItem.time) {
        return {
          id: storyItem.id,
          title: storyItem.title,
          score: storyItem.score,
          url: storyItem.url,
          by: storyItem.by,
          time: storyItem.time,
          descendants: storyItem.descendants,
          kids: storyItem.kids,
        };
      }
    } catch (error) {
      console.error(`Error fetching story ${storyId}:`, error);
    }
  };

  fetchComments = async (storyId: number): Promise<void> => {
    try {
      const comments = await getComments(storyId); //получаем комментарии для указанной статьи
      this.commentsMap.set(storyId, comments); //добавляем комментарии в map по ключу(Id)
    } catch (error) {
      console.error(`Error fetching comments for newsId ${storyId}:`, error);
    }
  };

  // Метод для принудительного обновления списка новостей
  refreshArticles = () => {
    this.fetchArticles();
  };

  // Метод для принудительного обновления комментариев для указанной новости
  refreshComments = (newsId: number) => {
    this.fetchComments(newsId);
  };
}

export default new ArticlesStore();
