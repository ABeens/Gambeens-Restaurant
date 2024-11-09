import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import "@styles/globals.css"
import "@styles/dynamic.css"
import { colorSchemes, type ColorSchemes } from '@/types/types'
import type { MenuStyle } from '@/types/interfaces'

interface Dish {
  name: string
  price: number
  description: string
}

interface Category {
  name: string
  dishes: Dish[]
  image: string | null
}

export function MenuBuilder() {
  const [style, setStyle] = useState<MenuStyle>({
    colorScheme: {
      background: colorSchemes['default'].background,
      text: colorSchemes['default'].text,
      baseIcons: colorSchemes['default'].baseIcons,
    }
  })
  const [title, setTitle] = useState<string>('')
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState<string>('')
  const [newCategoryImage, setNewCategoryImage] = useState<string | null>(null)
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([])

  const changeColors = (colorTitle: ColorSchemes) => {
    setStyle({
      ...style,
      colorScheme: colorSchemes[colorTitle]
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number | null = null) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (index === null) {
          if (event.target.id === 'banner-upload') {
            setBannerImage(reader.result as string)
          } else {
            setNewCategoryImage(reader.result as string)
          }
        } else {
          const updatedCategories = [...categories]
          updatedCategories[index].image = reader.result as string
          setCategories(updatedCategories)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addCategory = () => {
    if (newCategory) {
      const newCategoryItem: Category = { name: newCategory, dishes: [], image: newCategoryImage }
      setCategories([...categories, newCategoryItem])
      setNewCategory('')
      setNewCategoryImage(null)
      setOpenAccordionItems([...openAccordionItems, `item-${categories.length}`])
    }
  }

  const addDish = (categoryIndex: number, dish: Dish) => {
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].dishes.push(dish)
    setCategories(updatedCategories)
  }

  return (
    <div className={`flex flex-col items-center space-y-4 p-4`}>
      <h2 className="text-2xl font-bold mb-2"></h2>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Selector de Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value: ColorSchemes) => changeColors(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un esquema de color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Original</SelectItem>
              <SelectItem value="noon">Café de la Tarde</SelectItem>
              <SelectItem value="dark">Oscuro </SelectItem>
              <SelectItem value="elegant">Elegante</SelectItem>
              <SelectItem value="olive">Oliva</SelectItem>
              <SelectItem value="modern">Moderno</SelectItem>
              <SelectItem value="rustic">Rústico</SelectItem>
            </SelectContent>
          </Select>

          <div className={`mt-4 p-4 rounded-md ${style!.colorScheme!.background} ${style!.colorScheme!.text}`}>
            <p>Vista previa del tema seleccionado</p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Información del restaurante</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Título del menú"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div>
              <label htmlFor="banner-upload" className="block mb-2">Banner del menú</label>
              <Input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>

            {bannerImage && (
              <img src={bannerImage} alt="Banner" className="w-full h-40 object-cover rounded-md" />
            )}

            <div>
              <h3 className="text-xl font-bold mb-2">Categorías</h3>
            </div>

            <Accordion type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
              {categories.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {category.image && (
                        <img src={category.image} alt={`${category.name} category`} className="w-full h-32 object-cover rounded-md" />
                      )}
                      <CategoryDishForm onAddDish={(dish) => addDish(index, dish)} />
                      {category.dishes.map((dish, dishIndex) => (
                        <div key={dishIndex} className="p-2 bg-secondary rounded-md">
                          <p className="font-medium">{dish.name} - ${dish.price}</p>
                          <p className="text-sm">{dish.description}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div>
              <div className="flex flex-col space-y-2 mb-2">
                <Input
                  type="text"
                  placeholder="Nueva categoría"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <div>
                  <label htmlFor="category-image" className="block mb-2">Imagen de la categoría</label>
                  <Input
                    id="category-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </div>
                <Button onClick={addCategory}>Agregar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mt-8">
        <CardHeader>
          <CardTitle>Vista Previa del Menú</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {bannerImage && (
            <img src={bannerImage} alt="Banner" className="w-full h-40 object-cover rounded-md mb-4" />
          )}
          {categories.map((category, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold mb-2">{category.name}</h4>
              {category.image && (
                <img src={category.image} alt={`${category.name} category`} className="w-full h-32 object-cover rounded-md mb-2" />
              )}
              {category.dishes.map((dish, dishIndex) => (
                <div key={dishIndex} className="mb-2">
                  <p className="font-medium">{dish.name} - ${dish.price}</p>
                  <p className="text-sm">{dish.description}</p>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function CategoryDishForm({ onAddDish }: { onAddDish: (dish: Dish) => void }) {
  const [newDish, setNewDish] = useState<Dish>({ name: '', price: 0, description: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDish.name && newDish.price > 0) {
      onAddDish(newDish)
      setNewDish({ name: '', price: 0, description: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="text"
        placeholder="Nombre del plato"
        value={newDish.name}
        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="Precio"
        value={newDish.price}
        onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
        required
        min="0"
        step="0.01"
      />
      <Input
        type="text"
        placeholder="Descripción"
        value={newDish.description}
        onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
      />
      <Button type="submit">Agregar Plato</Button>
    </form>
  )
}