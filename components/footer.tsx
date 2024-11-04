"use client";

import { useState } from "react";

export default function Footer() {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <>
      <footer className="w-full py-6 px-4 border-t bg-gradient-to-br from-purple-50 to-pink-50 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              如果觉得好用，可以请作者喝杯咖啡 ☕
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/kylin1020/hok-opener.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setShowQRCode(true)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              赞助支持
            </button>
          </div>
          
          <p className="text-sm text-gray-400">
            Made with ❤️ by kylin1020
          </p>
        </div>
      </footer>

      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl relative">
            <button 
              onClick={() => setShowQRCode(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">感谢您的支持</h3>
              <p className="text-sm text-gray-500">扫描下方二维码进行赞助</p>
            </div>
            <img 
              src="/imgs/qrcode.jpg" 
              alt="赞助二维码" 
              className="w-64 h-64 object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
} 