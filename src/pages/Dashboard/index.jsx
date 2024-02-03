import { useContext, useEffect, useState } from 'react';
import Context from '../../contexts';
import PropTypes from 'prop-types'
import Card from '../../components/Card';
import { getActiveNotes, getArchivedNotes } from '../../utils/api';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

function DashboardPage({ userData }) {

  const { locale, theme } = useContext(Context);
  const [dataActive, setDataActive] = useState([]);
  const [dataArchive, setDataArchive] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getData = async() => {
    setLoading(true)
    try {      
      const responseActive = await getActiveNotes();
      const responseArchive = await getArchivedNotes();

      if (!responseActive.error || !responseArchive.error) {
        setDataActive(responseActive.data)
        setDataArchive(responseArchive.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='p-8 grid gap-4'>
        <h1 className='font-semibold text-3xl'>{ locale === 'id' ? `Halo, Selamat Datang kembali ${userData.name}!` : `Hello, Welcome back ${userData.name}!`}</h1>
        <div className='grid gap-8'>
          <div className='grid'>
            <div className='flex justify-between items-center'>
              <h2 className='font-medium text-xl'>{locale === 'id' ? `Catatan Aktif Anda` : `Your Active Notes`}</h2>
              <Link to={'/notes-app/notes/active'}>
                <button className={(theme === 'light' ? 'border-gray-600 hover:bg-gray-300' : 'border-gray-400 hover:bg-gray-700') + " border font-medium rounded-lg md:text-base text-sm px-5 py-2.5"}>
                  {locale === 'id' ? 'Lihat Semua' : 'See All'}
                </button>
              </Link>
            </div>
            <div className='p-4 flex flex-wrap md:justify-start justify-center gap-4'>
              {
                dataActive.length === 0 
                ? <div>{locale === 'id' ? 'Anda belum memiliki catatan aktif' : 'You don`t have any actived records yet'}</div>
                : dataActive.slice(0, 4).map((value, index) => (
                  <Card key={index} data={value} isActive={true}/>
                ))
              }
            </div>
          </div>
          <div className='grid'>
            <div className='flex justify-between items-center'>
              <h2 className='font-medium text-xl'>{locale === 'id' ? `Catatan Arsip Anda` : `Your Archive Notes`}</h2>
              <Link to={'/notes-app/notes/archive'}>
                <button className={(theme === 'light' ? 'border-gray-600 hover:bg-gray-300' : 'border-gray-400 hover:bg-gray-700') + " border font-medium rounded-lg md:text-base text-sm px-5 py-2.5"}>
                  {locale === 'id' ? 'Lihat Semua' : 'See All'}
                </button>
              </Link>
            </div>
            <div className='p-4 flex flex-wrap md:justify-start justify-center gap-4'>
              {
                dataArchive.length === 0 
                ? <div>{locale === 'id' ? 'Anda belum memiliki catatan arsip' : 'You don`t have any archived records yet'}</div>
                : dataArchive.slice(0, 4).map((value, index) => (
                  <Card key={index} data={value} isActive={true}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading/>}
    </>
  )
}

DashboardPage.propTypes = {
  userData: PropTypes.object.isRequired,
}

export default DashboardPage;