<template>
  <div class="search-bar">
    <span class="search-bar__icon" aria-hidden="true">🔍</span>
    <input
      type="search"
      :value="modelValue"
      placeholder="Buscar producto..."
      class="search-bar__input"
      aria-label="Buscar producto"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped>
.search-bar {
  position: relative;
  flex: 1;
}

.search-bar__icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.9rem;
}

.search-bar__input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.2rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: #fff;
  box-sizing: border-box;
}

.search-bar__input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
</style>
