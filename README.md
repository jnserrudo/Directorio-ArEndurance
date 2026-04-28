# ArEndurance Team - Directorio de Emprendimientos

Directorio web de emprendimientos de la familia ArEndurance Team en Salta, Argentina.

## Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server ultrarrápido
- **TypeScript** - Tipado estático
- **TailwindCSS v4** - Framework de estilos utility-first
- **shadcn/ui** - Componentes UI accesibles y personalizables
- **Radix UI** - Primitivas UI sin estilos
- **Lucide React** - Iconos modernos
- **React Intersection Observer** - Animaciones al scroll
- **Framer Motion** - Animaciones fluidas (opcional)

## Características

- Filtrado por categorías
- Búsqueda en tiempo real con debounce
- Tarjetas de emprendimientos con información detallada
- Enlaces directos a WhatsApp e Instagram
- Diseño responsive y moderno
- Animaciones suaves y transiciones
- Optimizado para performance
- Accesibilidad (a11y)

## Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── cards/          # Componentes de tarjetas
│   ├── layout/         # Header, Footer
│   ├── sections/       # Secciones de la página
│   ├── shared/         # Componentes compartidos
│   └── ui/             # Componentes shadcn/ui
├── hooks/              # Custom React hooks
├── lib/                # Utilidades y datos
│   ├── data/           # Datos de emprendimientos
│   └── utils/          # Funciones auxiliares
├── styles/             # Estilos globales
├── App.tsx             # Componente principal
└── main.tsx            # Entry point
```

## Agregar un Emprendimiento

Editar el archivo `src/lib/emprendimientos.ts` y agregar un nuevo objeto al array:

```typescript
{
  id: "nuevo-id",
  nombre: "Nombre del emprendedor",
  empresa: "Nombre de la empresa",
  rubro: "Rubro del negocio",
  descripcion: "Descripción detallada",
  direccion: "Dirección física (opcional)",
  telefono: "Número de teléfono",
  instagram: "usuario_instagram",
  descuento: "Descripción del descuento AR",
  otros: "Información adicional",
  categoria: "categoria", // deportivo, salud, gastronomia, etc.
  destacado: false, // true para destacar
}
```

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo en http://localhost:3000
- `pnpm build` - Genera el build optimizado para producción
- `pnpm preview` - Previsualiza el build de producción
- `pnpm lint` - Ejecuta el linter

## Despliegue

El proyecto está listo para ser desplegado en:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Cualquier servicio que soporte aplicaciones React estáticas

### Desplegar en Vercel

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Desplegar
vercel
```

## Licencia

© 2026 ArEndurance Team. Todos los derechos reservados.
