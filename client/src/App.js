import Header from './components/Header/Header.jsx';
import MainSection from './components/MainSection/MainSection.jsx';
import SuperheroesList from './components/SuperheroesList/SuperheroesList.jsx';
import AddHero from './components/AddHero/AddHero.jsx';

import { useState } from "react";

function App() {

  const [updater, setUpdater] = useState(false);

  return (
    <div className="App">
      <Header />
      <MainSection />
      <SuperheroesList updater={updater} />
      <AddHero setUpdater={setUpdater} />
    </div>
  );
}

export default App;
