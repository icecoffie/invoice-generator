import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from './components/Header';
import InvoiceDetails from './components/InvoiceDetails';
import ItemList from './components/ItemList';
import Summary from './components/Summary';
import NotesSignature from './components/NotesSignature';
import Footer from './components/Footer';

function App() {
    const [invoiceData, setInvoiceData] = useState({
        logo: '',
        sender: {
            name: 'Nama Perusahaan Anda',
            address: 'Alamat Perusahaan Anda\nKota, Kode Pos',
            phone: 'Telepon Perusahaan Anda',
            email: 'Email Perusahaan Anda',
        },
        recipient: {
            name: 'Nama Klien',
            address: 'Alamat Klien\nKota, Kode Pos',
            phone: 'Telepon Klien',
            email: 'Email Klien',
        },
        invoiceDate: new Date().toISOString().slice(0, 10),
        invoiceNumber: 'INV-001',
        dueDate: '',
        
        items: [
            { id: 1, description: 'Desain Logo', quantity: 1, unitPrice: 1500000 },
            { id: 2, description: 'Pengembangan Website', quantity: 1, unitPrice: 5000000 },
        ],
        
        subtotal: 0,
        taxRate: 10,
        discount: 0,
        shipping: 0,
        total: 0,

        notes: 'Terima kasih atas kerja sama Anda.',
        bankDetails: 'Nama Bank: BCA\nNo Rekening: 1234567890\nNama Penerima: Nama Perusahaan Anda',
    });

    const [currency, setCurrency] = useState('IDR'); 

    const invoiceRef = useRef();

    useEffect(() => {
        const newSubtotal = invoiceData.items.reduce((sum, item) => 
            sum + (item.quantity * item.unitPrice), 0
        );

        const taxAmount = newSubtotal * (invoiceData.taxRate / 100);
        const discountAmount = newSubtotal * (invoiceData.discount / 100);

        const newTotal = newSubtotal + taxAmount - discountAmount + invoiceData.shipping;

        setInvoiceData(prevData => ({
            ...prevData,
            subtotal: newSubtotal,
            total: newTotal,
        }));
    }, [invoiceData.items, invoiceData.taxRate, invoiceData.discount, invoiceData.shipping]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setInvoiceData(prevData => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value,
                },
            }));
        } else if (type === 'number') {
            setInvoiceData(prevData => ({
                ...prevData,
                [name]: parseFloat(value) || 0,
            }));
        } else if (name === 'logo') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setInvoiceData(prevData => ({ ...prevData, logo: reader.result }));
                };
                reader.readAsDataURL(file);
            }
        }
        else {
            setInvoiceData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleItemChange = (id, field, value) => {
        setInvoiceData(prevData => ({
            ...prevData,
            items: prevData.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleAddItem = () => {
        setInvoiceData(prevData => ({
            ...prevData,
            items: [
                ...prevData.items,
                { id: prevData.items.length > 0 ? Math.max(...prevData.items.map(item => item.id)) + 1 : 1, description: '', quantity: 1, unitPrice: 0 }
            ],
        }));
    };

    const handleRemoveItem = (id) => {
        setInvoiceData(prevData => ({
            ...prevData,
            items: prevData.items.filter(item => item.id !== id),
        }));
    };

    const handlePrintPDF = (action) => {
        if (!invoiceRef.current) return;

        // Tambahkan kelas khusus untuk cetak
        invoiceRef.current.classList.add('print-mode-active');
        document.body.classList.add('print-mode-active'); 

        html2canvas(invoiceRef.current, {
            scale: 2, // Meningkatkan resolusi gambar untuk kualitas lebih baik
            useCORS: true,
            // Penting: Hapus windowWidth dan windowHeight agar html2canvas mengambil seluruh elemen
            // windowWidth: invoiceRef.current.scrollWidth, 
            // windowHeight: invoiceRef.current.scrollHeight,
        }).then(canvas => {
            // Hapus kelas khusus setelah screenshot diambil
            invoiceRef.current.classList.remove('print-mode-active');
            document.body.classList.remove('print-mode-active');

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); 

            // Dimensi A4
            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

            // Menghitung rasio aspek canvas dan menyesuaikan tinggi gambar di PDF
            const imgCanvasWidth = canvas.width;
            const imgCanvasHeight = canvas.height;
            const imgRatio = imgCanvasWidth / imgCanvasHeight;

            let imgPdfWidth = pdfWidth;
            let imgPdfHeight = pdfWidth / imgRatio;

            // Jika tinggi gambar melebihi tinggi halaman PDF, skalakan agar pas di halaman
            if (imgPdfHeight > pdfHeight) {
                imgPdfHeight = pdfHeight;
                imgPdfWidth = pdfHeight * imgRatio;
            }

            // Pusatkan gambar jika lebarnya tidak penuh
            const xOffset = (pdfWidth - imgPdfWidth) / 2;
            const yOffset = (pdfHeight - imgPdfHeight) / 2;


            // html2canvas hanya akan mengambil apa yang terlihat. 
            // Untuk memastikan 1 halaman, kita mengandalkan CSS @media print
            // yang membatasi tinggi container invoice ke 297mm (A4).
            // Jika konten melebihi 297mm, sebagian akan terpotong oleh CSS `overflow: hidden`.
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgPdfWidth, imgPdfHeight);
            
            if (action === 'print') {
                pdf.autoPrint(); // Perintah cetak otomatis
                window.open(pdf.output('bloburl'), '_blank');
            } else if (action === 'download') {
                pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
            }
        }).catch(err => {
            console.error("Error generating image or PDF:", err);
            invoiceRef.current.classList.remove('print-mode-active');
            document.body.classList.remove('print-mode-active');
        });
    };

    return (
        <>
            <div className="invoice-app-container" ref={invoiceRef}>
                <Header 
                    logo={invoiceData.logo}
                    invoiceNumber={invoiceData.invoiceNumber}
                    invoiceDate={invoiceData.invoiceDate}
                    dueDate={invoiceData.dueDate}
                    handleChange={handleChange}
                />
                <main className="invoice-main-content">
                    <InvoiceDetails
                        invoiceData={invoiceData}
                        handleChange={handleChange}
                    />
                    <ItemList
                        items={invoiceData.items}
                        handleItemChange={handleItemChange}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                        currency={currency} 
                    />
                    <Summary
                        invoiceData={invoiceData}
                        handleChange={handleChange}
                        currency={currency} 
                    />
                    <NotesSignature
                        invoiceData={invoiceData}
                        handleChange={handleChange}
                    />
                </main>
                <Footer 
                    handlePrintPDF={handlePrintPDF} 
                    currency={currency}
                    setCurrency={setCurrency}
                />
            </div>
        </>
    );
}

export default App;