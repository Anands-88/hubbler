import React from "react"
import './App.css';
import { EditRules } from './Components/editRules';
import { Header } from './Components/Header';
import { AddRules } from './Components/Left_rules';

function App() {
  return (
    <div className="App">
     <Header></Header>
     <div className="rulesPage">
      <AddRules></AddRules>
      <EditRules></EditRules>
     </div>
    </div>
  );
}

export default App;
