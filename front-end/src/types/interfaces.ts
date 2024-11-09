export interface Menu {
    id: string;
    imageUrl: string;
    categories: Category[];
    style: MenuStyle;
}

export interface ColorStyleScheme {
    background: string;
    text: string;
    baseIcons:string;
}

export interface MenuStyle {
    colorScheme: ColorStyleScheme;
}

export interface Category {
    id: string;
    description: string;
    topImageUrl: string;
    auxiliarImages: string[];
    dishes: Dish[];
}

export interface Dish {
    id: string;
    title: string;
    description: string;
    price: string;
}

