interface Props {
  title: string;
  summary: string;
  country: string;
  city: string;
}

export const Tour = ({ title, summary, country, city }: Props) => (
  <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4">{title}</p>
      </div>
    </div>

    <div className="content">
      <p>{summary}</p>
      <p>{country} - {city}</p>
    </div>
  </div>
</div>
);
