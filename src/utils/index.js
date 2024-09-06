export const getTestIframeUrl = ({
  deviceName,
  osVersion,
  deviceType,
  appUrl,
}) => {
  const sessionToken = localStorage.getItem("sessionToken");
  let url =
    "https://embed.lambdatest.com?sessionToken=" +
    sessionToken +
    "&device=" +
    deviceName +
    "&osVersion=" +
    osVersion +
    "&deviceType=" +
    deviceType +
    "&appUrl=" +
    appUrl +
    "&appLaunchParams=" +
    encodeURIComponent(
      JSON.stringify({
        AmsClientID: "10343091",
        AmsClientSecret: "oH9z2ABNU8CBYieHjk1LhR5T3ugH1wuZpGveDzok",
        AMSEnvironment: "live",
      })
    );

  return url;
};
