// // // src/App.js
// // import React, { useState } from 'react';

// // function App() {
// //   const [url, setUrl] = useState('');
// //   const [format, setFormat] = useState('mp4');

// //   const handleDownload = async () => {
// //     const response = await fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}&format=${format}`);
// //     const blob = await response.blob();
// //     const link = document.createElement('a');
// //     link.href = window.URL.createObjectURL(blob);
// //     link.download = `video.${format}`;
// //     link.click();
// //   };

// //   return (
// //     <div>
// //       <h1>YouTube Video Downloader</h1>
// //       <input 
// //         type="text" 
// //         placeholder="Enter YouTube URL" 
// //         value={url} 
// //         onChange={(e) => setUrl(e.target.value)} 
// //       />
// //       <select value={format} onChange={(e) => setFormat(e.target.value)}>
// //         <option value="mp4">MP4</option>
// //         <option value="mp3">MP3</option>
// //       </select>
// //       <button onClick={handleDownload}>Download</button>
// //     </div>
// //   );
// // }

// // export default App;


// // src/App.js
// import React, { useState } from 'react';
// import './styles.css';

// const Header = () => (
//   <header>
//     <h1 className="title">YouTube Video Downloader</h1>
//   </header>
// );

// const InputField = ({ url, setUrl }) => (
//   <input
//     type="text"
//     placeholder="Enter YouTube URL"
//     value={url}
//     onChange={(e) => setUrl(e.target.value)}
//     className="input-field"
//   />
// );

// const FormatSelector = ({ format, setFormat }) => (
//   <select value={format} onChange={(e) => setFormat(e.target.value)} className="format-selector">
//     <option value="mp4">MP4</option>
//     <option value="mp3">MP3</option>
//   </select>
// );

// const DownloadButton = ({ handleDownload }) => (
//   <button onClick={handleDownload} className="download-button">Download</button>
// );

// function App() {
//   const [url, setUrl] = useState('');
//   const [format, setFormat] = useState('mp4');

//   const handleDownload = async () => {
//     const response = await fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}&format=${format}`);
//     const blob = await response.blob();
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = `video.${format}`;
//     link.click();
//   };

//   return (
//     <div className="app">
//       <Header />
//       <div className="content">
//         <InputField url={url} setUrl={setUrl} />
//         <FormatSelector format={format} setFormat={setFormat} />
//         <DownloadButton handleDownload={handleDownload} />
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import './styles.css';
import Header from './Header';
import Download from './Download';
import AdComponent from './AdComponent';

const App = () => (
  <div className="app">
    <Header />
    <div className="content">
      <Download />
      <AdComponent />
    </div>
  </div>
);

export default App;

