import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import FileInput from '@/components/FileInput';
import Cropper from '@/components/Cropper';
import { Label, FieldWrapper } from '../../styles';

export default function ChangePicture() {
  const [isSaved, setIsSaved] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const { changePicture, user, chna } = useUser();

  const _handleChange = (v) => {
    changePicture(v);
    setIsSaved(true);
  };
  const _startCrop = async (files) => {
    const reader = await URL.createObjectURL(files[0]);
    setIsCropping({ msg: 'Cropping in progress...', file: reader, open: true });
  };

  useEffect(() => {
    if (!isSaved) return;

    const timeout = setTimeout(() => setIsSaved(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSaved]);

  useEffect(() => {
    if (!isCropping?.open) URL.revokeObjectURL(isCropping?.file);
  }, [isCropping]);

  return (
    <FieldWrapper>
      <Label htmlFor="user-picture" $save={isSaved}>
        Your Picture{' '}
        <p>
          file must be jpg/jpeg and max size is 100KB<span>✓</span>
        </p>
      </Label>
      <FileInput
        accept="image/jpeg, image/jpg"
        className="custom-file-input"
        disabled={isCropping.open}
        id="user-picture"
        maxFileSizeBytes={102400}
        onChange={_startCrop}
        placeholder={isCropping?.open ? isCropping?.msg : 'Click to browse or drop file here'}
      />
      <Cropper
        aspect={1}
        src={isCropping?.file}
        states={[isCropping.open, (open) => setIsCropping((prev) => ({ ...prev, open }))]}
        onCropped={_handleChange}
      />
    </FieldWrapper>
  );
}
