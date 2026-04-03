import { motion } from 'framer-motion';
import xeroxImg from '../assets/xerox.png';
import printerImg from '../assets/printer.png';
import scannerImg from '../assets/scanner.png';
import laminationImg from '../assets/lamination.png';
import bindingImg from '../assets/binding.png';
import designImg from '../assets/design.png';

const services = [
  { 
    title: 'Zerox (B&W)', 
    desc: 'Elite black & white documentation. Precision single and double-sided copying with matte clarity.', 
    image: xeroxImg,
    price: ['A4 Single: ₹1', 'A4 Double: ₹0.60']
  },
  { 
    title: 'Color Printing', 
    desc: 'Vibrant, high-fidelity color reproduction across all standard and large format sizes from A4 to A0.', 
    image: printerImg,
    price: ['A4: ₹10', 'A3: ₹20', 'A2: ₹150', 'A1: ₹300', 'A0: ₹500']
  },
  { 
    title: 'Lamination', 
    desc: 'Premium quality glossy protection for your certificates and standard documents.', 
    image: laminationImg,
    price: ['A4: ₹20', 'Legal: ₹30', 'A3: ₹40']
  },
  { 
    title: 'Board Sheets', 
    desc: 'Heavy-duty cardstock and architectural board printing for premium presentations.', 
    image: designImg,
    price: ['A4 Single: ₹20', 'A4 Double: ₹30', 'A3 (13x19) S: ₹30', 'A3 (13x19) D: ₹40']
  },
  { 
    title: 'Visiting Cards', 
    desc: 'Professional business cards in bulk. Premium matte and glossy finish options available.', 
    image: designImg,
    price: ['500 Pieces S: ₹380', '500 Pieces D: ₹510', '1000 Pieces S: ₹580', '1000 Pieces D: ₹880']
  },
  { 
    title: 'Binding', 
    desc: 'Professional document finishing with high-quality binding for projects and reports.', 
    image: bindingImg,
    price: ['Chat: ₹10', 'Spiral: ₹20', 'Project: ₹100']
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="services" style={{ padding: '100px 20px', textAlign: 'center', background: '#FFFFFF', borderTop: '1px solid #EEEEEE' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px', color: '#000000', fontWeight: 900 }} className="text-gradient">
          Premium Services
        </h2>
        <p style={{ color: '#444444', marginBottom: '60px', fontSize: '1.2rem', fontWeight: 500, maxWidth: '700px', margin: '0 auto 80px auto', opacity: 0.8 }}>
          Elite documentation and creative solutions tailored for your success.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto',
        }}>
          {services.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass-card" 
              style={{
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '25px',
                textAlign: 'center',
                background: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Image Container with Floating Anim */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: '180px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                   src={item.image} 
                   alt={item.title} 
                   style={{ 
                     maxWidth: '100%', 
                     maxHeight: '100%', 
                     objectFit: 'contain',
                     filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.15))' 
                   }} 
                />
              </motion.div>

              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#000000', fontWeight: 900 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px', minHeight: '3em' }}>{item.desc}</p>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {(Array.isArray(item.price) ? item.price : [item.price]).map((p, pIdx) => (
                    <div key={pIdx} style={{
                      display: 'inline-block',
                      fontWeight: 900,
                      color: '#000000',
                      fontSize: '1rem',
                      background: 'var(--primary)',
                      padding: '8px 20px',
                      borderRadius: '15px',
                      boxShadow: '0 5px 0 #DAB91B',
                      transform: 'rotate(-2deg)',
                      whiteSpace: 'nowrap'
                    }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 480px) {
          section { padding: 60px 15px; }
          .glass-card { padding: 40px 20px; }
        }
      `}</style>
    </section>
  );
};

export default Services;
