import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Section from "../ui/common/Section";
import Button from "../ui/common/Button/Button";
import CardData from "../data/cards.json";
import MeroCard from "../ui/cards/MeroCard/MeroCard";
import LastCard from "../ui/cards/LastCard/LastCard";
import MainCard from "../ui/cards/MainCard/MainCard";
import ModalText1 from "../ui/modals/ModalText1";
import ModalText2 from "../ui/modals/ModalText2";
import ModalTest from "../ui/modals/ModalTest";

const fetchCards = async () => {
  const { data, error } = await supabase
    .from("cards_video")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

const fetchEvents = async () => {
  const { data, error } = await supabase
    .from("cards_image")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

function HomePage() {
  const { data: cards = [] } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  const { data: mero = [] } = useQuery({
    queryKey: ["mero"],
    queryFn: fetchEvents,
  });

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalTestOpen, setIsModalTestOpen] = useState(false)


  const handleClick1 = () => {
    setIsModalOpen(true)
  }

  const handleModal1 = () => {
    setIsModalOpen(false)
  }
  const handleClick2 = () => {
    setIsModalOpen2(true)
  }

  const handleModal2 = () => {
    setIsModalOpen2(false)
  }
  const handleClickTest = () => {
    setIsModalTestOpen(true)
  }

  const handleModalTest = () => {
    setIsModalTestOpen(false)
  }

  return (
    <>
      <Section noGap>
        <div className="greet">
          <div className="greet-container">
            <div className="greet-text">
              <img
                src="./images/logo.svg"
                alt="Финансовый девичник и мальчишник"
              />
              <p className="text-base primary">
                Все о семейном бюджете: учимся распределять деньги,
                договариваться и выстраивать новые финансовые стратегии в браке
              </p>
            </div>
            <Button to="#material">Получить гайд</Button>
          </div>
        </div>
      </Section>
      <Section className="about-section" id="about">
        <h2 className="title">Что такое финансовый девичник и мальчишник?</h2>
        <p className="text-base black">
          Серия мероприятий и материалов, которые помогают парам: согласовать
          семейные цели, научиться вести совместный бюджет, распределять
          накопления и планировать крупные покупки.
        </p>
      </Section>
      <Section className="first-container">
        <div className="special-card" key={CardData[0].id}>
          <h3 className="subtitle primary">{CardData[0].title}</h3>
          <p className="text-base black">{CardData[0].subtitle}</p>
          <Button onClick={handleClick1}>Узнать больше</Button>
        </div>

        <div className="greet-card" key={CardData[1].id} onClick={handleClick2}>
          <h3 className="subtitle white">{CardData[1].title}</h3>
          <p className="text-base white">{CardData[1].subtitle}</p>
          <p className="note">Нажмите, чтобы узнать больше</p>
        </div>

        <div className="greet-card" key={CardData[2].id} onClick={handleClickTest}>
          <h3 className="subtitle white">{CardData[2].title}</h3>
          <p className="text-base white">{CardData[2].subtitle}</p>
          <p className="note">Нажмите, чтобы узнать больше</p>
        </div>

        <ModalText1 
          isOpen={isModalOpen}
          onClose={handleModal1}
        />

        <ModalText2 
          isOpen={isModalOpen2}
          onClose={handleModal2}
        />

        <ModalTest 
          isOpen={isModalTestOpen}
          onClose={handleModalTest}
        />
      </Section>


      <Section className="card-container-home" id="material">
        <div className="main-text">
          <h2 className="title">Обучающие материалы</h2>
          <p className="text-base black">
            Избранные темы для разных аспектов финансовой жизни
          </p>
        </div>
        <div className="container">
          {cards.slice().reverse().map((card) => (
            <MainCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              button={card.button}
              video={card.video_url}
              fileUrl={card.file_url}
              className="card"
            />
          ))}
        </div>
        {cards.length < 6 && <LastCard />}
      </Section>

      <Section id="events">
        <h2 className="title">Мероприятия</h2>
        <div className="mero-container">
          {mero.length === 0 ? (
            <p className="text-base black">
              Мероприятий ещё не было, но это ненадолго. Как только появится что-то интересное, мы обязательно положим это сюда
            </p>
          ) : (
            mero.map((event) => (
              <MeroCard
                key={event.id}
                title={event.title}
                subtitle={event.subtitle}
                image_url={event.image_url}
              />
            ))
          )}
        </div>
      </Section>
    </>
  );
}

export default HomePage;
