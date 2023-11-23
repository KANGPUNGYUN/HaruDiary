import { css } from "styled-components";

export const baseStyles = css`
  display: inline-block;
  padding: 0;
  border: 1px solid transparent;
  background: none;
  font-size: 14px;
  line-height: 18px;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: auto;
  height: 40px;
  border-radius: 4px;
  font-weight: 400;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  overflow: hidden;

  &:disabled {
    opacity: 0.6;
    cursor: none;
    pointer-events: none;
  }
`;

export const variants = {
  primary: css`
    color: var(--black);
    background-color: var(--primary);
    &:hover {
      background-color: var(--primary200);
    }
  `,
  default: css`
    color: var(--black);
    background-color: var(--white);
    border: 1px solid var(--black);
    &:hover {
      color: var(--black);
      background-color: var(--primary200);
    }
  `,
  danger: css`
    color: var(--black);
    background-color: var(--danger);
    &:hover {
      background-color: var(--danger200);
    }
  `,
};
