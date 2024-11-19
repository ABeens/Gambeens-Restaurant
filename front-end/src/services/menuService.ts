import type { Category, Menu, MenuStyle } from "@/types/interfaces";
import { colorSchemes, type ColorSchemes } from "@/types/types";

export const menuList: Menu[] = [
    {
        id: 'menu-1',
        name:'Menu 1',
        lang:'es',
        style: {
            colorScheme: {
                background: colorSchemes['elegant'].background,
                text: colorSchemes['elegant'].text,
                baseIcons: colorSchemes['elegant'].baseIcons,
            }
        },
        imageUrl: `${import.meta.env.BASE_URL}/1-category.jpg`,
        categories: [
            {
                id: 'cat-1',
                name: 'Desayuno Todo el Día',
                auxiliarImages: [`${import.meta.env.BASE_URL}1-category.jpg`, `${import.meta.env.BASE_URL}1-alt.jpg`],
                dishes: [
                    { id: 'dish1', title: 'DESAYUNO THE OPEN KITCHEN', description: 'Dos huevos, ensalada, tahini rosa, guacamole...', price: '₡6.750' },
                    { id: 'dish2', title: 'Gallo Pinto', description: 'Desayuno costarricense...', price: '₡4.900' },
                    // Más platos aquí...
                ]
            },
            {
                id: 'cat-2',
                name: 'Aperitivos',
                auxiliarImages: [`${import.meta.env.BASE_URL}1-category.jpg`, `${import.meta.env.BASE_URL}1-alt.jpg`],
                dishes: [
                    { id: 'dish7', title: 'ENSALADA DE ATÚN', description: 'Hojas de rúcula y perejil...', price: '₡6.950' },
                    { id: 'dish8', title: 'ENSALADA SABIH', description: 'Una cama de tahini y berenjena frita...', price: '₡6.950' },
                    // Más platos aquí...
                ]
            }
        ]
    },
    {
        id: 'menu-2',
        name:'Menu 2',
        lang:'es',
        style: {
            colorScheme: {
                background: colorSchemes['elegant'].background,
                text: colorSchemes['elegant'].text,
                baseIcons: colorSchemes['elegant'].baseIcons,
            }
        },
        imageUrl: `${import.meta.env.BASE_URL}/2-category.jpg`,
        categories: [
            {
                id: 'cat-3',
                name: 'Street Food',
                auxiliarImages: [`${import.meta.env.BASE_URL}2-category.jpg`, `${import.meta.env.BASE_URL}2-alt.jpg`],
                dishes: [
                    { id: 'dish9', title: 'FISH AND CHIPS', description: 'Tilapia frita cubierta...', price: '₡8.100' },
                    { id: 'dish10', title: 'SHAWARMA DE POLLO', description: 'Acompañado de ensalada de cebolla...', price: '₡8.350' },
                    // Más platos aquí...
                ]
            },
            {
                id: 'cat-4',
                name: 'Favoritos de Siempre',
                auxiliarImages: [`${import.meta.env.BASE_URL}2-category.jpg`, `${import.meta.env.BASE_URL}2-alt.jpg`],
                dishes: [
                    { id: 'dish11', title: 'BUREKA TURKI', description: 'Pastel de masa hojaldreada...', price: '₡8.320' },
                    { id: 'dish12', title: 'FAJITAS DE POLLO', description: 'Tiras de pechuga de pollo fritas...', price: '₡8.220' },
                    // Más platos aquí...
                ]
            }
            
        ]
    }
    // Agrega más menús aquí si es necesario
];

export const getMenuList=()=>{
    return menuList;
}

// Generar el menú con categorías y platos
export const getMenuById = (id:string): Menu => {
    return menuList.find(x=>x.id==id) ?? menuList[0];
};
