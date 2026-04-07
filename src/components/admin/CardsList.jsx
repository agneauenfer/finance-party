import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";
import MainCard from "../ui/cards/MainCard/MainCard";

export default function CardsList({ cards, onUpdate }) {
  const [editingCard, setEditingCard] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    subtitle: "",
    video_url: "",
    button: "",
  });

  const openEdit = (card) => {
    setEditingCard(card);
    setEditData({
      title: card.title || "",
      subtitle: card.subtitle || "",
      video_url: card.video_url || "",
      button: card.button || "",
    });
  };

  const updateCard = async () => {
    const { error, data } = await supabase
      .from("cards_video")
      .update(editData)
      .eq("id", editingCard.id)
      .select();

    if (!error) {
      onUpdate((prev) =>
        prev.map((c) => (c.id === editingCard.id ? data[0] : c)),
      );
      setEditingCard(null);
    }
  };

  const getPathFromUrl = (url) => {
    const parts = url.split("/storage/v1/object/public/files/");
    return parts[1];
  };

  const deleteCard = async (card) => {
    const confirmDelete = confirm("Удалить карточку?");
    if (!confirmDelete) return;

    if (card.file_url) {
      const path = getPathFromUrl(card.file_url);
      const { error: storageError } = await supabase.storage
        .from("files")
        .remove([path]);

      if (storageError) {
        console.error("Ошибка удаления файла:", storageError);
      }
    }

    await supabase.from("cards_video").delete().eq("id", card.id);
    onUpdate();
  };

  return (
    <div className="card-container">
      <p className="subtitle">Обучающие материалы</p>

      {cards.map((card) => (
        <div key={card.id}>
          <MainCard
            title={card.title}
            subtitle={card.subtitle}
            button={card.button}
            video={card.video_url}
            fileUrl={card.file_url}
          />

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Button variant="outline" onClick={() => openEdit(card)}>
              Редактировать
            </Button>
            <Button onClick={() => deleteCard(card)}>Удалить</Button>
          </div>
        </div>
      ))}

      {editingCard && (
        <div className="modal-overlay" onClick={() => setEditingCard(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Редактировать карточку</h3>

            <input
              placeholder="Заголовок"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Подзаголовок"
              value={editData.subtitle}
              onChange={(e) =>
                setEditData({ ...editData, subtitle: e.target.value })
              }
            />

            <input
              placeholder="Ссылка на видео (iframe src)"
              value={editData.video_url}
              onChange={(e) =>
                setEditData({ ...editData, video_url: e.target.value })
              }
            />

            <input
              placeholder="Текст кнопки"
              value={editData.button}
              onChange={(e) =>
                setEditData({ ...editData, button: e.target.value })
              }
            />

            <div className="modal-actions">
              <Button onClick={updateCard}>Сохранить</Button>
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
