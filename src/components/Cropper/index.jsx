import { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '@/components/Button';
import { MODAL_START_CROPPING } from '@/constants/modal';
import { Modal } from './styles';
import 'react-image-crop/dist/ReactCrop.css';

const TO_RADIANS = Math.PI / 180;

export default function Cropper(props) {
  const { states, onCropped, config, src, aspect } = props;
  const [isCropping, setIsCropping] = states;
  const [cfg, setCfg] = useState(config);
  const canvas = useRef(null);
  const img = useRef(null);

  function _updateConfig(cropped) {
    setCfg(cropped);
  }
  async function _onSave() {
    const imgRef = img.current;
    const canvasRef = canvas.current;

    if (!imgRef || !canvasRef || !cfg) return;
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    const offscreen = new OffscreenCanvas(cfg.width * scaleX, cfg.height * scaleY);
    const ctx = offscreen.getContext('2d');

    if (!ctx) return;
    ctx.drawImage(
      canvasRef,
      0,
      0,
      canvasRef.width,
      canvasRef.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
      quality: 0.1,
    });
    const base64 = await _blobToBase64(blob);

    onCropped(base64);
    setIsCropping(false);
  }

  useEffect(() => {
    if (!isCropping) setCfg(null);
  }, [isCropping]);
  useEffect(() => {
    cfg?.width && cfg?.height && img && canvas && _setupCanvas(img.current, canvas.current, cfg);
  }, [cfg]);

  return (
    <Modal id={MODAL_START_CROPPING} isOpen={isCropping} onClose={() => setIsCropping(false)}>
      <ReactCrop aspect={aspect} className="cropper" crop={cfg} onChange={_updateConfig}>
        <img ref={img} alt="on-cropped-img" src={src} />
      </ReactCrop>
      <Button className="custom-button" onClick={_onSave} disabled={!cfg?.width}>
        Save
      </Button>
      <div className="canvas-container">
        <canvas
          ref={canvas}
          style={{
            width: cfg?.width,
            height: cfg?.height,
          }}
        />
      </div>
    </Modal>
  );
}

function _setupCanvas(imgRef, canvasRef, crop, scale = 1, rotate = 0) {
  const ctx = canvasRef.getContext('2d');

  if (!ctx) return;
  const scaleX = imgRef.naturalWidth / imgRef.width;
  const scaleY = imgRef.naturalHeight / imgRef.height;
  const pixelRatio = window.devicePixelRatio;

  canvasRef.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvasRef.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = imgRef.naturalWidth / 2;
  const centerY = imgRef.naturalHeight / 2;

  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    imgRef,
    0,
    0,
    imgRef.naturalWidth,
    imgRef.naturalHeight,
    0,
    0,
    imgRef.naturalWidth,
    imgRef.naturalHeight
  );
  ctx.restore();
}

function _blobToBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}
