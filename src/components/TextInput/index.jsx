import { useState, useEffect } from 'react';
import { Input } from './styles';

export default function TextInput(props) {
  const {
    id,
    onEnter,
    placeholder,
    disabled,
    className,
    value: v = '',
    reset,
    type = 'text',
    onChange,
    ...rest
  } = props;
  const [value, setValue] = useState(v);

  const _handleChange = (e) => {
    const isValid = e.target.validity.valid;

    setValue(e.target.value);
    if (value !== '' && isValid && !disabled) {
      onChange?.(e.target.value);
    }
  };
  const _handleEnter = (e) => {
    const isValid = e.target.validity.valid;
    if ((e?.key === 'Enter' || e?.type === 'click') && value !== '' && isValid && !disabled) {
      onEnter?.(value);
    }
  };

  useEffect(() => {
    setValue(v);
  }, [reset, v]);

  return (
    <Input
      {...rest}
      className={className}
      disabled={disabled}
      type={type}
      name={`${id}-name`}
      id={id}
      placeholder={placeholder}
      onKeyUp={_handleEnter}
      onChange={_handleChange}
      value={value || ''}
    />
  );
}
