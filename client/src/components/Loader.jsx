import React from 'react';
import {Spinner} from '@material-tailwind/react';
import { TransactionContext } from '../context/TransactionContext';
import { useContext } from 'react';

const Loader = () => {

    const { isLoading } = useContext(TransactionContext);

    return (
        isLoading &&
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 9999,
        }}>
            <Spinner color="black" className='h-20 w-20' />
        </div>
    );
}

export default Loader;