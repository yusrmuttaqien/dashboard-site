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
    margin-top: 8px;
    text-align: center;
  }

  .custom-button {
    margin-bottom: 8px;
  }
`;
