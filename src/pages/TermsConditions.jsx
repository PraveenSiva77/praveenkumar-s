import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function TermsConditions() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="dark:bg-background-dark bg-background-light flex flex-col items-center justify-center px-6 py-8 sm:py-4 lg:px-8">

      <div className="w-4/6 mdx:w-full flex flex-col gap-4">
        <h1 className="sticky top-0 bg-background-light dark:bg-background-dark py-2 mt-4 text-3xl font-bold text-center tracking-tight text-primary-light dark:text-text-dark sm:text-5xl">
          Terms and Conditions
          </h1>

        <p className="my-6 dark:text-text-dark">
        Welcome to the portfolio website of <strong className="text-background-dark dark:text-secondary-dark">Praveenkumar S</strong>. By accessing and using this website, you agree to comply with the following terms and conditions. If you do not agree with any part of these terms, please do not use this website.
        </p>

        <ul className="flex flex-col gap-6">
          <li>
            <strong className="text-background-dark dark:text-secondary-dark">1. Intellectual Property</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
              All content on this website, including text, images, graphics, and code, is the intellectual property of <strong className="text-background-dark dark:text-secondary-dark">Praveenkumar S</strong> unless otherwise stated. Unauthorized use, reproduction, or distribution of this material is prohibited without explicit permission.
            </p>
          </li>

          <li>
            <strong className="text-background-dark dark:text-secondary-dark">2. Use of Website</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
              You are granted a limited, non-exclusive right to use the website for personal, non-commercial purposes. You may not use this website to:

              <ol>
                <li className="list-disc ml-12">Copy, modify, or distribute any content without prior consent.</li>
                <li className="list-disc ml-12">Misuse contact information for spam or unsolicited communication.</li>
                <li className="list-disc ml-12">Engage in any unlawful or harmful activity that impacts the website's performance or security.</li>
              </ol>
            </p>
          </li>

          <li>
            <strong className="text-background-dark dark:text-secondary-dark">3. Limitation of Liability</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
              The content provided on this website is for informational purposes only. While every effort is made to ensure accuracy, <strong className="text-background-dark dark:text-secondary-dark">Praveenkumar S</strong> makes no guarantees or warranties of any kind regarding the completeness, reliability, or suitability of the information on the site. You agree that use of this website is at your own risk.
            </p>
          </li>

          <li>
            <strong className="text-background-dark dark:text-secondary-dark">4. External Links</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
            This website may contain links to external websites. <strong className="text-background-dark dark:text-secondary-dark">Praveenkumar S</strong> is not responsible for the content or practices of any linked websites and does not endorse the content of these external sites.
            </p>
          </li>

          <li>
            <strong className="text-background-dark dark:text-secondary-dark">5. Updates to Terms</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
            These terms and conditions are subject to change at any time. It is your responsibility to review the terms periodically for any updates.
            </p>
          </li>

          <li>
            <strong className="text-background-dark dark:text-secondary-dark">6. Governing Law</strong>
            <p className="ml-4 mt-2 dark:text-text-dark">
            These terms and conditions are governed by the laws of India, and any disputes arising will be subject to the jurisdiction of Indian courts.
            </p>
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="font-semibold dark:text-text-dark">If you have any questions about these Terms and Conditions, please contact me.</h3>

          <p className="mt-4 dark:text-text-dark">
            Looking to collaborate or have any inquiries? Feel free to reach out! I'm always open to discussing new projects, creative ideas, or opportunities to contribute to your vision.
          </p>
        </div>

        <p className="text-xl font-bold text-center mt-12 tracking-wider text-primary-light">
          Thank you for visiting My Portfolio!
        </p>       
      </div>

      <div className="mt-10 flex mdx:flex-col mdx:gap-6 items-center justify-center gap-x-6 mb-8">
        <Link 
          to="/"
          className="rounded-md bg-primary-light px-3.5 py-2.5 text-sm font-semibold text-text-dark shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
      </div>

      <ThemeToggle/>
    </div>
  );
}

export default TermsConditions;
