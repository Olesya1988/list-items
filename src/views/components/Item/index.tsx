import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { ItemProps } from "../../../data/interfaces";
import { Card, Modal } from "antd";

export const Item: React.FC<ItemProps> = ({
  id,
  owner,
  title,
  url,
  visibility,
  watchers,
  forks,
  size,
  onEdited,
  onRemoved,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // фокусировка при редактировании элемента
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  // открытие модального окна
  const showModal = () => {
    setIsModalOpen(true);
  };

  // закрытие окна и подтверждение удаления
  const handleOk = () => {
    setIsModalOpen(false);
    onRemoved(id);
  };

  // закрытие модального окна
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card title="">
      <div className={styles.item}>
        <div>
          <label className={styles.itemLabel}>
            {isEditMode ? (
              <input
                value={value}
                ref={editTitleInputRef}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onEdited(id, value);
                    setIsEditMode(false);
                  }
                }}
                className={styles.itemTitleEdit}
              />
            ) : (
              <>
                <div className={styles.itemTitle}>{title}</div>
              </>
            )}
          </label>
          <label className={styles.itemLabel}>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Owner:</span> {owner}
            </div>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Url:</span>{" "}
              <a className={styles.itemTitleSubLink} href={url}>
                {url}
              </a>
            </div>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Visibility:</span>{" "}
              {visibility}
            </div>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Watchers:</span>{" "}
              {watchers}
            </div>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Forks:</span> {forks}
            </div>
            <div className={styles.itemTitleSub}>
              <span className={styles.itemTitleSubName}>Size:</span> {size}
            </div>
          </label>
        </div>

        {isEditMode ? (
          <button
            aria-label="Save"
            className={styles.itemSave}
            onClick={() => {
              onEdited(id, value);
              setIsEditMode(false);
            }}
          ></button>
        ) : (
          <button
            aria-label="Edit"
            className={styles.itemEdit}
            onClick={() => {
              setIsEditMode(true);
            }}
          ></button>
        )}
        <button
          aria-label="Remove"
          className={styles.itemRemove}
          onClick={showModal}
        ></button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Are you sure?</p>
        </Modal>
      </div>
    </Card>
  );
};
