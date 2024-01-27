import { useState, useEffect } from 'react';
import { TextArea } from './styles';

export default function TextAreaInput(props) {
  const { id, onChange, placeholder, className, value: v = '', reset, disabled, ...rest } = props;
  const [value, setValue] = useState(v);

  const _handleChange = (e) => {
    const isValid = e.target.validity.valid;

    setValue(e.target.value);
    if (value !== '' && isValid && !disabled) {
      onChange?.(e.target.value);
    }
  };

  useEffect(() => {
    setValue(v);
    onChange?.(v);
  }, [reset, v]);

  return (
    <TextArea
      className={className}
      disabled={disabled}
      name={`${id}-name`}
      id={id}
      placeholder={placeholder}
      onChange={_handleChange}
      value={value}
      {...rest}
    />
  );
}
