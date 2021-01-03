import { CSSProperties, FunctionComponent, useCallback, useState } from "react"
import styled from "styled-components";

import exampleImg from '../../assets/example.jpg'

type ExplanationProps = {
  className?: string;
  style?: CSSProperties;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
`;

const Example = styled.img`
  width: 80%;
  margin: 8px;
`;

const Button = styled.button`
  color: #ff6060;
  margin: 8px;
`;

const Explanation: FunctionComponent<ExplanationProps> = (props) => {
  const { className, style } = props;
  const [exampleShown, setExampleShown] = useState(false);

  const showExample = useCallback(() => setExampleShown(true), []);

  return (
    <Wrapper className={className} style={style}>
			Move the camera as close to the screen as possible. Avoid rotation or tilt.

			{exampleShown ? <Example src={exampleImg} /> : <Button onClick={showExample}>Show the example</Button>}
    </Wrapper>
  )
}

export default Explanation;
