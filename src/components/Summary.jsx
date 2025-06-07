import React from 'react';

const Summary = ({ invoiceData, handleChange, currency }) => {
    // Fungsi helper untuk format mata uang
    const formatCurrency = (amount) => {
        if (isNaN(amount)) return `${currency} 0`;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <section className="invoice-summary-section">
            <div className="summary-line">
                <label>Subtotal</label>
                <span>{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            <div className="summary-line">
                <label htmlFor="taxRate">Pajak (%)</label>
                <div className="percentage-input">
                    <input
                        type="number"
                        id="taxRate"
                        name="taxRate"
                        value={invoiceData.taxRate}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />
                    <span>%</span>
                </div>
                <span>{formatCurrency(invoiceData.subtotal * (invoiceData.taxRate / 100))}</span>
            </div>
            <div className="summary-line">
                <label htmlFor="discount">Diskon (%)</label>
                <div className="percentage-input">
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={invoiceData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                    />
                    <span>%</span>
                </div>
                <span>-{formatCurrency(invoiceData.subtotal * (invoiceData.discount / 100))}</span>
            </div>
            <div className="summary-line">
                <label htmlFor="shipping">Pengiriman</label>
                <input
                    type="number"
                    id="shipping"
                    name="shipping"
                    value={invoiceData.shipping}
                    onChange={handleChange}
                    min="0"
                />
                <span>{formatCurrency(invoiceData.shipping)}</span>
            </div>
            <div className="summary-line total-line">
                <label>TOTAL</label>
                <span>{formatCurrency(invoiceData.total)}</span>
            </div>
            <div className="summary-line">
                <label htmlFor="amountPaid">Jumlah Dibayar</label>
                <input
                    type="number"
                    id="amountPaid"
                    name="amountPaid" // Jika Anda ingin melacak pembayaran
                    value={0} // Placeholder, Anda bisa membuat state terpisah untuk ini
                    onChange={() => {}} // Non-editable untuk demo ini
                    min="0"
                />
                <span>{formatCurrency(0)}</span> {/* Akan diisi dengan amountPaid */}
            </div>
            <div className="summary-line total-line">
                <label>Sisa Tagihan</label>
                <span>{formatCurrency(invoiceData.total - 0)}</span> {/* Sisa tagihan */}
            </div>
        </section>
    );
};

export default Summary;