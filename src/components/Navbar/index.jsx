import { useState, useEffect } from "react";

const Navbar = ({ onSearch }) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log('1010 Effect')
    }, [ search, onSearch]);

    const handleInputChange = (evt) => {
        setSearch(evt.target.value);
    };

    const handleInputKeyDown = (evt) => {
        if(evt.key === 'Enter'){
            onSearch(search);
        }
    };

    return (
        <div style={{
            marginBottom:14,
            width: '100%',
            display: 'flex',
        }}>
            <div style={{flex:1, display:'flex'}}>
                <p style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                }}>Mi tiquetera</p>
            </div>
            <div style={{ flex:1, display: 'flex', alignItems:'center', justifyContent:'flex-end' }}>
                <input 
                    placeholder="Busca tu evento favorito" 
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={search}
                    style={{
                        fontSize: 16,
                        padding: '6px 12px',
                        borderRadius: 4,
                        border: 'none',
                        width: 200,
                    }}
                />
            </div>
        </div>
    );
};

export default Navbar;