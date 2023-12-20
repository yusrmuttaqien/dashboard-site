import { useState } from 'react';
import { Input, Container, Box } from './styles';

export default function CheckboxInput(props) {
  const { id, onChange, label, disabled, className, checked = false, customClass = {} } = props;

  const _handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <Container htmlFor={`${id}-id`} className={className}>
      <Input
        disabled={disabled}
        type="checkbox"
        name={id}
        id={`${id}-id`}
        onChange={_handleChange}
        checked={checked}
      />
      <Box id="box" />
      <p className={customClass.label} title={label}>
        {label}
      </p>
    </Container>
  );
}
