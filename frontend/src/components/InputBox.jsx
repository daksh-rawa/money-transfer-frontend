const InputBox = ({ label, type, name, value, onChange, ...rest }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium" htmlFor={name}>
      {label}
    </label>
    <input
      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete="off"
      {...rest}
    />
  </div>
);

export default InputBox;
