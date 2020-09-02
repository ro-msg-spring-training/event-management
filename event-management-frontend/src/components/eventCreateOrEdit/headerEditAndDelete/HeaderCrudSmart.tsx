import React from 'react';
import HeaderDumb from './HeaderCrudDumb';

interface Props {
  saveEvent: any;
  deleteEvent: any;
  isAdmin: boolean;
  title: string;
}

function HeaderSmart({ saveEvent, deleteEvent, isAdmin, title }: Props) {
  let handleEventSave = (): void => {
    saveEvent();
  };

  let handleEventDelete = (): void => {
    deleteEvent();
  };

  return <HeaderDumb isAdmin={isAdmin} title={title} handleEventDelete={handleEventDelete} handleEventSave={handleEventSave} /> 
}

export default HeaderSmart;
