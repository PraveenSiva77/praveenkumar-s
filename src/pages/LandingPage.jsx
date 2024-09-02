import React from 'react'
import Home from '../sections/Home'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Services from '../sections/Services'
import Journey from '../sections/Journey'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Footer from '../components/Footer'


function LandingPage() {
  return (
        <>
          <Home/>
          <About/>
          <Skills/>
          <Services/>
          <Journey/>
          <Projects/>
          <Contact />
          <Footer/>
        </>

  )
}

export default LandingPage