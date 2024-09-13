import React from 'react'
import Home from '../sections/Home'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Services from '../sections/Services'
import Journey from '../sections/Journey'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'


function LandingPage() {
  return (
        <>
          <Helmet>
            <link rel="canonical" href="https://PraveenSiva77.github.io/praveenkumar-s/" />
            <title>Praveenkumar S | AI & Web Developer Portfolio</title>
            <meta name="description" content="Explore the portfolio of Praveenkumar S, an AI and Web Developer passionate about solving complex problems using technology." />
            <meta property="og:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
            <meta property="og:description" content="Explore projects and learn more about Praveenkumar S, an expert in AI and Web Development." />
            <meta property="og:url" content="https://PraveenSiva77.github.io/praveenkumar-s/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="%PUBLIC_URL%/Praveenkumar-S-Profile.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
            <meta name="twitter:description" content="Explore AI, Machine Learning, and Web Development projects from Praveenkumar S." />
            <meta name="twitter:image" content="%PUBLIC_URL%/Praveenkumar-S-Profile.jpg" />
            <meta name="keywords" content="AI Developer, Web Developer, Praveenkumar S, Machine Learning, Portfolio" />
            <meta name="author" content="Praveenkumar S" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Helmet>

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