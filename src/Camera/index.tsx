import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";
import Explanation from "./Explanation";
import Title from "./Title";
import useVideoStream from "./useVideoStream";
import Video from "./Video";

type CameraProps = {
  ratio: number;
	onCapture?: (canvas: HTMLCanvasElement) => void;
	className?: string;
	style?: CSSProperties;
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 780px;
  margin: 16px auto;
  border: 1px solid #ff606060;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-bottom: 32px;
  font-size: 1.2em;
  color: #5ef5ff;
  width: 160px;
  height: 64px;
  flex-shrink: 0;
`;

const Camera: FunctionComponent<CameraProps> = (props) => {
  const { ratio, onCapture, className, style } = props;
  const [ref, capture] = useVideoStream(ratio, onCapture);

  return (
    <Wrapper className={className} style={style}>
      <VideoWrapper>
        <Title />
        <Video ref={ref} ratio={ratio} />
      </VideoWrapper>

      <Explanation />

      <ButtonWrapper>
        <Button onClick={capture}>SCAN</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Camera;
