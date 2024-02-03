import PropTypes from "prop-types";
import Context from "../../contexts";
import { useContext } from "react";

function Input({ type, label, isRequired, value, onChange }) {
  const { theme } = useContext(Context);
  return (
    <div className={(theme === 'light' ? ' bg-gray-100' : ' bg-gray-900') + " rounded-lg relative w-full"}>
      <input
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="peer bg-inherit h-10 w-full rounded-lg placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
        placeholder={label}
        required={isRequired}
      />
      <label
        htmlFor={label}
        className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
        {label}
      </label>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
