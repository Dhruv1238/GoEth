import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="bottom-0 h-24 p-4 pt-6 border-t bg-white border-gray-200 flex flex-col-reverse bg-none pointer-events-auto">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto my-auto items-center font-medium justify-between">
          <Link to="/home">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
              <svg className="w-5 h-5 mb-2 text-gray-900   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span className="text-sm text-gray-900   ">Home</span>
            </button>
          </Link>
          <Link to="/rent">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Zm3.53 7.28a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06l6-6ZM8.625 9a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm5.625 3.375a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-900 mt-2  ">Rentals</span>
            </button>
          </Link>
          <Link to="/activity">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
              <svg className="w-5 h-5 mb-2 text-gray-900   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
              </svg>
              <span className="text-sm text-gray-900   ">Activity</span>
            </button>
          </Link>
          <Link to="/profile">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
              <img className="w-8 h-8 mb-0 rounded-full text-gray-900   " src={user.photoURL} alt="" />
              <span className="text-sm text-gray-900   ">Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar;
