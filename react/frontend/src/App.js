import React from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

const App = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-center mb-10">Ticketing System</h1>
            <TicketForm />
            <TicketList />
        </div>
    );
};

export default App;
