import Login from "./components/Login";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
