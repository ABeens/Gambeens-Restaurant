import { generateGUID } from "@/lib/utils";
import { colorSchemes } from "./types";

export interface Menu {
    id: string;
    name: string;
    lang: string;
    imageUrl: string;
    categories: Category[];
    style: MenuStyle;
}

export interface ColorStyleScheme {
    background: string;
    text: string;
    baseIcons: string;
}

export interface MenuStyle {
    key: string;
    colorScheme: ColorStyleScheme;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    auxiliarImages: string[];
    dishes: Dish[];
}

export interface Dish {
    id: string;
    name: string;
    description: string;
    price: string;
}

export const getDefaultCategory = () => {
    return {
        id: generateGUID(),
        description: '',
        name: '',
        topImageUrl: '',
        auxiliarImages: [],
        dishes: []
    }
}

export const getDefaultMenu = ():Menu => {
    return {
        id: generateGUID(),
        name: '',
        lang: 'es',
        imageUrl: '',
        categories: [],
        style: {
            key: 'default',
            colorScheme:{...colorSchemes.default}
        }
    }
}

export const getDefaultDish = () => {
    return {
        id: generateGUID(),
        name: '',
        description: '',
        price: 0
    }
}