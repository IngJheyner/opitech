import axios from 'axios'
import type { Product } from '@/types/product'

// Una instancia única con la base configurada — si el día de mañana
// cambia la URL o hay que agregar interceptores de auth, se toca solo aquí
const http = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await http.get<Product[]>('/products')
  return data
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await http.get<Product>(`/products/${id}`)
  return data
}

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await http.get<string[]>('/products/categories')
  return data
}
