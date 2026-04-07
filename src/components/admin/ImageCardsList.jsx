import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";
import MeroCard from "../ui/cards/MeroCard/MeroCard";

export default function ImageCardList({ cards, onUpdate }) {
  const [editingCard, setEditingCard] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    subtitle: "",
  });

  const openEdit = (card) => {
    setEditingCard(card);
    setEditData({
      title: card.title || "",
      subtitle: card.subtitle || "",
    });
  };

  const updateCard = async () => {
    const { error, data } = await supabase
      .from("cards_image")
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

    if (card.image_url) {
      const path = getPathFromUrl(card.image_url);
      await supabase.storage.from("files").remove([path]);
    }

    await supabase.from("cards_image").delete().eq("id", card.id);

    onUpdate();
  };

  return (
    <div className="card-container">
      <p className="subtitle">Мероприятия</p>

      {cards.map((card) => (
        <div key={card.id} style={{ width: "50%" }}>
          <MeroCard
            id={card.id}
            title={card.title}
            subtitle={card.subtitle}
            image_url={card.image_url}
          />

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Button variant="outline" onClick={() => openEdit(card)}>
              Редактировать
            </Button>
            <Button onClick={() => deleteCard(card)}>Удалить</Button>
          </div>
        </div>
      ))}

      {/* МОДАЛКА */}
      {editingCard && (
        <div className="modal-overlay" onClick={() => setEditingCard(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Редактировать мероприятие</h3>

            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              value={editData.subtitle}
              onChange={(e) =>
                setEditData({ ...editData, subtitle: e.target.value })
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
