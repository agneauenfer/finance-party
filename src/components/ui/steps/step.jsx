export default function Step ({ number, title, list }){
  return (
    <div className="step">
      <h3 className="step-title primary">{number}</h3>
      <p className="subtitle black div2">{title}</p>
      <div className="div3">
        {list.map((li) => (
          <ul style={{listStyle: "circle"}}>
            <li key={li.id} className="text-sm"> <strong>{li.title}:</strong>{li.desc}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};