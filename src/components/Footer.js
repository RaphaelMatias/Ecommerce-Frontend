import React from 'react';

const Footer = () => {
    return(
        <footer className='bg-dark text-white p-3 mt-5'>
            <div className='container text-center'>
                <p>&copy; 2025 Up Store. Todos os direitos reservados.</p>
                <div className="mt-2">
                    <a href="/policy" className="text-white me-3">Políticas</a>
                    <a href="/contact" className="text-white me-3">Contato</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;