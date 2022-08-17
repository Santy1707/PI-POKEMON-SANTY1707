import React from 'react';
import './Card.css'


export default function Card ({name, image, type}) {
        return (
            <div className='cards'>
                <h3 className='names'>{name}</h3>
                <h5 className='type'>{type.map(type => (<p className='type p'> {type}</p>))}</h5> {/*//.map(tps => ' - ' + tps.name + ' ')*/}
                <img src={image} alt='image not found' width='200px' height='250px' />
            </div>
        );
    }



