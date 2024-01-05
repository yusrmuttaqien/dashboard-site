import UserPlaceholder from '@/assets/img/user-profile.png';
import { Container } from './styled';

export default function UserList(props) {
  const { content, onClick, className, ...rest } = props;

  return (
    <Container className={className} $isInteractive={!!onClick} onClick={onClick} {...rest}>
      <img src={content.img || UserPlaceholder} alt={`${content.name}'s picture`} />
      <div className="info">
        <h5 className="truncate">{content.name}</h5>
        <p className="truncate">{content?.info}</p>
      </div>
    </Container>
  );
}
