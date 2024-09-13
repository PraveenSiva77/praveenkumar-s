import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

function Contact() {

  return (

      <div id='contact' className='max-w-[1024px] pt-28 pb-0 mdx:py-24 lgx:py-4 smx:py-24 xsx:py-4 mdx:h-auto mx-auto'>
        {/* Page Title */}
        <PageTitle title="Get in Touch" description="Contact Me" />

        {/* Page Content */}
        <div className='w-full mx-auto flex items-center justify-center p-12 mb-24'>
          
          <form class="max-w-sm mx-auto w-full flex flex-col items-center gap-2">
            <div class="mb-5 w-full">
              <input type="text" id="text" class="shadow-sm bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Praveen Siva' required />
            </div>

            <div class="mb-5 w-full">
              <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="example@gmail.com" required />
            </div>
            
            <div class="max-w-sm w-full mx-auto">
              <textarea id="message" rows="4" class="block max-h-48 min-h-28 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Project..."></textarea>
            </div>
            
            <div class="flex items-start my-5">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link to="/termsandconditions" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
            </div>
            <button type="submit" class="text-white w-[50%] smx:w-[70%] bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
          </form>

        </div>
      </div>

  )
}

export default Contact