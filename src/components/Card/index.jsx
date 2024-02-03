import PropTypes from "prop-types";
import { dateConvertion } from "../../utils/dateConvert";
import { useContext } from "react";
import Context from "../../contexts";
import { truncateBody } from "../../utils/truncateBody";
import { Link } from "react-router-dom";
import parser from 'html-react-parser'

function Card( { data, isActive } ) {
  const {locale, theme} = useContext(Context);

  return (
    <Link to={isActive ? `/notes/active/${data.id}` : `/notes/archive/${data.id}`} >
      <div className={(theme === 'light' ? 'border-gray-600 hover:bg-gray-200' : 'border-gray-400 hover:bg-gray-800') + " w-52 h-52 border rounded-xl p-3 grid content-between"}>
        <div className="grid gap-2">
          <h3 className="text-lg">{data.title}</h3>
          <div className="text-xs">{parser(truncateBody(data.body))}</div>
        </div>
        <div className="text-sm text-end">{dateConvertion(data.createdAt, locale)}</div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    owner: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    archived: PropTypes.bool
  }).isRequired,
  isActive: PropTypes.bool.isRequired
}

export default Card
