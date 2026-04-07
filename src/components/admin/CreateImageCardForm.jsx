import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";

export default function CreateImageCardForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const createCard = async () => {
    let imageUrl = null;

    if (image) {
      imageUrl = await uploadImage();
    }

    const { error } = await supabase.from("cards_image").insert([
      {
        title,
        subtitle,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Ошибка при создании");
    } else {
      setTitle("");
      setSubtitle("");
      setImage(null);

      onSuccess();
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    const fileName = `${Date.now()}_${image.name}`;

    await supabase.storage.from("images").upload(fileName, image);

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    return data.publicUrl;
  };

  return (
    <div className="form-container">
      <p className="subtitle black">Добавить мероприятие</p>
      <form className="form">
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Подзаголовок"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <Button onClick={createCard}>Создать</Button>
      </form>
    </div>
  );
}
