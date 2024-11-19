export interface Menu {
    id: string;
    name:string;
    lang:string;
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
    name:string;
    description?: string;
    auxiliarImages: string[];
    dishes: Dish[];
}

export interface Dish {
    id: string;
    title: string;
    description: string;
    price: string;
}

export const getDefaultCategory=()=>{
    return {
        id:'',
        description:'',
        name:'',
        topImageUrl:'',
        auxiliarImages:[],
        dishes:[]
    }
}