import React from 'react';
import './Recognition.css'

const Recognition = ({ imageUrl, faceBox }) => {

    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' />
                <div className='bounding-box' style={{top: faceBox.topRow, right: faceBox.rightCol, left: faceBox.leftCol, bottom: faceBox.bottomRow}}></div>
            </div>
        </div>
    );
}

export default Recognition;