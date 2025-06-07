import React from 'react';
import ItemRow from './ItemRow';

const ItemList = ({ items, handleItemChange, handleAddItem, handleRemoveItem, currency }) => {
    return (
        <section className="invoice-items-section">
            <table>
                <thead>
                    <tr>
                        <th>Deskripsi Item</th>
                        <th>Jumlah</th>
                        <th>Harga Satuan</th>
                        <th>Total</th>
                        <th></th> {/* Untuk tombol hapus */}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <ItemRow
                            key={item.id}
                            item={item}
                            handleItemChange={handleItemChange}
                            handleRemoveItem={handleRemoveItem}
                            currency={currency}
                        />
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={handleAddItem} className="add-item-btn">
                + Tambah Baris Item
            </button>
        </section>
    );
};

export default ItemList;