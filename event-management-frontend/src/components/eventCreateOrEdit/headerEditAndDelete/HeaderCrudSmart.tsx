import React from 'react';
import HeaderDumb from './HeaderCrudDumb';

interface Props {
  saveEvent: any;
  deleteEvent: any;
  admin: boolean;
  title: string;
}

function HeaderSmart({ saveEvent, deleteEvent, admin, title }: Props) {
  let handleEventSave = (): void => {
    saveEvent();
  };

  let handleEventDelete = (): void => {
    deleteEvent();
  };

  return <HeaderDumb admin={admin} title={title} handleEventDelete={handleEventDelete} handleEventSave={handleEventSave} /> 
}

export default HeaderSmart;
