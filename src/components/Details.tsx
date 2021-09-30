/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ReactNode, useState, SyntheticEvent, Suspense } from "react";

type DetailsProps = {
  children: ReactNode;
  title: string;
  id?: string;
};

const StyledDetails = styled.details`
  display: flex;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
  & summary {
    cursor: pointer;
    user-select: none;
    &:hover {
      text-decoration: underline;
    }
    &::marker {
      content: "";
    }
    &:after {
      float: right;
      transition: all 0.25s ease-in-out;
      content: "+";
    }
  }
  & .details-content {
    margin-top: 1rem;
  }
  &[open] {
    & summary::after {
      display: inline-block;
      float: right;
      transform: rotate(45deg);
      border: 1px solid #1ba9f5;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      text-align: center;
    }
    max-height: 100vh;
  }
`;

const Details = (props: DetailsProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <StyledDetails open={open} {...props}>
      <summary onClick={toggleOpen}>{props.title}</summary>
      <Suspense fallback={<div />}>
        <div className="details-content">{props.children}</div>
      </Suspense>
    </StyledDetails>
  );
};

export default Details;
