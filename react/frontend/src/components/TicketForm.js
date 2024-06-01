import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('bug');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assume token is stored here

        try {
            const response = await axios.post('/api/tickets/', {
                title,
                description,
                type,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Ticket created successfully!');
        } catch (error) {
            setMessage('Error creating ticket.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Submit a Ticket</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Description</label>
                <textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    rows="4"
                    required 
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="type">Type</label>
                <select 
                    id="type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="bug">Bug</option>
                    <option value="feature">Feature Request</option>
                    <option value="support">Support</option>
                </select>
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default TicketForm;
