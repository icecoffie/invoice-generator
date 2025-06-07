import React from 'react';

const ItemRow = ({ item, handleItemChange, handleRemoveItem, currency }) => {
    const totalAmount = item.quantity * item.unitPrice;

    // Fungsi helper untuk format mata uang
    const formatCurrency = (amount) => {
        if (isNaN(amount)) return `${currency} 0`;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0, // Jangan tampilkan desimal jika tidak ada
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <tr className="invoice-item-row">
            <td>
                <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Deskripsi"
                />
            </td>
            <td>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    min="0"
                />
            </td>
            <td>
                <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    min="0"
                />
            </td>
            <td>
                <span>{formatCurrency(totalAmount)}</span>
            </td>
            <td>
                <button type="button" onClick={() => handleRemoveItem(item.id)} className="remove-item-btn">
                    &times;
                </button>
            </td>
        </tr>
    );
};

export default ItemRow;