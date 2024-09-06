import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { generateAuthToken } from "./lib/api";
import Dashboard from "./components/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAuthToken();
  }, []);

  const getAuthToken = () => {
    generateAuthToken()
      .then((res) => {
        localStorage.setItem("sessionToken", res?.data?.testSessionToken);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              width="200px"
              height="200px"
              className="App-logo"
              alt="logo"
            />
          </div>
        ) : (
          <Dashboard />
        )}
      </header>
    </div>
  );
}

export default App;
