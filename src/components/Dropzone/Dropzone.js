import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';

const Dropzone = ({ onDrop, removeFile, maxFiles }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: maxFiles,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      const newFiles = [...imageFiles];

      setFiles(newFiles);

      if (onDrop) {
        onDrop(newFiles);
      }

      if (rejectedFiles.length > 0) {
        console.log('Rejected files:', rejectedFiles);
      }
    },
  });

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (removeFile) {
      removeFile(newFiles);
    }
  };

  return (
    <div
      className={`${styles.dropzone} ${isDragActive && styles['drag-active']}`}
      {...getRootProps()}
    >
      <input className={styles['dropzone-input']} {...getInputProps()} />
      <div className={styles['dropzone-content']}>
        {isDragActive ? (
          <p className={styles['dropzone-text']}>Drop the file here...</p>
        ) : (
          <p className={styles['dropzone-text']}>
            Drag &apos;n&apos; drop a file here, or click to select a file
          </p>
        )}
        {files.length > 0 && (
          <div className={styles['product-gallery']}>
            <div className={styles['gallery-preview']}>
              <img
                src={URL.createObjectURL(files[0])}
                alt="Selected File"
                className={styles['preview-image']}
              />
            </div>
            <div className={styles['gallery-thumbnails']}>
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                  className={styles['thumbnail-image']}
                  onClick={() => handleRemoveFile(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
