# Dashboard de Productos — Prueba Técnica Frontend Senior (Vue.js)

Dashboard de productos para e-commerce construido con Vue 3 + TypeScript + Pinia.

## Stack

- **Vue 3** `<script setup>` + Composition API
- **TypeScript** estricto
- **Pinia** — estado global
- **Vue Router 4** — navegación con lazy loading
- **Axios** — capa HTTP aislada
- **Vite** — bundler

**API:** [FakeStore API](https://fakestoreapi.com) — pública, no requiere autenticación.

## Funcionalidades

- Listado de productos con grid responsivo
- Búsqueda por nombre en tiempo real
- Filtro por categoría
- Paginación client-side (8 productos por página)
- Vista de detalle por producto

## Requisitos

- Node.js >= 18
- pnpm >= 8

## Instalación y uso

```bash
# Clonar
git clone git@github.com:IngJheyner/opitech.git
cd dashboard-productos

# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build producción
pnpm build
```

La app queda disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── api/            # Capa HTTP con axios (independiente de Vue)
├── composables/    # usePagination — lógica reutilizable
├── stores/         # Pinia store de productos y filtros
├── types/          # Interfaces TypeScript
├── components/     # ProductCard, SearchBar, CategoryFilter, PaginationBar
├── views/          # ProductsView, ProductDetailView
└── router/         # Rutas con lazy loading
```

## Decisiones técnicas

- **Pinia setup store** en vez de Vuex: sintaxis idéntica a `<script setup>`, estado de filtros persiste al navegar entre rutas.
- **Capa `api/` separada**: los componentes no importan axios directamente. Cambiar la fuente de datos no toca ningún componente.
- **`usePagination` genérico**: acepta cualquier `Ref<T[]>` o `ComputedRef<T[]>`, no está acoplado a productos.
- **Filtrado en `computed`**: el store calcula `filteredProducts` reactivamente; la vista no filtra nada por su cuenta.
