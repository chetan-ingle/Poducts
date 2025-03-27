import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        throw new Error('All fields are required');
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: 'Product created' };
    } catch (error) {
      console.error('Error creating product:', error.message);
      return { success: false, message: error.message || 'Error creating product' };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  },

  deleteProduct: async (pid) => {
    try {
      if (!pid) {
        throw new Error('Invalid product ID');
      }

      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Error deleting product:', error.message);
      return { success: false, message: error.message || 'Failed to delete product' };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      if (!pid || !updatedProduct) {
        throw new Error('Invalid product data');
      }

      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        products: state.products.map((product) => 
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      console.error('Error updating product:', error.message);
      return { success: false, message: error.message || 'Failed to update product' };
    }

    return{success:true, message:data.message}
  },

  
}));
