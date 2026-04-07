import "./main-card.css";
import Button from "../../common/Button/Button";

function MainCard({ id, title, subtitle, button, video, fileUrl, className }) {
  return (
    <div className={className} key={id}>
      <div className="text-left">
        <h3 className="subtitle black">{title}</h3>
        <p className="text-base black">{subtitle}</p>

        {fileUrl ? (
          <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
            <Button>{button}</Button>
          </a>
        ) : (
          <Button disabled>Нет файла</Button>
        )}
      </div>

      <div className="video-right">
        <iframe
          src={video}
          width="350"
          height="197"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default MainCard;