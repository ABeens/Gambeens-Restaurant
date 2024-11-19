import { useState, type FC } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import "@styles/globals.css"
import "@styles/dynamic.css"
import { colorSchemes, type ColorSchemes } from '@/types/types'
import { getDefaultCategory, type Category, type Dish, type Menu, type MenuStyle } from '@/types/interfaces'
import { useToast } from "@/hooks/use-toast"
import { Trash2, Upload } from 'lucide-react'
import { generateGUID } from '@/lib/utils'

interface Props {
  menu: Menu;
}

const MenuBuilder: FC<Props> = ({ menu }) => {
  const [menuItem, setMenuItem] = useState<Menu>({ ...menu, id: menu.id == 'new' ? generateGUID() : menu.id });
  const [categoryToAdd, setCategoryToAdd] = useState<Category>(getDefaultCategory());
  const [lastCategoryIndex, setlastCategoryIndex] = useState<number>(menu.categories.length);
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([])
  const { toast } = useToast();
  const handleChange = (field: string, value: any) => {
    setMenuItem(prevMenuItem => ({
      ...prevMenuItem,
      [field]: value
    }))
  }

  const changeColors = (key: ColorSchemes) => {
    handleChange('style', {
      key: key,
      colorScheme: colorSchemes[key]
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageIndex: number | null = null) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        if (event.target.id === 'banner-upload') {
          handleChange('imageUrl', imageUrl)
        } else if (lastCategoryIndex !== null && imageIndex !== null) {
          setCategoryToAdd(prevCategory => {
            const updatedAuxiliarImages = [...categoryToAdd?.auxiliarImages ?? []]
            updatedAuxiliarImages[imageIndex] = imageUrl;
            return { ...prevCategory, auxiliarImages: updatedAuxiliarImages }
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addCategory = () => {
    if (categoryToAdd.name) {
      setMenuItem(prevMenuItem => ({
        ...prevMenuItem,
        categories: [...prevMenuItem.categories, categoryToAdd]
      }))
      setCategoryToAdd(getDefaultCategory())
      setOpenAccordionItems(prev => [...prev, `item-${menuItem.categories.length}`])

      // Clear file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]')
      fileInputs.forEach((input: any) => {
        input.value = ''
      })
    } else {
      console.log('llega aca');
      toast({
        duration: 2000,
        title: "Verifique",
        description: "El nombre de la categoria no puede estar vacío",
      })
    }
  }

  const addDish = (categoryIndex: number, dish: Dish) => {
    setMenuItem(prevMenuItem => {
      dish.price = String(Number(dish.price));
      const updatedCategories = [...prevMenuItem.categories]
      updatedCategories[categoryIndex].dishes.push(dish)
      return { ...prevMenuItem, categories: updatedCategories }
    })
  }

  const deleteCategory = (index: number) => {
    setMenuItem(prevMenuItem => ({
      ...prevMenuItem,
      categories: prevMenuItem.categories.filter((_, i) => i !== index)
    }))
    setOpenAccordionItems(prev => prev.filter(item => item !== `item-${index}`))
  }


  const ImageUploadPlaceholder = ({ onClick, imageUrl, alt }: { onClick: () => void, imageUrl?: string, alt: string }) => (
    <div
      onClick={onClick}
      className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="w-full h-full object-contain rounded-lg" />
      ) : (
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
        </div>
      )}
    </div>
  )


  return (
    <>
      <div className={`flex flex-col items-center space-y-4`}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Selector de Tema</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={String(menuItem.style.key)} onValueChange={(value: ColorSchemes) => changeColors(value)}>
              <SelectTrigger className="w-full">
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

            <div className={`mt-4 p-4 rounded-md ${menuItem.style.colorScheme.background} ${menuItem.style.colorScheme.text}`}>
              <p>Vista previa del tema seleccionado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Información del restaurante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Título del menú"
                value={menuItem.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <div>
                <label htmlFor="banner-upload" className="block mb-2">Banner del menú</label>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  className="hidden"
                />
                <ImageUploadPlaceholder
                  onClick={() => document.getElementById('banner-upload')?.click()}
                  imageUrl={menuItem.imageUrl}
                  alt={menuItem.name}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Accordion className='' type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
                {menuItem.categories.map((category, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex justify-between w-full items-center">
                        <h4 className='text-xl'>{category.name}</h4>
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteCategory(index)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              deleteCategory(index)
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`Delete ${category.name} category`}
                          className="p-2 hover:bg-gray-200 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className='grid grid-cols-2 md:grid-cols-8 gap-2 w-full '>
                          {category.auxiliarImages.map((image, imageIndex) => (
                            image && (
                              <img key={imageIndex} src={image} alt={`${category.name} category ${imageIndex + 1}`} className="w-32 h-32 rounded-md" />
                            )
                          ))}
                        </div>
                        <CategoryDishForm onAddDish={(dish) => addDish(index, dish)} />
                        {category?.dishes?.map((dish, dishIndex) => (
                          <div key={dishIndex} className="p-2 bg-secondary rounded-md">
                            <p className="font-medium">{dish.name} - ₡{dish.price}</p>
                            <p className="text-sm">{dish.description}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div>
                <div className="flex flex-col space-y-4 mb-2">
                  <h4 className='text-xl'>Nueva categoría</h4>
                  <Input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={categoryToAdd.name}
                    onChange={(e) => setCategoryToAdd({ ...categoryToAdd, name: e.target.value })}
                  />
                  <hr />
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num}>
                      <label htmlFor={`image-category-${num}`} className="block mb-2">Imagen {num} (opcional)</label>
                      <Input
                        id={`image-category-${num}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, num - 1)}
                      />
                    </div>
                  ))}
                  <Button onClick={addCategory}>Agregar Categoría</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>

  )
}

function CategoryDishForm({ onAddDish }: { onAddDish: (dish: Dish) => void }) {
  const [newDish, setNewDish] = useState<Dish>({ id: '', name: '', description: '', price: '0' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDish.name && newDish.price !== '0') {
      onAddDish(newDish)
      setNewDish({ id: '', name: '', description: '', price: '0' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-1">
      <label className="text-lg italic">Nuevo plato</label>
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
        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
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
      <Button className="w-full block" type="submit">Agregar Plato</Button>
    </form>
  )
}

export default MenuBuilder;