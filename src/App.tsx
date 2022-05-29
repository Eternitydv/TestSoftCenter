import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import { SideBar } from './components/SideBar/SideBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className='d-flex flex-column h-100'>
        <Row className="flex-grow-1 h-100">
          <Outlet/>
          <SideBar/>
        </Row>
      </div>
    </div>
  );
}

export default App;
