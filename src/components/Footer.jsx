import React from 'react';

const Footer = ({ handlePrintPDF, currency, setCurrency }) => {
    return (
        <footer className="app-footer">
            <div className="footer-controls">
                <div className="currency-selector">
                    <label htmlFor="currency">Mata Uang:</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="IDR">IDR (Rupiah)</option>
                        <option value="USD">USD (Dollar AS)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="JPY">JPY (Yen Jepang)</option>
                    </select>
                </div>
                <div className="footer-buttons">
                    <button type="button" onClick={() => handlePrintPDF('download')} className="action-btn download-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        Unduh PDF
                    </button>
                    <button type="button" onClick={() => handlePrintPDF('print')} className="action-btn print-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                        Cetak Invoice
                    </button>
                </div>
            </div>
            <div className="social-media">
                <span>© 2025 Matrix Sync</span>
                <a href="https://instagram.com/msync.matrix" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/ios-filled/24/e0e0e0/instagram-new.png" alt="Instagram" />
                </a>
                <a href="https://github.com/icecoffie" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/ios-filled/24/e0e0e0/github.png" alt="GitHub" />
                </a>
                <a href="https://linkedin.com/company/matrixsync" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/ios-filled/24/e0e0e0/linkedin.png" alt="LinkedIn" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;