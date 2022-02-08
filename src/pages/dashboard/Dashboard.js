import "./dasboard.css";
import Book from "../book/Book";
import Category from "../category/Category";
import Author from "../author/Author";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="dashboard">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Book</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/author">Author</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route exact path="/" element={<Book />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/author" element={<Author />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Dashboard;
