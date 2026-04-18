import styled from "styled-components";

export const AppText = styled.p`
  color: ${({ theme, color }) => color || theme.colors.primary};
  font-family: ${({ theme, weight }) => theme.fonts[weight] || theme.fonts.regular};
  font-size: ${({ theme, size }) => theme.fontSizes[size] || theme.fontSizes.body};
`;
