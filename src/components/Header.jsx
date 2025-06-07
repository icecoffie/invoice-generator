import React from 'react';
const Header = ({ logo, invoiceNumber, invoiceDate, dueDate, handleChange }) => {
    return (
        <header className="app-header">
            <div className="logo-section">
                {/* Tombol upload akan hilang jika logo sudah ada */}
                {!logo && (
                    <>
                        <input
                            type="file"
                            id="logo-upload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                            name="logo"
                        />
                        <label htmlFor="logo-upload" className="logo-upload-btn">
                            Tambah Logo Perusahaan
                        </label>
                    </>
                )}
                {logo && (
                    <img src={logo} alt="Company Logo" className="logo-preview" />
                )}
            </div>

            <div className="invoice-title-section">
                <h1>INVOICE</h1>
            </div>

            <div className="invoice-meta-section">
                <div className="input-group">
                    <label htmlFor="invoiceNumber">#</label>
                    <input
                        type="text"
                        id="invoiceNumber"
                        name="invoiceNumber"
                        value={invoiceNumber}
                        onChange={handleChange}
                        placeholder="No. Invoice"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="invoiceDate">Date</label>
                    <input
                        type="date"
                        id="invoiceDate"
                        name="invoiceDate"
                        value={invoiceDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;