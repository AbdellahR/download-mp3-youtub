import React, { useState } from 'react';
import './styles.css';
import AdComponent from './AdComponent'

const InputField = ({ url, setUrl }) => (
  <input
    type="text"
    placeholder="Enter YouTube URL"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    className="input-field"
  />
);

const FormatSelector = ({ format, setFormat }) => (
  <select value={format} onChange={(e) => setFormat(e.target.value)} className="format-selector">
    <option value="mp3">MP3</option>
    <option value="mp4">MP4</option>
  </select>
);

const DownloadButton = ({ handleDownload, downloading, progress }) => (
  <button onClick={handleDownload} className="download-button" disabled={downloading}>
    {downloading ? `Downloading... ${progress}%` : 'Download'}
  </button>
);

const SuccessPopup = ({ onClose }) => (
  <div className="success-popup">
    <p>Download completed successfully!</p>
    <button onClick={onClose} className="popup-button">Close</button>
  </div>
);

const Download = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5000/download?url=${encodeURIComponent(url)}&format=${format}`, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      setDownloading(false);
      setProgress(0);
      if (xhr.status === 200) {
        const blob = xhr.response;
        const contentDisposition = xhr.getResponseHeader('Content-Disposition');
        const fileNameRegex = /filename[^;=\n]*=(['"]?)([^'";\n]*)\1?/;
        const originalFileName = (fileNameRegex.exec(contentDisposition) || [])[2];
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = originalFileName || `download.${format}`;
        link.click();
        setShowSuccessPopup(true);
      } else {
        console.error('Download failed with status:', xhr.status);
      }
    };

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        setProgress(Math.round(percentage));
      }
    };

    xhr.onerror = () => {
      setDownloading(false);
      setProgress(0);
      console.error('Download failed with network error');
    };

    xhr.send();
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="download-container">
      <InputField url={url} setUrl={setUrl} />
      <FormatSelector format={format} setFormat={setFormat} />
      <DownloadButton handleDownload={handleDownload} downloading={downloading} progress={progress} />
      <AdComponent /> {/* Add the AdSenseAMP component */}
      {showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />}
    </div>
  );
};

export default Download;
