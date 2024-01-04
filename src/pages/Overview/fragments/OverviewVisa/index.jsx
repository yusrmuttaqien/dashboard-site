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
  const cardInfo = card_info.get();

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
          <InfoDetails>{cardInfo.date}</InfoDetails>
        </InfoSection>
      </CardInfo>
    </Container>
  );
}
