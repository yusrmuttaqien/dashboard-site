import { Container } from './styled';

export default function UserList(props) {
  const { content, onClick, className } = props;

  return (
    <Container className={className} $isInteractive={!!onClick} onClick={onClick}>
      <img src={content.img} alt={`${content.name}'s picture`} />
      <div className="info">
        <h5 className="truncate">{content.name}</h5>
        <p className="truncate">{content?.info}</p>
      </div>
    </Container>
  );
}
