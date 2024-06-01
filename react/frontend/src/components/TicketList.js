import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token'); // Assume token is stored here
            try {
                const response = await axios.get('/api/tickets/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTickets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tickets', error);
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl mb-4">My Tickets</h2>
            {tickets.map(ticket => (
                <div key={ticket.id} className="border p-4 mb-4 rounded">
                    <h3 className="text-xl">{ticket.title}</h3>
                    <p>{ticket.description}</p>
                    <p><strong>Type:</strong> {ticket.type}</p>
                    <p><strong>Status:</strong> {ticket.status}</p>
                    {ticket.response && <p><strong>Response:</strong> {ticket.response}</p>}
                </div>
            ))}
        </div>
    );
};

export default TicketList;
