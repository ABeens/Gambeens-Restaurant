

import { useState, useEffect } from 'react'
import { Moon, Sun, Palette } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import "@styles/globals.css";

type Theme = 'light' | 'dark' | 'system'
type ColorScheme = 'default' | 'sunset' | 'forest' | 'ocean'

const colorSchemes = {
  default: { primary: 'hsl(222.2 47.4% 11.2%)', secondary: 'hsl(210 40% 96.1%)' },
  sunset: { primary: 'hsl(20 80% 50%)', secondary: 'hsl(40 100% 97%)' },
  forest: { primary: 'hsl(150 80% 20%)', secondary: 'hsl(120 60% 97%)' },
  ocean: { primary: 'hsl(200 80% 30%)', secondary: 'hsl(190 90% 97%)' },
}

export function MenuBuilder() {
  const [theme, setTheme] = useState<Theme>('system')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default')
  const css = `
  :root {
    --primary: ${colorSchemes[colorScheme].primary};
    --secondary: ${colorSchemes[colorScheme].secondary};
  }
  body {
    background-color: var(--secondary);
    color: var(--primary);
  }
`

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.style.setProperty('--primary', colorSchemes[colorScheme].primary)
    root.style.setProperty('--secondary', colorSchemes[colorScheme].secondary)
  }, [colorScheme])

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-secondary">
      <h2 className="text-2xl font-bold mb-2">Selector de Tema</h2>
      <div className="flex space-x-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTheme('light')}
          aria-label="Tema claro"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTheme('dark')}
          aria-label="Tema oscuro"
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTheme('system')}
          aria-label="Tema del sistema"
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <Select value={colorScheme} onValueChange={(value: ColorScheme) => setColorScheme(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un esquema de color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Por defecto</SelectItem>
          <SelectItem value="sunset">Atardecer</SelectItem>
          <SelectItem value="forest">Bosque</SelectItem>
          <SelectItem value="ocean">Océano</SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-4 p-4 bg-primary text-primary-foreground rounded-md">
        <p>Vista previa del tema seleccionado</p>
      </div>
    </div>
  )
}