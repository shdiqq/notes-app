import { useContext } from "react";
import Context from "../../contexts";
import { BsArrowLeft } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
  
function NotFoundPage() {
  const navigate = useNavigate();
  const {locale, theme} = useContext(Context)

  return (
    <div className="container flex items-center mt-[-80px] min-h-screen">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <div className="p-3 text-sm font-medium text-blue-500 rounded-full">
          <MdErrorOutline size={36}/>
        </div>
        <h1 className={(theme === 'light' ? 'text-gray-800' : 'text-white') + " mt-3 text-2xl font-semibold md:text-3xl"}>
          {locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}
        </h1>
        <div className={(theme === 'light' ? 'text-gray-500' : 'text-gray-400') + " mt-4"}>
          {locale === 'id' ? 'Halaman yang Anda cari tidak ada. Berikut ini beberapa tautan bermanfaat:' : 'The page you are looking for doesn`t exist. Here are some helpful links:'}
        </div>

        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <button 
            className={(theme === 'light' ? 'hover:bg-gray-300 text-gray-700' : 'hover:bg-gray-700 text-gray-200 border-gray-700') + " flex items-center justify-center w-1/2 px-5 py-2 text-sm transition-colors duration-200 border rounded-lg gap-x-2 sm:w-auto"}
            onClick={() => navigate(-1)}
          >
            <BsArrowLeft size={20} />
            <span>{locale === 'id' ? 'Kembali' : 'Go back'}</span>
          </button>

          <Link 
            to="/notes-app/" 
            className={(theme === 'light' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500') + " w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 rounded-lg shrink-0 sm:w-auto"}>
            {locale === 'id' ? 'Bawa ke dasbor' : 'Take to dashboard'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;