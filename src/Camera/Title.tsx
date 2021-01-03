import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";

type TitleProps = {
  className?: string;
  style?: CSSProperties;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  border: 1px solid #ff606060;
`;

const Text = styled.span`
  padding: 0 8px;
  color: #cfed57;
`;

const Title: FunctionComponent<TitleProps> = (props) => {
  const { className, style } = props;

  return (
    <Wrapper className={className} style={style}>
      <Text>CODE MATRIX</Text>
      <Text>SEQUENCES</Text>
    </Wrapper>
  )
}

export default Title;
