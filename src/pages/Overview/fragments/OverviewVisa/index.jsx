import { useHookstate } from '@hookstate/core';
import { CARD_STATE_PROVIDER } from '@/utils/states';
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
  const cardState = useHookstate(CARD_STATE_PROVIDER);
  const cardInfo = cardState.get();

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
