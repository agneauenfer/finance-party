import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";
import { validateVideoCardForm } from "./validator";

export default function CreateCardForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [button, setButton] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const createCard = async () => {
    const validation = validateVideoCardForm({
      title,
      subtitle,
      videoUrl,
      button,
      file,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      alert(firstError);
      return;
    }

    setErrors({});

    const fileUrl = await uploadFile();
    if (!fileUrl) return;

    const { error } = await supabase.from("cards_video").insert([
      {
        title: title.trim(),
        subtitle: subtitle.trim(),
        video_url: videoUrl.trim(),
        file_url: fileUrl,
        button: button.trim(),
      },
    ]);

    if (error) {
      console.error(error);
      alert("Ошибка при создании");
    } else {
      setTitle("");
      setSubtitle("");
      setVideoUrl("");
      setButton("");
      setFile(null);
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onSuccess();
    }
  };

  const uploadFile = async () => {
    if (!file) return null;

    // Очищаем имя файла: заменяем пробелы на _, убираем спецсимволы
    const cleanName = file.name
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');
    
    const fileName = `${Date.now()}_${cleanName}`;

    const { error } = await supabase.storage
      .from("files")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert("Ошибка загрузки файла");
      return null;
    }

    const { data } = supabase.storage.from("files").getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <div className="form-container">
      <p className="subtitle black">Создать карточку</p>
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
          <textarea
            rows="4"
            cols="50"
            placeholder="Подзаголовок"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={errors.subtitle ? "error" : ""}
          />
          <span className="char-count">{subtitle.length}/300</span>
          {errors.subtitle && <span className="error-text">{errors.subtitle}</span>}
        </div>

        <div className="form-field">
          <input
            placeholder="Ссылка на видео"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={errors.videoUrl ? "error" : ""}
          />
          {errors.videoUrl && <span className="error-text">{errors.videoUrl}</span>}
        </div>

        <div className="form-field">
          <input
            placeholder="Название для кнопки"
            value={button}
            onChange={(e) => setButton(e.target.value)}
            maxLength={30}
            className={errors.button ? "error" : ""}
          />
          <span className="char-count">{button.length}/30</span>
          {errors.button && <span className="error-text">{errors.button}</span>}
        </div>

        <div className="form-field">
          <label className="file-label">
            Название файла на английском, без пробелов
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className={errors.file ? "error" : ""}
          />
          {file && <span className="file-name">Выбран: {file.name}</span>}
          {errors.file && <span className="error-text">{errors.file}</span>}
        </div>

        <Button onClick={createCard}>Создать</Button>
      </form>
    </div>
  );
}