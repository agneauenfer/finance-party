import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";
import { validateImageCardForm } from "./validator";

export default function CreateImageCardForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const createCard = async () => {
    const validation = validateImageCardForm({
      title,
      subtitle,
      image,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      alert(firstError);
      return;
    }

    setErrors({});

    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    const { error } = await supabase.from("cards_image").insert([
      {
        title: title.trim(),
        subtitle: subtitle.trim(),
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
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onSuccess();
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    // Очищаем имя файла: заменяем пробелы на _, убираем спецсимволы
    const cleanName = image.name
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');
    
    const fileName = `${Date.now()}_${cleanName}`;

    const { error } = await supabase.storage.from("images").upload(fileName, image);

    if (error) {
      console.error(error);
      alert("Ошибка загрузки изображения");
      return null;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <div className="form-container">
      <p className="subtitle black">Добавить мероприятие</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <input
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-field">
          <input
            placeholder="Подзаголовок"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={errors.subtitle ? "error" : ""}
          />
          <span className="char-count">{subtitle.length}/300</span>
          {errors.subtitle && <span className="error-text">{errors.subtitle}</span>}
        </div>

        <div className="form-field">
          <label className="file-label">
            Название файла на английском, без пробелов
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            className={errors.image ? "error" : ""}
          />
          {image && <span className="file-name">Выбран: {image.name}</span>}
          {errors.image && <span className="error-text">{errors.image}</span>}
        </div>

        <Button onClick={createCard}>Создать</Button>
      </form>
    </div>
  );
}