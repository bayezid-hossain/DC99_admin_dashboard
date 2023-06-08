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

      const newFiles = [...files];
      imageFiles.forEach((newFile) => {
        const isDuplicate = files.some(
          (existingFile) => existingFile.name === newFile.name
        );
        if (!isDuplicate) {
          newFiles.push(newFile);
        }
      });

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
      <input
        className={styles['dropzone-input']}
        {...getInputProps({ multiple: true })}
      />
      <div className={styles['dropzone-content']}>
        {isDragActive ? (
          <p className={styles['dropzone-text']}>Drop the files here...</p>
        ) : (
          <p className={styles['dropzone-text']}>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
        <div className={styles['selected-files']}>
          {files.map((file, index) => (
            <div className={styles['file']} key={index}>
              <img src={URL.createObjectURL(file)} alt={`File ${index + 1}`} />
              <button
                className={styles['remove-button']}
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveFile(index);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
