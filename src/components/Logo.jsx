import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/blogolio-logo.png'; // Make sure to put the image in this path or update accordingly

function Logo({ width = "50px", fontSize = '1.5rem', className = "" }) {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-2 max-w-full overflow-hidden"
    >
      <img
        src={logoImage}
        alt="Blogolio Logo"
        style={{
          width,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
      <span
        className="text-gray-800 font-bold truncate"
        style={{
          fontSize,
          maxWidth: "100px",
        }}
      >
        Blogolio
      </span>
    </Link>
  );
}

export default Logo;
