import { useCallback, useEffect, useRef, useState } from "react"

import styled from "styled-components";

import Camera from "./Camera";
import { Logger, OCR } from "./ocr";
import { Result } from "./result";
import { processMatrix, processTargets } from "./utils";

const defaultOcrProgress = { matrixProgress: 0, targetsProgress: 0, status: '' };
const defaultOcrResult: { matrix: string[][], targets: string[][], finished: boolean } =
  { matrix: [], targets: [], finished: false }

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export function App() {
  const OCRref = useRef<OCR>();
  const [ocrResult, setOcrResult] = useState(defaultOcrResult)
  const [ocrProgress, setOcrProgress] = useState(defaultOcrProgress);
  const [showCamera, setShowCamera] = useState(true);

  const logger: Logger = useCallback(({ name, status, progress = 0 }) => {
    if (status === 'recognizing text') {
      setOcrProgress(prev => ({
        status,
        matrixProgress: name === 'matrix' ? progress : prev.matrixProgress,
        targetsProgress: name === 'targets' ? progress : prev.targetsProgress
      }))
    }
  }, [])

  useEffect(() => {
    OCRref.current = new OCR(logger);
    return () => { OCRref.current?.terminate(); }
  }, [])

  return (
    <Wrapper>
      {showCamera ?
        <Camera
          ratio={9 / 16}
          onCapture={async (canvas) => {
            setShowCamera(false);
            const result = await OCRref.current!.recognize(canvas, canvas.width, canvas.height);
            const { lines: matrix, chars } = processMatrix(result.matrixData.text)
            const targets = processTargets(result.targetsData.text, chars)
            setOcrResult({ matrix, targets, finished: true })
          }}
        /> :
        ocrResult.finished ?
          <Result
            matrix={ocrResult.matrix}
            targets={ocrResult.targets}
            onStartOver={() => {
              setOcrProgress(defaultOcrProgress);
              setOcrResult(defaultOcrResult);
              setShowCamera(true);
            }}
          /> :
          <progress
            style={{ margin: 'auto' }}
            value={ocrProgress.status === 'recognizing text' ?
              (ocrProgress.matrixProgress + ocrProgress.targetsProgress) / 2 : 0}
          />
      }
    </Wrapper>
  )
}