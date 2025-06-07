import React from 'react';

const InvoiceDetails = ({ invoiceData, handleChange }) => {
    return (
        <section className="invoice-parties">
            <div className="party-block sender-details">
                <h3>Dari</h3>
                <input
                    type="text"
                    name="sender.name"
                    value={invoiceData.sender.name}
                    onChange={handleChange}
                    placeholder="Nama Perusahaan Anda"
                />
                <textarea
                    name="sender.address"
                    value={invoiceData.sender.address}
                    onChange={handleChange}
                    placeholder="Alamat Perusahaan Anda"
                />
                <input
                    type="text"
                    name="sender.phone"
                    value={invoiceData.sender.phone}
                    onChange={handleChange}
                    placeholder="Telepon Perusahaan Anda"
                />
                <input
                    type="text"
                    name="sender.email"
                    value={invoiceData.sender.email}
                    onChange={handleChange}
                    placeholder="Email Perusahaan Anda"
                />
            </div>

            <div className="party-block recipient-details">
                <h3>Untuk</h3>
                <input
                    type="text"
                    name="recipient.name"
                    value={invoiceData.recipient.name}
                    onChange={handleChange}
                    placeholder="Nama Klien"
                />
                <textarea
                    name="recipient.address"
                    value={invoiceData.recipient.address}
                    onChange={handleChange}
                    placeholder="Alamat Klien"
                />
                <input
                    type="text"
                    name="recipient.phone"
                    value={invoiceData.recipient.phone}
                    onChange={handleChange}
                    placeholder="Telepon Klien"
                />
                <input
                    type="text"
                    name="recipient.email"
                    value={invoiceData.recipient.email}
                    onChange={handleChange}
                    placeholder="Email Klien"
                />
            </div>
        </section>
    );
};

export default InvoiceDetails;