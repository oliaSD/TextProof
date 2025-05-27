// api/statsApi.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084/api'; // Замените на ваш URL

export const fetchUserStats = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export type StatsData = {
  totalWords: number;
  avg_borrowing: number;
  typeDistribution: Array<{ paper_type: string; count: number }>;
  avg_originality: number;
  averageCharCount: number;
  avg_citation: number;
  averageWordCount: number;
  completeStats: {
    avg_chars_per_paper: number;
    total_papers: number;
    avg_borrowing: number;
    total_words: number;
    avg_originality: number;
    avg_citation: number;
    avg_words_per_paper: number;
  };
  wordsCount: {total_words : number, paper_name : string}[];
  publicationStats?: Array<{ is_public: boolean; count: number; total_words: number }>;
};