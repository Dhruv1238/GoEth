import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  
function DriverSide() {
    const [dName, setDName] = useState('');
    const [dPhoneNumber, setDPhoneNumber] = useState('');
    const [dEmail, setDEmail] = useState('');
    const [dCarType, setDCarType] = useState('');
    const hvalue = collection(db, "Drivers");

    const handleCreate = async () => {
        try {
          await addDoc(hvalue, {
            name: dName,
            email: dEmail,
            phoneNumber: dPhoneNumber,
            carType: dCarType,
          });
          console.log("Document successfully created");
        } catch (error) {
          console.error("Error creating document:", error);
        }
      };
    


    return (
        <>
            <div className='w-[45vh] h-[100vh] bg-white relative'>
                <div className='p-8 flex flex-col'>
                    <p className='font-medium text-xl'>Driver Information</p>
                    <div className='flex flex-col p-4 gap-4'>
                        <div className='flex flex-col items-start'>
                            <p className='text-lg'>Name</p>
                            <input 
                                type="text" 
                                value={dName} 
                                onChange={(e) => { setDName(e.target.value) }}
                                className='w-full p-4 rounded-lg outline-none border border-1' 
                                placeholder='Enter Driver Name' 
                            />
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-lg'>Phone Number</p>
                            <input 
                                type="text" 
                                value={dPhoneNumber} 
                                onChange={(e) => { setDPhoneNumber(e.target.value) }}
                                className='w-full p-4 rounded-lg outline-none border border-1' 
                                placeholder='Enter Driver Phone Number' 
                            />
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-lg'>Email</p>
                            <input 
                                type="text" 
                                value={dEmail} 
                                onChange={(e) => { setDEmail(e.target.value) }}
                                className='w-full p-4 rounded-lg outline-none border border-1' 
                                placeholder='Enter Driver Email' 
                            />
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-lg'>Car Model/Type</p>
                            <input 
                                type="text" 
                                value={dCarType} 
                                onChange={(e) => { setDCarType(e.target.value) }}
                                className='w-full p-4 rounded-lg outline-none border border-1' 
                                placeholder='Enter Car Type' 
                            />
                        </div>
                        <Button className='p-4' onClick={handleCreate}>Create A driver Profile</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DriverSide;
