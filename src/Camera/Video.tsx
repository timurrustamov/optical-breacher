import { forwardRef, ForwardRefRenderFunction } from 'react';

import styled from 'styled-components';

type VideoProps = {
  ratio: number;
}

const AspectRatioBox = styled.div<VideoProps>`
  position: relative;
  border: 1px dashed #cfed57;

  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: ${props => props.ratio * 100}%;
  }
  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 70%;
    width: 1px;
    height: 100%;
    border-left: 1px dashed #cfed57;
  }
`;

const AspectRatioVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Video: ForwardRefRenderFunction<HTMLVideoElement, VideoProps> = (props, ref) => {
  const { ratio } = props;

  return (
    <AspectRatioBox ratio={ratio}>
      <AspectRatioVideo ref={ref} autoPlay playsInline muted />
    </AspectRatioBox>
  );
}

export default forwardRef(Video);
