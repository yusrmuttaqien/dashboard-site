import { useState, useEffect } from 'react';
import { Input } from './styles';

export default function TextInput(props) {
  const { id, onEnter, placeholder, disabled, className, value: v = '', reset } = props;
  const [value, setValue] = useState(v);

  const _handleChange = (e) => {
    setValue(e.target.value);
  };
  const _handleEnter = (e) => {
    if ((e?.key === 'Enter' || e?.type === 'click') && value !== '') {
      onEnter(value);
    }
  };

  useEffect(() => {
    setValue(v);
  }, [reset]);

  return (
    <Input
      className={className}
      disabled={disabled}
      type="text"
      name={id}
      id={`${id}-id`}
      placeholder={placeholder}
      onKeyUp={_handleEnter}
      onChange={_handleChange}
      value={value}
    />
  );
}
