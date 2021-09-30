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
      transform: translateY(-2px);
      float: right;
      transition: all 0.25s ease-in-out;
      content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' class='euiIcon euiIcon--medium euiIcon-isLoaded eui-alignMiddle' fill='white' focusable='false' role='img' aria-hidden='true'%3E%3Cpath fill-rule='nonzero' d='M5.157 13.069l4.611-4.685a.546.546 0 000-.768L5.158 2.93a.552.552 0 010-.771.53.53 0 01.759 0l4.61 4.684c.631.641.63 1.672 0 2.312l-4.61 4.684a.53.53 0 01-.76 0 .552.552 0 010-.771z'%3E%3C/path%3E%3C/svg%3E");
    }
  }
  & .details-content {
    margin-top: 1rem;
  }
  &[open] {
    & summary::after {
      float: right;
      transform: rotate(90deg) translateX(-3px);
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
