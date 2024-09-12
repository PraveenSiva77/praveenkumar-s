import React from 'react';
import './App.css'
import { Routes, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import TermsConditions from './pages/TermsConditions';
import About from './sections/About';
import Contact from './sections/Contact';
import Home from './sections/Home';
import Journey from './sections/Journey';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Skills from './sections/Skills';
import HireMe from './pages/HireMe';
import ProjectSingle from './pages/ProjectSingle';

function App() {
  return (

    <Routes >
      <Route path="/" element={<LandingPage />} />
      <Route path="/projects" element={<Projects />} /> 
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/hireme" element={<HireMe/>}/>
      <Route path="/projectinfo/:keyId" element={<ProjectSingle/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
