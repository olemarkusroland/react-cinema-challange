import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { TicketsItem } from './ticketsItem/TicketsItem';
import './TicketsList.css';

export const TicketsList = () => {
  const [tickets, setTickets] = useState([
    { id: 1, name: 'Adult', price: 205, info: null },
    { id: 2, name: 'Child/Youth', price: 185, info: "Up too and ncluding 14 year." },
    { id: 3, name: 'Military', price: 185, info: "You will be required to document your right to a discount with a draft letter (travel to/from initial compulsory military service) or student ID for the military school." },
    { id: 4, name: 'Senior citizen', price: 185, info: null },
    { id: 5, name: 'Student', price: 145, info: "You will be required to document your right to discout with a student ID." },
    { id: 6, name: 'Bob', price: 145, info:"You will be required to document that your name is Bob with valid ID." }
  ]);

  const [quantities, setQuantities] = useState(
    tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );

  const handleAdd = (id) => {
    setQuantities({ ...quantities, [id]: (quantities[id] || 0) + 1 });
  };

  const handleRemove = (id) => {
    setQuantities({ ...quantities, [id]: Math.max((quantities[id] || 0) - 1, 0) });
  };

  const totalTickets = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price * (quantities[ticket.id] || 0), 0);

  return (
    <Box className="ticket-list">
      {tickets.map(ticket => (
        <TicketsItem 
          key={ticket.id}
          name={ticket.name}
          price={ticket.price}
          quantity={quantities[ticket.id] || 0}
          info={ticket.info}
          onAdd={() => handleAdd(ticket.id)}
          onRemove={() => handleRemove(ticket.id)}
        />
      ))}
      <Paper elevation={2} className="summary">
        <div className='ticket-count'>
            <Typography variant="h6">{totalTickets} Tickets</Typography>
            <Typography variant="h6">kr {totalPrice}</Typography>
        </div>
        <Button variant="contained" className="next-button" fullWidth>
            Next
        </Button>
      </Paper>
    </Box>
  );
};
