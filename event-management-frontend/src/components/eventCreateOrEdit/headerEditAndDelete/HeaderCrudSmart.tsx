import React from 'react';
import HeaderDumb from './HeaderCrudDumb';

interface Props {
  saveEvent: any;
  deleteEvent: any;
  isAdmin: boolean;
  title: string;
}

function HeaderSmart({ saveEvent, deleteEvent, isAdmin, title }: Props) {
  return <HeaderDumb isAdmin={isAdmin} title={title} handleEventDelete={deleteEvent} handleEventSave={saveEvent} /> 
}

export default HeaderSmart;
