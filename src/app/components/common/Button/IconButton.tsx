"use client";
import { ReactNode, CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";
import { baseStyles, variants, circleButton } from "./ButtonStyles";
import { Icon } from "../Icon/Icon";

type Props = {
  variant?: keyof typeof variants;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  backgroundColor?: CSSProperties["backgroundColor"];
  children: ReactNode;
};

type StyledButtonProps = {
  $variant: Props["variant"];
  isLoading: boolean;
  iconOnly: boolean;
  isCircleButton: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${(p) => (p.$variant !== undefined ? variants[p.$variant] : "")};
  ${(p) => (!!p.isCircleButton ? circleButton : "")};
`;

export const IconButton = ({
  variant,
  width = "80px",
  height = "40px",
  backgroundColor,
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
      style={{ width, height, backgroundColor }}
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
