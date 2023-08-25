import React from "react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";

// Define an atom
const wordState = atom({
  key: "wordState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

// A component that reads and updates the atom
const WordChange = () => {
  const [word, setWord] = useRecoilState(wordState);

  const handleTextChange = (event: {
    target: { value: string | ((currVal: string) => string) };
  }) => {
    setWord(event.target.value);
  };

  return (
    <div>
      <div>
        <input value={word} onChange={handleTextChange} />

        <input />
      </div>
      <div>{word}</div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route path="home" element={<WordChange />} />
      <Route path="register" element={<div>Register</div>} />
      {/* ... etc. */}

      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  )
);

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;
