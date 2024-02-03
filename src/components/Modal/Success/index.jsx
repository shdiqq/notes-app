import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../../../contexts';

function Success ({ message, closeModal }) {
  const { theme } = useContext(Context);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto backdrop-blur-md">
      <div className="flex items-center justify-center min-h-screen text-center sm:block">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          className={(theme === 'light' ? 'bg-gray-50' : ' bg-gray-800') + " inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-xl w-11/12"}
          role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="green" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 52 52"
                xmlSpace="preserve">
                <g>
                  <path
                    d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" />
                  <path fill="green"
                    d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406   l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411   C39.251,14.885,38.62,14.922,38.252,15.336z" />
                </g>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium" id="modal-headline">
                Success
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
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Success.propTypes = {
  message: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Success