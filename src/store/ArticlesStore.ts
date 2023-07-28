import { makeObservable, action, observable } from "mobx";
import { getStoriesId, getStory } from "../Api/Api";

// Интерфейс для объектов новостей
export interface ArticlesList {
  id: number;
  title?: string;
  score?: number;
  url?: string;
  by?: string;
  time?: number;
  text?: string;
  descendants?: number;
  kids?: number[];
}

// Интерфейс для объектов комментариев
export interface Comment {
  id: number;
  by?: string;
  text?: string;
  time?: number;
  kids?: number[];
}
class ArticlesStore {
  articlesList: ArticlesList[] = [];
  comments: Record<number, Comment> = {};
  loading = true;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      fetchArticles: action,
      refreshArticles: action,
      refreshArticle: action
    });
    this.fetchArticles(); //загружаем новости при создании стора
  }

  fetchArticles = async () => {
    try {
      this.loading = true;
      this.error = null;
      const storyAllId = await getStoriesId();
      const articlesList = await Promise.all(
        storyAllId.map((storyId) => this.fetchStory(storyId)), //загружаем инфу по каждой новости
      );
      this.articlesList = articlesList.filter(
        (story) => !!story,
      ) as ArticlesList[]; // Устанавливаем список новостей, фильтруя пустые значения
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      this.loading = false; // Устанавливаем флаг в false после окончания загрузки, независимо от результата
    }
  }; //aсинхронно подгружаем список новостей

  fetchStory = async (storyId: number): Promise<ArticlesList | undefined> => {
    try {
      const storyItem = await getStory(storyId); // Получаем информацию о статье

      if (storyItem && storyItem.time) {
        // Обновляем комментарии только при просмотре статьи, а не при загрузке всех статей
        if (this.articlesList.find((item) => item.id === storyId)) {
          const comments = await Promise.all(
            (storyItem.kids ?? []).map((commentId) =>
              this.fetchStory(commentId),
            ),
          );

          // Сохраняем полученные комментарии в объекте comments
          comments.forEach((comment, index) => {
            if (comment) {
              const kidId: number = storyItem.kids?.[index] ?? 0;
              this.comments[kidId] = comment;
            }
          });
        }

        return {
          id: storyItem.id,
          title: storyItem.title,
          score: storyItem.score,
          url: storyItem.url,
          by: storyItem.by,
          time: storyItem.time,
          descendants: storyItem.descendants,
          text: storyItem.text,
          kids: storyItem.kids,
        };
      }
    } catch (error) {
      console.error(`Ошибка при получении статьи ${storyId}:`, error);
    }
  };

  // Метод для обновления комментариев статьи по её id
  fetchArticleComments = async (articleId: number) => {
    try {
      const article = this.articlesList.find((item) => item.id === articleId);
      if (!article) return;

      const updatedArticle = await this.fetchStory(articleId);
      if (updatedArticle) {
        article.kids = updatedArticle.kids;
      }
    } catch (error) {
      console.error(
        `Ошибка при обновлении комментариев для статьи ${articleId}:`,
        error,
      );
    }
  };
  // Метод для обновления отдельной статьи по её id
  refreshArticle = async (articleId: number) => {
    try {
      this.loading = true;
      const article = this.articlesList.find((item) => item.id === articleId);
      if (!article) return;

      const updatedArticle = await this.fetchStory(articleId);
      if (updatedArticle) {
        // Обновляем только одну статью
        Object.assign(article, updatedArticle);
      }
    } catch (error) {
      console.error(`Ошибка при обновлении статьи ${articleId}:`, error);
    }
  };

  // Метод для принудительного обновления списка новостей
  refreshArticles = () => {
    this.loading = true;
    this.fetchArticles();
  };
}

export default new ArticlesStore();
