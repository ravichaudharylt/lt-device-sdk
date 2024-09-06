import { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";

const TestViewer = ({ iframeUrl, deviceInfo }) => {
  const [w, setW] = useState(null); // Calculated width
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    if(!deviceInfo) return;
    let adjustedDeviceRatio = deviceInfo.deviceHeight / deviceInfo.deviceWidth
    setHeight(600)
    setWidth(((600 / adjustedDeviceRatio) + 10))
  }, [deviceInfo])

  useEffect(() => {
    const calculatedW = ((width - 10) * deviceInfo?.deviceHeight) / height;
    setW(calculatedW);
  }, [height, width]);

  return (
    <div>
      <Form>
        <Form.Group controlId="heightInput">
          <Form.Label>Enter Height (h):</Form.Label>
          <Form.Control
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height (h)"
            required
          />
        </Form.Group>

        <Form.Group controlId="calculatedWeightInput" className="mt-3">
          <Form.Label>Enter Calculated Weight:</Form.Label>
          <Form.Control
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            required
          />
        </Form.Group>
      </Form>
      <div className="mt-5">
        {w !== null && (
          <Alert variant="success" className="mt-3">
            Calculated Width (w): {w.toFixed(2)}
          </Alert>
        )}
      </div>
      <div
        className="mt-5"
        style={{
          background: "#afc2fa",
          border: "1px solid black",
          // height: `${Number(height) + 2}px`,
        }}
      >
        <iframe
          id="testIframe"
          src={iframeUrl}
          width={`${width}px`}
          height={`${height}px`}
          title="Dynamic Iframe"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default TestViewer;
