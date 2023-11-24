"use client";
import { ReactNode, CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";
import { baseStyles, variants } from "./ButtonStyles";

type Props = {
  variant?: keyof typeof variants;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  children: ReactNode;
};

type StyledButtonProps = {
  $variant: Props["variant"];
  isLoading: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${(p) => (p.$variant !== undefined ? variants[p.$variant] : "")};
`;

export const Button = ({
  variant,
  width = "80px",
  height = "40px",
  children,
  isLoading,
  onClick,
  ...props
}: Props & any) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isLoading) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };
  return (
    <StyledButton
      style={{ width, height }}
      $isLoading={isLoading}
      onClick={handleClick}
      $variant={variant}
      {...props}
    >
      {isLoading ? <span className="button-loading" /> : children}
    </StyledButton>
  );
};
