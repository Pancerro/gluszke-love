import {Comment} from './comment';
import {Category} from './category';

export interface RatingCard {
  id: string;
  title: string;
  ratingAdrian: number;
  ratingMarta: number;
  type: string;
  category: Category;
  comment: Comment[];
  imageUrl: string[];
}
