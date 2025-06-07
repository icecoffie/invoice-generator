import React from 'react';

const NotesSignature = ({ invoiceData, handleChange }) => {
    return (
        <section className="invoice-notes-signature">
            <div className="notes-block">
                <h3>Catatan</h3>
                <textarea
                    name="notes"
                    value={invoiceData.notes}
                    onChange={handleChange}
                    placeholder="Catatan tambahan untuk invoice..."
                />
            </div>
            <div className="bank-details-block">
                <h3>Detail Bank</h3>
                <textarea
                    name="bankDetails"
                    value={invoiceData.bankDetails}
                    onChange={handleChange}
                    placeholder="Nama Bank:&#10;No Rekening:&#10;Nama Penerima:"
                />
            </div>
        </section>
    );
};

export default NotesSignature;