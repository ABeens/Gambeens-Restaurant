import type { Category, Menu, MenuStyle } from "@/types/interfaces";
import { colorSchemes, type ColorSchemes } from "@/types/types";

// Generar el menú con categorías y platos
export const getMenuById = (): Menu => {
    const basePath = import.meta.env.BASE_URL;
    const theme: ColorSchemes = 'elegant';
    const css: MenuStyle = {
        colorScheme: {
            background: colorSchemes[theme].background,
            text: colorSchemes[theme].text,
            baseIcons:colorSchemes[theme].baseIcons
        }
    }

    const auxiliarImages = [`${basePath}/1-category.jpg`, `${basePath}/1-category.jpg`];

    const categories: Category[] = [
        {
            id: 'cat-1',
            description: 'Desayuno Todo el Día',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish1', title: 'DESAYUNO THE OPEN KITCHEN', description: 'Dos huevos, ensalada, tahini rosa, guacamole, crema de pimientos, queso crema, ensalada de huevo acompañado con una canasta de pan: Challa / Pan Pita regular / Pan Pullman', price: '₡6.750' },
                { id: 'dish2', title: 'Gallo Pinto', description: 'Desayuno costarricense: mix de arroz y frijoles fritos, dos huevos al gusto, plátano maduro, tortilla de maiz y natilla.', price: '₡4.900' },
                { id: 'dish3', title: 'TOSTADA FRANCESA', description: 'Pan Challa frito cubierto con azúcar en polvo, servido con frutas frescas rebanadas y jarabe de arce.', price: '₡5.700' },
                { id: 'dish4', title: 'PITA POPEYE OMELET', description: 'Pan pita relleno con tahini, torta de huevo con espinacas, cebolla, perejil y eneldo. Acompañado de ensalada verde, aceitunas kalamata y pimiento verde asado.', price: '₡5.800' },
                { id: 'dish5', title: 'DIOSA VERDE BOWL', description: 'Piña, plátano, goji berries, leche de almendras y espirulina. Cubierto con granola, chips de coco, semillas de chía y frutas frescas de temporada.', price: '₡5.700' },
                { id: 'dish6', title: 'MUESLI', description: 'Granola casera servida con yogur natural, frutas frescas de temporada, goji berries y miel natural de la zona.', price: '₡4.850' },
                // Agregar los demás platos de la categoría "Desayuno"
            ]
        },
        {
            id: 'cat-2',
            description: 'Aperitivos',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish7', title: 'ENSALADA DE ATÚN', description: 'Hojas de rúcula y perejil mezclado con cubitos de pan challa frito, papas y cebollas, sazonado con aderezo de harissa y mayonesa, cubierto con filete de atún rojo sellado, huevo escalfado y queso parmesano.', price: '₡6.950' },
                { id: 'dish8', title: 'ENSALADA SABIH', description: 'Una cama de tahini y berenjena frita, huevo duro, topping de pepinillos, tomate, perejil, cilantro, pepinos, salsa harissa y tahini. Acompañado de pan pita y una salsa de Ámba, una salsa tradicional de mango.', price: '₡6.950' },
                // Agregar los demás platos de la categoría "Aperitivos"
            ]
        },
        {
            id: 'cat-3',
            description: 'Street Food',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish9', title: 'FISH AND CHIPS', description: 'Tilapia frita cubierta con harina y hojuelas de maíz. Servido con papas fritas, aros de cebolla, rodaja de limón y salsa tártara.', price: '₡8.100' },
                { id: 'dish10', title: 'SHAWARMA DE POLLO', description: 'Acompañado de ensalada de cebolla con sumak, tomate fresco, papas fritas, hummus, tahini, chile jalapeño y pan pita.', price: '₡8.350' },
                // Agregar los demás platos de la categoría "Street Food"
            ]
        },
        {
            id: 'cat-4',
            description: 'Favoritos de Siempre',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish11', title: 'BUREKA TURKI', description: 'Pastel de masa hojaldreada, relleno de queso orgánico de cabra, queso mozzarella y espinaca. Acompañadas de salsa de tomate fresco, salsa shug verde a base de culantro y jalapeños, pepinillos, aceitunas Kalamata, huevo duro (tiempo de prep. aprox. 20 min).', price: '₡8.320' },
                { id: 'dish12', title: 'FAJITAS DE POLLO', description: 'Tiras de pechuga de pollo fritas: empanizadas con mostaza, migas de pan y semillas de sésamo. Servido con ensalada mixta y papas fritas caseras.', price: '₡8.220' },
                // Agregar los demás platos de la categoría "Favoritos de Siempre"
            ]
        },
        {
            id: 'cat-5',
            description: 'Extras',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish13', title: 'Aguacate', description: '', price: '₡1.200' },
                { id: 'dish14', title: 'Huevo', description: 'Un huevo frito o revuelto.', price: '₡800' },
                { id: 'dish15', title: 'Queso local', description: 'Fresco de Monteverde.', price: '₡800' },
                // Agregar los demás extras
            ]
        },
        {
            id: 'cat-6',
            description: 'Empieza por acá',
            topImageUrl: `${basePath}/1-category.jpg`,
            auxiliarImages,
            dishes: [
                { id: 'dish16', title: 'HUMMUS', description: 'De Oriente Medio a base de garbanzos servido con pan pita tradicional.', price: '₡5.950' },
                { id: 'dish17', title: 'BABA GHANOUSH', description: 'Berenjena asada finamente picada, aceite de oliva, zumo de limón, ajo y tahini. Servido con pan de pita casero.', price: '₡4.950' },
                // Agregar los demás platos de la categoría "Empieza por acá"
            ]
        }
    ];

    return {
        id: 'menu-1',
        style: css,
        imageUrl: `${basePath}/1-category.jpg`,
        categories
    };
};
