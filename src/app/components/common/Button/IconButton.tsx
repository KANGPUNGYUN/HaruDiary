"use client";
import { ReactNode, CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";
import { baseStyles, variants } from "./ButtonStyles";
import { Icon } from "../Icon/Icon";

type Props = {
  variant?: keyof typeof variants;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  children: ReactNode;
};

type StyledButtonProps = {
  $variant: Props["variant"];
  isLoading: boolean;
  iconOnly: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${(p) => (p.$variant !== undefined ? variants[p.$variant] : "primary")};
`;

export const IconButton = ({
  variant = "primary",
  width = "80px",
  height = "40px",
  children,
  isLoading,
  onClick,
  icon,
  iconSize,
  iconColor,
  iconOnly,
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
      {isLoading ? (
        <div className="button-loading" />
      ) : iconOnly ? (
        <>
          <Icon icon={icon} size={iconSize} color={iconColor} />{" "}
          <span className="p-blind">{children}</span>
        </>
      ) : (
        <>
          <Icon icon={icon} size={iconSize} color={iconColor} /> {children}
        </>
      )}
    </StyledButton>
  );
};
