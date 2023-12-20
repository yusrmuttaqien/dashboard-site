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
          <div>
            <InfoDetails>**** 8989</InfoDetails>
            <InfoDetails className="truncate">Card User</InfoDetails>
          </div>
          <InfoDetails>12/25</InfoDetails>
        </InfoSection>
      </CardInfo>
    </Container>
  );
}
