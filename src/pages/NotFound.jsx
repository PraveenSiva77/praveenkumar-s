import { Link } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"

export default function NotFound() {
    return (
        <div className="h-[100vh] dark:bg-background-dark">
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
            <p className="text-7xl font-semibold text-primary-light">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-background-dark dark:text-text-dark sm:text-5xl">
            Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-text-light">
            Sorry, we couldn’t find the <span className='font-semibold'> page </span>you’re looking for.
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
    )
  }
  