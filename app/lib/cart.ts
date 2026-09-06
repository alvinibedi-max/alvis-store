import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface CartItem {
  id?: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: item => {
        const existing = get().items.find(i => i.product_id === item.product_id);
        if (existing) {
          set({items: get().items.map(i => i.product_id === item.product_id ? {...i, quantity: i.quantity + item.quantity} : i)});
        } else {
          set({items: [...get().items, {...item, id: crypto.randomUUID()}]});
        }
      },
      updateQuantity: (id, quantity) => {
        set({items: get().items.map(i => i.id === id ? {...i, quantity: Math.max(0, quantity)} : i)});
      },
      removeItem: id => set({items: get().items.filter(i => i.id !== id)}),
      clearCart: () => set({items: []}),
      getTotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      getCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {name: 'alvis-cart'},
  ),
);

export function useCartForm() {
  const addItem = useCartStore(state => state.addItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);
  const items = useCartStore(state => state.items);
  const getTotal = useCartStore(state => state.getTotal);
  const getCount = useCartStore(state => state.getCount);

  return {items, addItem, updateQuantity, removeItem, clearCart, getTotal, getCount};
}
