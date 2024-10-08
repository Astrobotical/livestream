import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full   text-center py-4">
  
      <p>
      <span className="mx-1">
            v:1.0
     </span>
        Designed by
        <a
          href="https://romarioburke.com"
          className="text-blue-400 hover:text-blue-600 mx-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Romario Burke
        </a>
      </p>
    </footer>
  );
};
export default Footer;