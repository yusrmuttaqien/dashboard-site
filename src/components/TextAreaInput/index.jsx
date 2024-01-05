import { useState, useEffect } from 'react';
import { TextArea } from './styles';

export default function TextAreaInput(props) {
  const { id, onChange, placeholder, className, value: v = '', reset, ...rest } = props;
  const [value, setValue] = useState(v);

  const _handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    setValue(v);
    onChange?.(v);
  }, [reset, v]);

  return (
    <TextArea
      className={className}
      name={`${id}-name`}
      id={id}
      placeholder={placeholder}
      onChange={_handleChange}
      value={value}
      {...rest}
    />
  );
}
