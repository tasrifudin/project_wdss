import React from 'react';

interface WDSLogoProps {
  className?: string;
  size?: number | string;
  showBackground?: boolean;
}

export const WDSLogo: React.FC<WDSLogoProps> = ({ 
  className = "w-full h-full", 
  size,
  showBackground = true
}) => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {showBackground && (
        <rect width="400" height="400" rx="64" fill="white" />
      )}
      
      <g transform="translate(8, 8)">
        {/* Left Blue Main Bold Wing */}
        <path
          d="M 88 138
             L 132 138
             L 194 240
             L 242 216
             L 228 244
             L 158 272
             Z"
          fill="#0038A8"
        />

        {/* Center Blue Smooth Wave / Swoosh */}
        <path
          d="M 152 126
             C 152 126, 182 178, 218 238
             C 228 256, 228 272, 218 272
             C 208 272, 192 242, 175 206
             C 158 170, 148 138, 152 126 Z"
          fill="#0038A8"
        />

        {/* Right Red Flame Wing */}
        <path
          d="M 170 108
             C 178 124, 210 192, 232 236
             C 244 260, 256 206, 280 152
             L 312 152
             L 252 248
             C 242 264, 230 264, 224 248
             C 210 216, 166 124, 170 108 Z"
          fill="#D0121B"
        />
      </g>
    </svg>
  );
};

export default WDSLogo;
