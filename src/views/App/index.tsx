import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useToDoStore } from "../../data/stores/useToDoStore";
import { Item } from "../components/Item";

export const App: React.FC = () => {
  const [items, loading, fetchItems, moreItems, updateItem, removeItem] =
    useToDoStore((state) => [
      state.items,
      state.loading,
      state.fetchItems,
      state.moreItems,
      state.updateItem,
      state.removeItem,
    ]);

  useEffect(() => {
    fetchItems();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // скроллинг
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    moreItems();
  };

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Repositories of JavaScript</h1>
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}>
        {loading && <p className={styles.articleText}>Loading...</p>}

        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            owner={item.owner.login}
            title={item.name}
            url={item.url}
            visibility={item.visibility}
            watchers={item.watchers}
            forks={item.forks}
            size={item.size}
            onEdited={updateItem}
            onRemoved={removeItem}
          />
        ))}
      </section>
    </article>
  );
};
