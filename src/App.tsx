import { Route, Routes } from 'react-router-dom';

import CatDetails from './components/CatDetails/CatDetails.component';
import Cats from './components/Cats/Cats.component';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Cats />} />
        <Route path="cat/:id" element={<CatDetails />} />
      </Routes>
  );
}