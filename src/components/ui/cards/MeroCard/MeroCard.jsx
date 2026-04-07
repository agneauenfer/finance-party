import "./mero-card.css";

function MeroCard({ id, title, subtitle, image_url }) {
  return (
    <div className="mero-card" key={id}>
      <div className="image-wrapper">
        <img src={image_url} alt="Фото с мероприятия" />
      </div>
      <div className="text-container">
        <p className="subtitle white">{title}</p>
        <p className="text-base white">{subtitle}</p>
      </div>
    </div>
  );
}

export default MeroCard;
