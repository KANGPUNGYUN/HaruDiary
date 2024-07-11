import Image from 'next/image';
import React, { useRef, useState } from 'react';

const MediaCapture: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCameraCapture = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  const handleGalleryAccess = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setCapturedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={handleCameraCapture}>카메라</button>
        <button onClick={handleGalleryAccess}>앨범</button>
      </div>
      {capturedImage && (
        <Image src={capturedImage} alt="Captured" style={{ width: '100%', marginTop: '20px' }} />
      )}
    </div>
  );
};

export default MediaCapture;