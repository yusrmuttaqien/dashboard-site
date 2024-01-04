import { Container } from './styles';

export default function Button(props) {
  const { href, children, ...rest } = props;

  return (
    <Container as={href ? 'a' : 'button'} href={href} {...rest}>
      {children}
    </Container>
  );
}
