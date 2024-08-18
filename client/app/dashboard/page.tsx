'use client'
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import Link from 'next/link';



const Page: React.FC = () => {
    // State for exercise info
    const [timePeriod, setTimePeriod] = useState('');
    const [exerciseTime, setExerciseTime] = useState('');

    // Define color scheme
    const colors = {
        primary: '#246A73',  // Dark Greenish-Blue
        secondary: '#F3DFC1',  // Cream
        accent: '#E8D2B1',  // Light Beige
        buttonBackground: '#02542D',  // Dark Green
    };

    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: colors.secondary,
            }}>
                <div style={{ padding: '20px', maxWidth: '600px', width: '100%', fontFamily: 'Arial, sans-serif', backgroundColor: colors.secondary, borderRadius: '10px' }}>
                    <h1 style={{ color: colors.primary, marginBottom: '20px', textAlign: 'center' }}>My Physiotherapy Progress: 7 days non-stop | 20 days total</h1>

                    {/* Personal Information */}
                    <div style={{ marginBottom: '20px', backgroundColor: colors.accent, padding: '15px', borderRadius: '8px' }}>
                        <h2 style={{ color: colors.primary }}>Personal Information</h2>
                        <p><strong>Name:</strong> John Cena</p>
                        <p><strong>Age:</strong> 43</p>
                        <p><strong>Gender:</strong> Male</p>
                        <p><strong>Country:</strong> Canada</p>
                    </div>

                    {/* Medical Information */}
                    <div style={{ marginBottom: '20px', backgroundColor: colors.accent, padding: '15px', borderRadius: '8px' }}>
                        <h2 style={{ color: colors.primary }}>Medical Information</h2>
                        <p><strong>Hospital:</strong> Credit Valley General Hospital</p>
                        <p><strong>Medical Condition:</strong> Knee Replacement surgery</p>
                    </div>

                    {/* Exercise Information */}
                    <div style={{ backgroundColor: colors.accent, padding: '15px', borderRadius: '8px' }}>
                        <h2 style={{ color: colors.primary }}>Exercise Information</h2>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                           Your recommended exercise time period is: 60 days
                        </label>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                            When during your day are you planning on exercising?
                            <input
                                type="text"
                                value={exerciseTime}
                                onChange={(e) => setExerciseTime(e.target.value)}
                                style={{
                                    display: 'block',
                                    margin: '8px 0',
                                    padding: '8px',
                                    width: '100%',
                                    border: `1px solid ${colors.primary}`,
                                    borderRadius: '4px',
                                }}
                            />
                        </label>
                        <Link href='/exercise-details'>
                            <button style={{
                                padding: '10px 20px',
                                marginTop: '10px',
                                cursor: 'pointer',
                                backgroundColor: colors.buttonBackground,
                                color: colors.secondary,
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                width: '100%',
                            }}>
                                Start My Physio!
                            </button> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
