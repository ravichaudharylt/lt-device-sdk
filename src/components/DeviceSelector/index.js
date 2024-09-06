import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import { Alert, Form } from "react-bootstrap";
import TestViewer from "../TestViewer";
import { getTestIframeUrl } from "../../utils";
import { generateAuthToken } from "../../lib/api";

const DeviceSelector = ({ data }) => {
  const [appUrl, setAppUrl] = useState(""); // appUrl input
  const [deviceType, setDeviceType] = useState(null); // Selected device type (emulator/simulator)
  const [selectedOS, setSelectedOS] = useState(null); // Selected OS version
  const [selectedDevice, setSelectedDevice] = useState(null); // Selected device
  const [deviceInfo, setDeviceInfo] = useState(null); // Device info to display
  const [iframeUrl, setIframeUrl] = useState("");

  // Load appUrl from localStorage on component mount
  useEffect(() => {
    const storedAppUrl = localStorage.getItem("appUrl");
    if (storedAppUrl) {
      setAppUrl(storedAppUrl);
    }
  }, []);

  useEffect(() => {
    if (!deviceType || !selectedOS || !selectedDevice || !deviceInfo) {
      setIframeUrl(null);
      return;
    } else {
      generateAuthToken()
        .then((res) => {
          localStorage.setItem("sessionToken", res?.data?.testSessionToken);
        })
        .catch((err) => {})
        .finally(() => {
          setUrl();
        });
    }
  }, [deviceType, selectedOS, selectedDevice, deviceInfo]);

  // Store appUrl in localStorage whenever it changes
  const handleAppUrlChange = (e) => {
    const newAppUrl = e.target.value;
    setAppUrl(newAppUrl);
    localStorage.setItem("appUrl", newAppUrl);
  };

  const handleDeviceType = (device) => {
    setDeviceType(device);
    setSelectedOS(null);
    setSelectedDevice(null); // Reset device selection when OS changes
    setDeviceInfo(null); // Clear device info when OS changes
  };

  // Options for OS versions dropdown
  const osOptions = deviceType
    ? Object.keys(data[deviceType.value]).map((osVersion) => ({
        value: osVersion,
        label: `OS Version ${osVersion}`,
      }))
    : [];

  // Options for device type dropdown
  const deviceTypeOptions = [
    { value: "emulator", label: "Emulator" },
    { value: "simulator", label: "Simulator" },
  ];

  // Handle OS version selection
  const handleOSChange = (selectedOption) => {
    setSelectedOS(selectedOption);
    setSelectedDevice(null); // Reset device selection when OS changes
    setDeviceInfo(null); // Clear device info when OS changes
  };

  // Handle device selection and show device details
  const handleDeviceChange = (selectedOption) => {
    setSelectedDevice(selectedOption);
    const selectedDeviceInfo = data[deviceType.value][selectedOS.value].find(
      (device) => device.deviceName === selectedOption.value
    );
    setDeviceInfo(selectedDeviceInfo);
  };

  const setUrl = () => {
    let deviceConfig = {
      deviceName: selectedDevice?.value,
      osVersion: selectedOS?.value,
      deviceType: deviceType?.value,
      appUrl: appUrl,
    };
    let url = getTestIframeUrl(deviceConfig);
    setIframeUrl(url);
  };

  return (
    <Fragment>
      <div className="d-flex">
        <div className="w-50 container">
          <h2>Device Selector</h2>
          {/* App URL Input */}
          <Form.Group controlId="appUrlInput" className="mb-3">
            <Form.Label>Enter App URL:</Form.Label>
            <Form.Control
              type="text"
              value={appUrl}
              onChange={handleAppUrlChange}
              placeholder="Enter the app URL"
            />
          </Form.Group>

          {/* Device Type Selector */}
          <div className="mb-3">
            <label>Select Device Type:</label>
            <Select
              options={deviceTypeOptions}
              value={deviceType}
              onChange={handleDeviceType}
              placeholder="-- Select Device Type --"
            />
          </div>

          {/* OS Version Selector */}
          {deviceType && (
            <div className="mb-3">
              <label>Select OS Version:</label>
              <Select
                options={osOptions}
                value={selectedOS}
                onChange={handleOSChange}
                placeholder="-- Select OS Version --"
              />
            </div>
          )}

          {/* Device Selector */}
          {selectedOS && (
            <div className="mb-3">
              <label>Select Device:</label>
              <Select
                options={data[deviceType.value][selectedOS.value].map(
                  (device) => ({
                    value: device.deviceName,
                    label: device.deviceName,
                  })
                )}
                value={selectedDevice}
                onChange={handleDeviceChange}
                placeholder="-- Select Device --"
              />
            </div>
          )}

          {/* Display Device Info */}
          {deviceInfo && (
            <Alert variant="info" className="mt-3">
              <h4>Device Information:</h4>
              <p>
                <strong>Device Name:</strong> {deviceInfo.deviceName}
              </p>
              <p>
                <strong>Height:</strong> {deviceInfo.deviceHeight}px
              </p>
              <p>
                <strong>Width:</strong> {deviceInfo.deviceWidth}px
              </p>
            </Alert>
          )}
        </div>
      </div>
      {/* <div className="w-50"> */}
      {iframeUrl && (
        <TestViewer
          deviceInfo={deviceInfo}
          deviceHeight={deviceInfo?.deviceHeight}
          iframeUrl={iframeUrl}
        />
      )}
      {/* </div> */}
    </Fragment>
  );
};

export default DeviceSelector;
