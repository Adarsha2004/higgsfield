import { BrowserRouter, Route, Routes } from "react-router";
import Appbar from "./components/Appbar";
import "./index.css";
import Landing from "./pages/Landing";
import { Signin } from "./pages/Signin";
import Signup from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <>

      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="dashbard" />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
