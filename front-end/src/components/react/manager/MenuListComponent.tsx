import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getMenuList } from "@/services/menuService";
import "@styles/globals.css"
import type { FC } from "react";

interface Props{
    basePath:string;
}

const MenuList:FC<Props> = ({ basePath }) => {
    const menuList = getMenuList();
    console.log('props',basePath);
    return (
        <>
            <h1 className="text-4xl mt-5">Mis Menu</h1>
            <hr className="w-full mb-5" />
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-3 mx-auto content-center">
                {menuList.map((menuItem) => {
                    return (
                        <a href={`${basePath}menu-manager/${menuItem.id}`}>
                            <Card className="w-full mx-auto">
                                <CardContent className="flex flex-col space-y-1 p-0">
                                    <div className="w-full h-24 overflow-hidden rounded-t-lg">
                                        <img
                                            src={`${menuItem.imageUrl}`}
                                            className="w-full h-full object-cover"
                                            alt={menuItem.name}
                                        />
                                    </div>
                                    <div className="p-2 w-full text-center">
                                        {menuItem.name}
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    )
                })}
            </div>
        </>

    )
}

export default MenuList;