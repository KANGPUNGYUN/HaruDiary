"use client";
import { ReactNode, CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";
import { baseStyles } from "./ButtonStyles";
import { Icon } from "../Icon/Icon";
import Link from "next/link";
import { LinkProps } from "next/dist/client/link";

interface Props {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  backgroundColor?: CSSProperties["backgroundColor"];
  borderRadius?: CSSProperties["borderRadius"];
  children: ReactNode;
  buttonType:
    | (React.ComponentPropsWithoutRef<"button"> & { renderAs: "button" })
    | ({
        renderAs: "link";
        href: string;
      } & React.ComponentPropsWithoutRef<"a">)
    | ({
        renderAs: "routerLink";
        href: string;
      } & React.PropsWithChildren<LinkProps>);
}

type StyledButtonProps = {
  isLoading: boolean;
  iconOnly: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  ${baseStyles};
`;

export const IconButton = ({
  width = "80px",
  height = "40px",
  backgroundColor,
  borderRadius,
  children,
  isLoading,
  buttonType,
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
  if (buttonType.renderAs === "link") {
    return (
      <StyledButton
        as={"a"}
        href={buttonType.href}
        target="_blank"
        rel="noopener"
        style={{ width, height, backgroundColor, borderRadius }}
        $isLoading={isLoading}
        onClick={handleClick}
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
  }

  if (buttonType.renderAs === "routerLink") {
    return (
      <Link href={buttonType.href}>
        <StyledButton
          style={{ width, height, backgroundColor, borderRadius }}
          $isLoading={isLoading}
          onClick={handleClick}
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
      </Link>
    );
  }
  return (
    <StyledButton
      style={{ width, height, backgroundColor, borderRadius }}
      $isLoading={isLoading}
      onClick={handleClick}
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
