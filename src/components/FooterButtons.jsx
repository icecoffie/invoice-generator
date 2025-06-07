import React from 'react';

function FooterButtons({ handlePrintPDF }) {
    return (
        <footer className="app-footer">
            <button
                className="action-btn print-btn"
                onClick={() => handlePrintPDF('print')}
            >
                Cetak Invoice
            </button>
            <button
                className="action-btn download-btn"
                onClick={() => handlePrintPDF('download')}
            >
                Unduh PDF
            </button>
        </footer>
    );
}

export default FooterButtons;