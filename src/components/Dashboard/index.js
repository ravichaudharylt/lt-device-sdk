import { useEffect, useState } from "react";
import { getDeviceList } from "../../lib/api";
import DeviceSelector from "../DeviceSelector";

const DEVICE_TYPE = {
  SIMULATOR: "simulator",
  EMULATOR: "emulator",
};

const Dashboard = () => {
  const [simulatorDevices, setSimulatorDevices] = useState("");
  const [emulatorDevices, setEmulatorDevices] = useState("");

  useEffect(() => {
    getListOfDevices(DEVICE_TYPE.SIMULATOR);
    getListOfDevices(DEVICE_TYPE.EMULATOR);
  }, []);

  const getListOfDevices = (deviceType) => {
    let params = {
      deviceType,
    };
    getDeviceList(params)
      .then((res) => {
        if (deviceType === DEVICE_TYPE.SIMULATOR) {
          setSimulatorDevices(res?.data?.data);
        } else {
          setEmulatorDevices(res?.data?.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="p-5">
      {simulatorDevices && emulatorDevices && (
        <DeviceSelector
          data={{
            [DEVICE_TYPE.SIMULATOR]: simulatorDevices,
            [DEVICE_TYPE.EMULATOR]: emulatorDevices,
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
