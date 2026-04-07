import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";

export default function CreateCardForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [button, setButton] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const createCard = async () => {
    if (!title) {
      alert("Введите заголовок");
      return;
    }

    let fileUrl = null;

    if (file) {
      fileUrl = await uploadFile();
    }

    const { error } = await supabase.from("cards_video").insert([
      {
        title,
        subtitle,
        video_url: videoUrl,
        file_url: fileUrl,
        button: button, 
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

      onSuccess();
    }
  };

  const uploadFile = async () => {
    if (!file) return null;

    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("files")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert("Ошибка загрузки файла");
      return null;
    }

    const { data } = supabase.storage.from("files").getPublicUrl(fileName);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    return data.publicUrl;
  };

  return (
    <div className="form-container">
      <p className="subtitle black">Создать карточку</p>
      <form className="form">
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="4"
          cols="50"
          placeholder="Подзаголовок"
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        >
        </textarea>

        <input
          placeholder="Ссылка на видео"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          placeholder="Название для кнопки"
          value={button}
          onChange={(e) => setButton(e.target.value)}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button onClick={createCard}>Создать</Button>
      </form>
    </div>
  );
}
