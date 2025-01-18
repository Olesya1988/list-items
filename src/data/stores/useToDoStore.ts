import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { ToDoStore } from "../interfaces.tsx";

// используем github api
const URL =
  "https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=";

// создаём store
export const useToDoStore = create<ToDoStore>(
  devtools((set, get) => ({
    items: [], // массив элементов
    loading: false, // статус загрузки
    error: null, // ошибка
    page: 1, // номер страницы - начинаем с первой
    fetchItems: async () => {
      // загрузка элементов первой страницы
      set({ loading: true });
      const { page } = get();

      try {
        const response = await axios.get(`${URL}${page}`);

        set({ items: response.data.items });
      } catch (e: any) {
        let error = e;
        // custom error
        if (e.status === 400) {
          error = await e.json();
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    },
    moreItems: async () => {
      // дозагрузка элементов (вторая, третья и т.д. страницы)
      const { items } = get();
      const { page } = get();
      set({ page: page + 1 });

      const response = await axios.get(`${URL}${page + 1}`);

      set({
        items: items.concat(response.data.items),
      });
    },
    updateItem: (id: number, name: string) => {
      // редактирование заголовка выбранного элемента
      const { items } = get();
      set({
        items: items.map((item) => ({
          ...item,
          name: item.id === id ? name : item.name,
        })),
      });
    },
    removeItem: (id: number) => {
      // удаление выбранного элемента
      const { items } = get();
      set({
        items: items.filter((item) => item.id !== id),
      });
    },
  }))
);
