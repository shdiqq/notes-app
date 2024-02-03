import Context from "../../../contexts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../../utils/api";
import Loading from "../../../components/Loading";
import { CSSTransition } from "react-transition-group";
import Success from "../../../components/Modal/Success";
import Error from "../../../components/Modal/Error";
import Input from "../../../components/Input";
import { Editor } from 'react-draft-wysiwyg'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function AddNotes() {
  const navigate = useNavigate();

  const { locale, theme } = useContext(Context);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    body: EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(`${locale === 'id' ? '<b><i>Buat catatan anda di sini...</i></b>' : '<b><i>Make your notes here...</i></b>'}`)
      )
    )
  });

  const onTitleChange = (event) => {
    setForm((data) => ({ ...data, title: event.target.value }))
  }

  const onEditorStateChange = (body) => {
    setForm((data) => ({ ...data, body }))
  }

  const onSubmitHandler = async(event) => {
    setIsLoading(true);
    event.preventDefault();

    const { title } = form
    const body = draftToHtml(convertToRaw(form.body.getCurrentContent()));

    try {
      const response = await addNote({ title: title, body: body })

      setIsLoading(false);

      if (!response.error) {
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
    navigate('/notes/active');
  }

  const closeModalErrorHandler = () => {
    setIsError(false)
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className='p-4 rounded-lg'>
          <form 
            className='border border-gray-700 rounded-lg flex flex-col gap-4 p-4'
            onSubmit={onSubmitHandler}
          >
            <h1 className=' text-2xl font-semibold'>
              {locale === 'id' ? 'Buat catatan Anda' : 'Take your notes'}
            </h1>
            <Input
              type="text"
              label="Title"
              isRequired={true}
              value={form.title}
              onChange={onTitleChange}
            />
            <div className=" border-2">
              <Editor
                editorState={form.body}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName={'editorClassName ' + ' p-4'}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <button className={(theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 focus:ring-slate-400': 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-800' ) + ' w-full focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'}>
              {locale === 'id' ? 'Buat Catatan Baru' : 'Create a New Note'}
            </button>
          </form>
        </div>
      </div>
      {
        isLoading ? <Loading/> : ''
      }
      <CSSTransition
        in={isSuccess}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Success message={locale === 'id' ? 'Berhasil Menambahkan Catatan' : 'Successfully Added The Note'} closeModal={closeModalSuccessHandler}/>
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
  )
}

export default AddNotes