import { useContext, useEffect, useState } from "react";
import parser from 'html-react-parser'
import Loading from "../../../components/Loading";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../../../utils/api";
import Context from "../../../contexts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dateConvertion } from "../../../utils/dateConvert";
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { HiOutlineTrash } from 'react-icons/hi';
import { CSSTransition } from "react-transition-group";
import Success from "../../../components/Modal/Success";
import Error from "../../../components/Modal/Error";

function DetailNotes() {
  const navigate = useNavigate()
  const location = useLocation();
  const currentURL = location.pathname;

  const { id } = useParams()

  const { locale, theme } = useContext(Context);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const getData = async() => {
    setLoading(true)
    try {
      const response = await getNote(id);

      if (!response.error) {
        setData(response.data)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  const moveArchiveHandler = async() => {
    setLoading(true);
    try {
      const response = await archiveNote(id)

      setLoading(false);

      if (!response.error) {
        setMessage(`${locale === 'id' ? 'Berhasil Mengarsipkan Catatan' : 'Successfully Archived The Note'}`)
        setIsSuccess(true);
      } else {
        setMessage(response.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage(error);
      setIsError(true);
    }
  }

  const moveUnarchiveHandler = async() => {
    setLoading(true);
    try {
      const response = await unarchiveNote(id)

      setLoading(false);

      if (!response.error) {
        setMessage(`${locale === 'id' ? 'Berhasil Membatalkan Pengarsipan Catatan' : 'Successfully Unarchived The Note'}`)
        setIsSuccess(true);
      } else {
        setMessage(response.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage(error);
      setIsError(true);
    }
  }

  const deleteHandler = async() => {
    setLoading(true);
    try {
      const response = await deleteNote(id)

      setLoading(false);

      if (!response.error) {
        setMessage(`${locale === 'id' ? 'Berhasil Menghapus Catatan' : 'Successfully Deleted The Note'}`)
        setIsSuccess(true);
      } else {
        setMessage(response.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage(error);
      setIsError(true);
    }
  }

  const closeModalSuccessHandler = () => {
    setIsSuccess(false)
    if (currentURL.includes('archive')) {
      navigate('/notes-app/notes/archive');
    } else {
      navigate('/notes-app/notes/active');
    }
  }

  const closeModalErrorHandler = () => {
    setIsError(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    loading 
    ? 
      <Loading/>
    :
    <>
      <div className="grid gap-4 p-4">
        <div className="grid gap-1">
          <h3 className="font-bold md:text-7xl text-5xl">{data.title}</h3>
          <div className="font-light md:text-base text-sm">
            {dateConvertion(data.createdAt, locale)}
          </div>
        </div>
        <div className="font-normal md:text-lg text-base">{parser(data.body)}</div>
      </div>
      <div className="fixed right-3 bottom-3 flex gap-4">
        {currentURL.includes('archive') 
        ? 
        <button onClick={moveUnarchiveHandler} className={(theme === 'light' ? 'border-gray-900 hover:bg-gray-400' : 'border-gray-100 hover:bg-gray-600') + " md:w-14 md:h-14 w-10 h-10 border rounded-full flex justify-center items-center"}>
          <BiArchiveOut className='md:w-7 md:h-7 w-5 h-5'/>
        </button>
        : 
        <button onClick={moveArchiveHandler} className={(theme === 'light' ? 'border-gray-900 hover:bg-gray-400' : 'border-gray-100 hover:bg-gray-600') + " md:w-14 md:h-14 w-10 h-10 border rounded-full flex justify-center items-center"}>
          <BiArchiveIn className='md:w-7 md:h-7 w-5 h-5'/>
        </button>}
        <button onClick={deleteHandler} className={(theme === 'light' ? 'border-gray-900 hover:bg-gray-400' : 'border-gray-100 hover:bg-gray-600') + " md:w-14 md:h-14 w-10 h-10 border rounded-full flex justify-center items-center"}>
          <HiOutlineTrash className='md:w-7 md:h-7 w-5 h-5'/>
        </button>
      </div>
      <CSSTransition
        in={isSuccess}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Success message={message} closeModal={closeModalSuccessHandler}/>
      </CSSTransition>
      <CSSTransition
        in={isError}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Error message={message.toUpperCase()} closeModal={closeModalErrorHandler}/>
      </CSSTransition>
    </>
  );
}

export default DetailNotes;
