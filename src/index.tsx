import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CardsPage } from './pages/Cards';
import { ReceiptsPage } from './pages/Receipts/ReceiptsPage';
import { TransactionsPage } from './pages/Transactions/TransactionsPage';
import App from './App';

import './index.css';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route
        path="/"
        element={<App/>}
        >
          <Route index element ={<CardsPage/>}/>
          <Route
          path="cards"
          element={<CardsPage/>}
          />
          <Route
          path="transactions/:cardId"
          element={<TransactionsPage/>}
          />
          <Route
          path="transactions"
          element={<TransactionsPage/>}
          />
          <Route
          path="receipts"
          element={<ReceiptsPage/>}
          />
          <Route
          path="receipts/:cardId"
          element={<ReceiptsPage/>}
          />
        </Route>
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(
//   document.getElementById("root")
// );
// root.render(
//   <BrowserRouter>
//     <Routes>
//         <Route
//         path="/"
//         element={<NavBar/>}
//         >
//           <Route index element ={<CardsPage/>}/>
//           <Route
//           path="cards"
//           element={<CardsPage/>}
//           />
//           <Route
//           path="transactions/:card"
//           element ={<TransactionsPage/>}
//           />
//         </Route>
//       </Routes>
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
