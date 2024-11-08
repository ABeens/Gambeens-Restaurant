import { useState } from "react";
import './header.css';
import type { MenuStyle } from "@/services/menuService";

interface Props {
    categories: string[],
    menuStyle:MenuStyle
}

export const DynamicMenuHeader = (props: Props) => {
    const [checked, setChecked] = useState(false);

    const toggleMenu = () => {
        setChecked(!checked);
    }

    const handleCategoryClick = (category: string) => {
        toggleMenu();
        const targetElement = document.getElementById(category);
        if (targetElement) {
            const offset = 80; // Ajusta este valor según el tamaño del encabezado
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
        }
    }

    return (
        <div>
            <header className={`navbar-header ${props!.menuStyle!.colorScheme!.background}`}>
                <h1>Template</h1>
            </header>

            <input 
            onChange={()=>{setChecked(!checked);}}
                onClick={()=>{setChecked(!checked);}}
                checked={checked} 
                type="checkbox" 
                id="menu-toggle" 
                className="menu-toggle" 
            />
            <label htmlFor="menu-toggle" className="menu-btn">
                <div className="menu-btn__burger"></div>
            </label>
            <nav className={`menu ${props!.menuStyle!.colorScheme!.background}`}>
                <ul>
                    {props.categories.map((category) => {
                        return (
                            <li key={category}>
                                <a 
                                    href={`#${category}`} 
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    )
}
