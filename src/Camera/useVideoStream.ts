import { useCallback, useLayoutEffect, useState } from "react"

type CaptureHandler = (canvas: HTMLCanvasElement) => void;

const mediaConstraints: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: 'environment',
    width: { ideal: 7680 },
    height: { ideal: 4320 }
  }
}

const threshold = (context: CanvasRenderingContext2D, t: number) => {
	const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  const thres = t * 255;

	for (let i = 0; i < imageData.data.length; i += 4) {
		const c = imageData.data[i + 1] < thres ? 255 : 0;
		imageData.data[i] = c
		imageData.data[i + 1] = c
		imageData.data[i + 2] = c
	}
	context.putImageData(imageData, 0, 0);
}

const useVideoStream = (ratio: number, onCapture?: CaptureHandler) => {
  const [element, setElement] = useState<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    if (element) {
      const handleStream = (stream: MediaStream) => {
        if (element) {
          element.srcObject = stream;
        }
      };

      navigator.mediaDevices.getUserMedia(mediaConstraints).then(handleStream)
    }
  }, [element]);

  const capture = useCallback(() => {
    if (!element) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = canvas.width / ratio;

    const mediaStream = element.srcObject as MediaStream;
    const { width: camWidth = 1, height: camHeight = 1 } = mediaStream.getTracks()[0].getSettings();
    
    let sourceX = 0;
    let sourceY = 0;
    let sourceW = camWidth;
    let sourceH = camHeight;
    const context = canvas.getContext('2d')!;

    if (camWidth / camHeight > ratio) {
      const captureWidth = camHeight * ratio;
      sourceX = (camWidth - captureWidth) / 2;
      sourceW = captureWidth;
    } else {
      const captureHeight = camWidth / ratio;
      sourceY = (camHeight - captureHeight) / 2;
      sourceH = captureHeight;
    }

    context.drawImage(
      element,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      0,
      0,
      canvas.width,
      canvas.height
    );

    threshold(context, 0.8)

    onCapture?.(canvas);
  }, [element, ratio, onCapture]);

  return [setElement, capture] as const;
}

export default useVideoStream;
