<template>
  <article class="product-card" @click="$emit('click')">
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.title" class="product-card__image" loading="lazy" />
    </div>
    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <h3 class="product-card__title">{{ product.title }}</h3>
      <div class="product-card__footer">
        <span class="product-card__price">${{ product.price.toFixed(2) }}</span>
        <span class="product-card__rating">
          ★ {{ product.rating.rate }}
          <small>({{ product.rating.count }})</small>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{ product: Product }>()
defineEmits<{ click: [] }>()
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.product-card__image-wrapper {
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  height: 200px;
}

.product-card__image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.product-card__category {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  font-weight: 600;
}

.product-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
}

.product-card__price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
}

.product-card__rating {
  font-size: 0.82rem;
  color: #f59e0b;
  font-weight: 600;
}

.product-card__rating small {
  color: #6b7280;
  font-weight: 400;
}
</style>
