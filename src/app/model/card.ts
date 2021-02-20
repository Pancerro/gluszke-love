import { Category } from './category';

export interface Card {
    id: string;
    url: string;
    title: string;
    description: string;
    longDescription: string;
    category: Category;
    favorite: boolean;
}
