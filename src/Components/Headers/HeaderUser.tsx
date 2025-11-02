import React from 'react';
import logoUser from '../../assets/person-circle.svg';

interface HeaderUserProps {
    title:string;
}


const HeaderUser:React.FC<HeaderUserProps> = ({title}) => {
    return (
        <div className="title">
            <h1>{title}</h1>
            <img src={logoUser} alt="logoUser not found" />
        </div>
    );
};

export default HeaderUser;
