import { useContext, useEffect, useState } from 'react';
import Context from '../../contexts';
import { getActiveNotes, getArchivedNotes } from '../../utils/api';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import { Link, useLocation } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import SearchBar from '../../components/SearchBar';

function Notes( ) {
  const location = useLocation();
  const currentURL = location.pathname;

  const { locale, theme } = useContext(Context);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredData(filtered);
  };
  
  const getData = async() => {
    setLoading(true)
    try {
      let response = {}
      if (currentURL.includes('active')) {
        response = await getActiveNotes();
      } else {
        response = await getArchivedNotes();
      }

      if (!response.error) {
        setData(response.data)
        filteredData(response.data)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [currentURL])

  return (
    <>
      <div className='p-8 grid gap-4'>
        <h1 className='font-semibold text-3xl'>{ locale === 'id' ? `Catatan ${currentURL.includes('active') ? 'Aktif' : 'Arsip'} Anda` : `Your ${currentURL.includes('active') ? 'Active' : 'Archive'} Notes`}</h1>
        <SearchBar onSearch={handleSearch}/>
        <div className='p-4 flex flex-wrap md:justify-start justify-center gap-4'>
          {
            data.length === 0 
            ? <div>{locale === 'id' ? `Anda belum memiliki catatan ${currentURL.includes('active') ? 'aktif' : 'arsip'}` : `You don't have any ${currentURL.includes('active') ? 'actived' : 'archived'} records yet`}</div>
            : filteredData.slice(0, 4).map((value, index) => (
              <Card key={index} data={value} isActive={currentURL.includes('active')}/>
            ))
          }
        </div>
      </div>
      {currentURL.includes('active') && 
        <Link className='fixed right-3 bottom-3' to={"/notes/active/add"}>
          <button className={(theme === 'light' ? 'border-gray-900 hover:bg-gray-400' : 'border-gray-100 hover:bg-gray-600') + " md:w-14 md:h-14 w-10 h-10 border rounded-full flex justify-center items-center"}>
            <IoMdAdd className='md:w-9 md:h-9 w-6 h-6'/>
          </button>
        </Link>
      }
      {loading && <Loading/>}
    </>
  )
}

export default Notes