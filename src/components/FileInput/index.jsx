import { useRef, useState, useEffect } from 'react';
import { Container } from './styles';

export default function FileInput(props) {
  const {
    className,
    placeholder,
    inputProps = {},
    id,
    accept,
    error,
    disabled,
    onChange,
    maxFileSizeBytes,
  } = props;
  const [isHover, setIsHover] = useState(false);
  const [isError, setIsError] = useState(error || false);
  const [value, setValue] = useState('');
  const container = useRef(null);
  const dynamicProps = {
    'data-state': isError ? 'file-mismatch' : null,
    'data-disabled': disabled,
  };

  function _handleFile(files) {
    if (disabled) return;

    function _typeCheck(file) {
      const types = accept.split(', ');

      return types.includes(file.type);
    }
    function _sizeCheck(file) {
      return file.size <= maxFileSizeBytes;
    }
    function _withMultiCheck(files, checker) {
      let isValid = true;

      if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          if (!checker(files[i])) {
            isValid = false;
            break;
          }
        }
      } else if (!checker(files[0])) {
        isValid = false;
      }

      return isValid;
    }

    if (!_withMultiCheck(files, _typeCheck)) {
      return setIsError(`File type is not valid, please use ${accept}`);
    }
    if (!_withMultiCheck(files, _sizeCheck)) {
      return setIsError(
        `File size is too big, file size must be less than ${Math.round(maxFileSizeBytes / 1024)}KB`
      );
    }

    onChange(files);
  }
  function _handleHint(isHover) {
    return (e) => {
      e.preventDefault();

      if (disabled) return;
      if (isHover) {
        container.current.setAttribute('data-state', 'file-hover');
        setIsHover(true);
      } else {
        container.current.removeAttribute('data-state');
        setIsHover(false);
      }
    };
  }

  useEffect(() => {
    if (!isError) return;

    const timeout = setTimeout(() => setIsError(false), 5000);

    return () => clearTimeout(timeout);
  }, [isError]);

  return (
    <Container className={className} ref={container} {...dynamicProps}>
      <input
        accept={accept}
        disabled={disabled}
        id={id}
        name={`${id}-name`}
        onDragEnter={_handleHint(true)}
        onDragLeave={_handleHint()}
        onDrop={(e) => {
          _handleHint()(e);
          _handleFile(e.dataTransfer.files);
        }}
        onChange={(e) => {
          _handleFile(e.target.files);
        }}
        title={disabled ? 'Field is disabled' : isError || placeholder}
        type="file"
        value={value}
      />
      <p>{isHover ? 'You can let go the mouse now' : isError || placeholder}</p>
    </Container>
  );
}
