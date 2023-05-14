import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {

    return (
        <div className='d-flex  justify-content-center align-items-center flex-column'>
            <ReactLoading type='bars' color='#fff' height={'40%'} width={'40%'} />
            <p style={{color: 'white', textAlign: 'center', marginTop: '20px'}}>Servidor gratuito acordando, tenha paciência, por favor.</p>
        </div>
    );
};
export default Loading;