import styled from 'styled-components';

export const Container = styled.figure`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.black.base(0.2)};
  border-radius: 16px;
  text-align: center;

  h4 {
    font-weight: 600;
  }

  img {
    width: 90px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 100%;
    margin: 16px 0;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black.base(0.5)};
    margin: 12px 0;
    text-align: justify;
  }
`;

export const Link = styled.a`
  display: block;
  background-color: ${({ theme }) => theme.colors.purple.active()};
  color: ${({ theme }) => theme.colors.white.base};
  border-radius: 8px;
  padding: 8px;
  text-decoration: none;

  &:last-of-type {
    margin-top: 8px;
  }
`;
