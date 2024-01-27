import useUser from '@/hooks/useUser';
import useVisa from '@/hooks/useVisa';
import {
  Container,
  Logo,
  LogoOutline,
  CardInfo,
  InfoSection,
  InfoDetails,
  VisaLogo,
} from './styles';

export default function OverviewVisa(props) {
  const { className } = props;
  const { card_info } = useVisa();
  const { user } = useUser();
  const cardInfo = card_info.get();
  const formatDate = new Date(user.date.get());

  return (
    <Container className={className}>
      <Logo />
      <LogoOutline />
      <CardInfo>
        <InfoSection>
          <h4>E-Card</h4>
          <VisaLogo />
        </InfoSection>
        <InfoSection $align="end">
          <div className="info-container">
            <InfoDetails>**** {cardInfo.id.slice(-4)}</InfoDetails>
            <InfoDetails className="truncate card-name">{cardInfo.name}</InfoDetails>
          </div>
          <InfoDetails>
            {(formatDate.getMonth() + 1).toString().padStart(2, '0')}/{formatDate.getFullYear()}
          </InfoDetails>
        </InfoSection>
      </CardInfo>
    </Container>
  );
}
