export default function Slide ({ name, cards }){
  return (
    <div className="slide">
      <h2 className="slide-title">{name}</h2>
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="card-slider">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};