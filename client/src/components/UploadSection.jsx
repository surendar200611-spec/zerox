import React, { useState, useEffect } from 'react';
import gpayLogo from '../assets/gpay.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, BarChart3, Info, IndianRupee, MessageCircle, Mail, ArrowRight } from 'lucide-react';

const UploadSection = () => {
    const [numPages, setNumPages] = useState(0);
    const [copies, setCopies] = useState(0);
    const [colorMode, setColorMode] = useState('BW');
    const [pageSize, setPageSize] = useState('A4');
    const [printSide, setPrintSide] = useState('Single');
    const [totalPrice, setTotalPrice] = useState(0);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        // Price calculation logic:
        const totalItems = numPages * copies;
        let pricePerPage = 0;

        if (pageSize === 'A4') {
            if (colorMode === 'Color') {
                pricePerPage = 10;
            } else {
                // Black & White A4
                if (printSide === 'Double') {
                    pricePerPage = 0.60;
                } else {
                    // Single Sided B&W: Volume pricing (0.80rs/pg for 10+ items)
                    pricePerPage = totalItems >= 10 ? 0.80 : 1.00;
                }
            }
        } else {
            // Large Format Pricing
            const sizePrices = {
                'A3': { 'BW': 5, 'Color': 20 },
                'A2': { 'BW': 35, 'Color': 150 },
                'A1': { 'BW': 60, 'Color': 300 },
                'A0': { 'BW': 100, 'Color': 500 }
            };
            
            const selectedSize = sizePrices[pageSize];
            if (selectedSize) {
                pricePerPage = colorMode === 'Color' ? selectedSize.Color : selectedSize.BW;
            } else {
                pricePerPage = 2; // Fallback
            }
        }

        const calculated = pricePerPage * totalItems;
        setTotalPrice(calculated % 1 === 0 ? calculated : parseFloat(calculated.toFixed(2)));
        setShowContact(false); // Reset contact options when price changes
    }, [numPages, copies, colorMode, pageSize, printSide]);

    const handleWhatsApp = () => {
        const text = `Hello Dolfin Xerox! I'd like to place an order.
        
Estimated Total: ₹${totalPrice}
Details: ${numPages} Pages, ${copies} Copies, ${pageSize}, ${colorMode}, ${printSide}`;
        window.open(`https://wa.me/918438499443?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleEmail = () => {
        const subject = `Order Inquiry from Dolfin Xerox Website`;
        const body = `Hello Dolfin Xerox Team,

I'm interested in placing a printing order. 

Estimated Total: ₹${totalPrice}
Order Details:
- Paper Size: ${pageSize}
- Mode: ${colorMode}
- Pages: ${numPages}
- Copies: ${copies}
- Side: ${printSide}

Please let me know how to proceed.
`;
        window.location.href = `mailto:dolfinxerox2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const priceList = [
        { label: 'A4 B&W Single', price: '₹1.00' },
        { label: 'A4 B&W Double', price: '₹0.60/pg' },
        { label: 'A4 Color', price: '₹10.00' },
        { label: 'A3 B&W / Color', price: '₹5 / ₹20' },
        { label: 'A2 B&W / Color', price: '₹35 / ₹150' },
        { label: 'A1 B&W / Color', price: '₹60 / ₹300' },
        { label: 'A0 B&W / Color', price: '₹100 / ₹500' },
    ];

    return (
        <section id="calculator" style={{ padding: '80px 20px', background: 'var(--bg-beige)' }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
            }} className="glass-card main-container">
                
                {/* Left Column: Calculator Inputs & Reference */}
                <div style={{ padding: '50px 40px', borderRight: '1px solid #EEEEEE' }} className="form-column">
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                            <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(218, 185, 27, 0.3)' }}>
                                <Calculator size={28} color="#000000" />
                            </div>
                            <h3 style={{ fontSize: '2.2rem', margin: 0, color: '#000000', fontWeight: 900, letterSpacing: '-1px' }}>
                                Price Calculator
                            </h3>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>
                            Professionally estimate your project cost in real-time.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {/* Interactive Inputs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444', display: 'block', marginBottom: '8px' }}>TOTAL PAGES</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={numPages} 
                                    onChange={(e) => setNumPages(Math.max(0, parseInt(e.target.value) || 0))} 
                                    style={{ width: '100%', padding: '12px 15px', background: '#FFFFFF', border: '2px solid #EEEEEE', borderRadius: '12px', color: '#000000', fontWeight: 700, fontSize: '1rem', outline: 'none' }} 
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444', display: 'block', marginBottom: '8px' }}>COPIES</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={copies} 
                                    onChange={(e) => setCopies(Math.max(0, parseInt(e.target.value) || 0))} 
                                    style={{ width: '100%', padding: '12px 15px', background: '#FFFFFF', border: '2px solid #EEEEEE', borderRadius: '12px', color: '#000000', fontWeight: 700, fontSize: '1rem', outline: 'none' }} 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444', display: 'block', marginBottom: '8px' }}>PAPER SIZE</label>
                                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} style={{ width: '100%', padding: '12px 15px', background: '#FFFFFF', border: '2px solid #EEEEEE', borderRadius: '12px', color: '#000000', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <option value="A4">Standard A4</option>
                                    <option value="A3">Premium A3</option>
                                    <option value="A2">Executive A2</option>
                                    <option value="A1">Plotting A1</option>
                                    <option value="A0">Plotting A0</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444', display: 'block', marginBottom: '8px' }}>COLOR MODE</label>
                                <select value={colorMode} onChange={(e) => setColorMode(e.target.value)} style={{ width: '100%', padding: '12px 15px', background: '#FFFFFF', border: '2px solid #EEEEEE', borderRadius: '12px', color: '#000000', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <option value="BW">Black & White</option>
                                    <option value="Color">Full Color</option>
                                </select>
                            </div>
                        </div>

                        {pageSize === 'A4' && colorMode === 'BW' && (
                            <div style={{ width: '100%' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#444444', display: 'block', marginBottom: '8px' }}>PRINTING SIDE</label>
                                <select value={printSide} onChange={(e) => setPrintSide(e.target.value)} style={{ width: '100%', padding: '12px 15px', background: '#FFFFFF', border: '2px solid #EEEEEE', borderRadius: '12px', color: '#000000', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <option value="Single">Single Sided</option>
                                    <option value="Double">Front & Back (Double)</option>
                                </select>
                            </div>
                        )}

                        {/* Professional Mini Price Table */}
                        <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.03)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <Info size={16} color="var(--primary)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', color: '#000000', letterSpacing: '1px' }}>Standard Base Rates</span>
                            </div>
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {priceList.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '5px' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666666' }}>{item.label}</span>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#000000' }}>{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Estimated Total Display */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }} className="price-column">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="glass-card" style={{ 
                        padding: '60px 30px', 
                        textAlign: 'center', 
                        width: '100%',
                        background: 'linear-gradient(145deg, var(--primary), #e6c31c)',
                        border: '4px solid #000000',
                        boxShadow: '12px 16px 0 rgba(0,0,0,0.1), 0 10px 0 #000000',
                        borderRadius: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px'
                    }}>
                        <div style={{ background: '#000000', padding: '15px', borderRadius: '50%', marginBottom: '5px' }}>
                            <IndianRupee size={32} color="var(--primary)" />
                        </div>
                        <h4 style={{ color: '#000000', margin: 0, fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px' }}>
                            Estimated Total
                        </h4>
                        <div style={{ 
                            fontSize: 'clamp(4rem, 10vw, 6rem)', 
                            fontWeight: 900, 
                            lineHeight: 1,
                            color: '#000000',
                            letterSpacing: '-3px',
                            margin: '10px 0'
                        }}>
                             ₹{totalPrice}
                        </div>
                        <div style={{ padding: '8px 20px', background: 'rgba(0,0,0,0.08)', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BarChart3 size={16} color="#000000" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', textTransform: 'uppercase' }}>
                                Dynamic Rate Applied
                            </span>
                        </div>
                    </motion.div>

                    {/* Order Now Button & Contact Options */}
                    <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {!showContact ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowContact(true)}
                                className="button-3d"
                                style={{ 
                                    width: '100%', 
                                    padding: '18px', 
                                    fontSize: '1.2rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    gap: '12px' 
                                }}
                            >
                                ORDER NOW <ArrowRight size={20} />
                            </motion.button>
                        ) : (
                            <AnimatePresence>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}
                                >
                                    <button 
                                        onClick={handleWhatsApp}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            padding: '15px',
                                            background: '#25D366',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '15px',
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 6px 0 #128C7E',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
                                        onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <MessageCircle size={22} /> WHATSAPP ORDER
                                    </button>
                                    
                                    <button 
                                        onClick={handleEmail}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            padding: '15px',
                                            background: '#EA4335',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '15px',
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 6px 0 #B21F00',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
                                        onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <Mail size={22} /> GMAIL ORDER
                                    </button>
                                    
                                    <button 
                                        onClick={() => setShowContact(false)}
                                        style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginTop: '5px' }}
                                    >
                                        ← Back to Calculator
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                    
                    {/* GPay Badge */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '15px', 
                        background: '#FFFFFF', 
                        padding: '20px 30px', 
                        borderRadius: '25px', 
                        border: '3px solid #EEEEEE',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                        width: '100%',
                        maxWidth: '380px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '55px', height: '55px', borderRadius: '12px', background: '#FFFFFF', padding: '5px' }}>
                            <img src={gpayLogo} alt="Google Pay" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Pay via Google Pay</div>
                            <div style={{ color: '#000000', fontSize: '1.3rem', fontWeight: 900, marginTop: '2px' }}>+91 98437 00789</div>
                        </div>
                    </div>

                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', opacity: 0.8 }}>
                        *Actual price may vary based on paper quality and physical adjustments.
                    </p>
                </div>
            </div>
            
            <style>{`
              @media (max-width: 768px) {
                .main-container { grid-template-columns: 1fr; }
                .form-column { border-right: none; border-bottom: 2px solid #EEEEEE; padding: 40px 20px; }
                .price-column { padding: 40px 20px; }
              }
            `}</style>
        </section>
    );
};

export default UploadSection;
