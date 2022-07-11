import React, { Component } from "react";
import Users from "./User";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


class Home extends Component {
  render() {
    return (
      <div>
        
          <Routes>
            <Route exact path="/"element={<Users />}></Route>
          </Routes>
        
      </div>
    );
  }
}
export default Home;
