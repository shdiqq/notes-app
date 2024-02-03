import PropTypes from 'prop-types';
import Context from '../../../contexts';
import { useContext } from 'react';

function Error ({ message, closeModal }) {
  const { theme } = useContext(Context);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto backdrop-blur-md">
      <div className="flex items-center justify-center min-h-screen text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          className={(theme === 'light' ? 'bg-gray-50' : ' bg-gray-800') + " inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-xl w-11/12"}
          role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div className="bg-red-100 mx-auto flex items-center justify-center h-12 w-12 rounded-full">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className={"text-lg leading-6 font-medium"} id="modal-headline">
                Error
              </h3>
              <div className="mt-2">
                <p className="text-sm">
                  { message }
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Error