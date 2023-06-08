import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';

const SingleFileDropzone = ({ onDrop }) => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const imageFile = acceptedFiles.find((file) =>
        file.type.startsWith('image/')
      );

      if (imageFile) {
        setFile(imageFile);
        if (onDrop) {
          onDrop(imageFile);
        }
      }

      if (rejectedFiles.length > 0) {
        console.log('Rejected files:', rejectedFiles);
      }
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
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
        {file && (
          <div className={styles['selected-file']}>
            <div className={styles['file']}>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected File"
                width={300}
                height={300}
              />
              <button
                className={styles['remove-button']}
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleFileDropzone;
