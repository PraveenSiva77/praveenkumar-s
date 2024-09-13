import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { Helmet } from 'react-helmet'

function ProjectsInfo() {
  return (
    <>
    <Helmet>
          <link rel="canonical" href="https://PraveenSiva77.github.io/praveenkumar-s/projectsinfo" />
          <title>My Projects | Praveenkumar S | AI & Web Developer Portfolio</title>
          <meta name="description" content="Explore the portfolio of Praveenkumar S, an AI and Web Developer passionate about solving complex problems using technology." />
          <meta property="og:title" content="Praveenkumar S | AI & Web Developer Portfolio" />
          <meta property="og:description" content="Explore projects and learn more about Praveenkumar S, an expert in AI and Web Development." />
          <meta property="og:url" content="https://PraveenSiva77.github.io/praveenkumar-s/projectsinfo" />
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
    
      <div className="h-[100vh] dark:bg-background-dark">
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-7xl font-semibold text-primary-light">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-background-dark dark:text-text-dark sm:text-5xl">
            Oops! This page is currently under construction
            </h1>
            <p className="mt-6 text-base leading-7 text-text-light">
              Sorry, I am currently working on the <span className='font-semibold'>Projects Page</span> for this website.
            </p>
            <div className="mt-10 flex mdx:flex-col mdx:gap-6 items-center justify-center gap-x-6">
                <Link 
                  to="/"
                  className="rounded-md bg-primary-light px-3.5 py-2.5 text-sm font-semibold text-text-dark shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </Link>
            </div>
          </div>
        </main>

        <ThemeToggle/>
      </div>
    </>
  )
}

export default ProjectsInfo