import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import Button from "../ui/common/Button/Button";
import CreateCardForm from "../admin/CreateCardForm";
import CardsList from "../admin/CardsList";
import CreateImageCardForm from "../admin/CreateImageCardForm";
import ImageCardsList from "../admin/ImageCardsList";
import Section from "../ui/common/Section";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [imageCards, setImageCards] = useState([]);
  const navigate = useNavigate();

  const fetchCards = useCallback(async () => {
    const { data: cardsData, error } = await supabase
      .from("cards_video")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setCards(cardsData);
    }
  }, []);

  const fetchImageCards = useCallback(async () => {
    const { data: imageCardsData, error } = await supabase
      .from("cards_image")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setImageCards(imageCardsData);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        navigate("/login", { replace: true });
        return;
      }

      await fetchCards();
      setLoading(false);

      await fetchImageCards();
      setLoading(false);
    };

    init();
  }, [navigate, fetchCards, fetchImageCards]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  if (loading) return null;

  return (
    <Section noGap>
      <div className="agmin-header">
        <p className="title">Панель управления</p>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
      <CreateCardForm onSuccess={fetchCards} />
      <CardsList cards={cards} onUpdate={fetchCards} />
      <CreateImageCardForm onSuccess={fetchImageCards} />
      <ImageCardsList cards={imageCards} onUpdate={fetchImageCards} />
    </Section>
  );
}
