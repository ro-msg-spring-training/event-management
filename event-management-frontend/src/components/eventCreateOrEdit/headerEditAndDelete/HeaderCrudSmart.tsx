import React from 'react';
import HeaderDumb from './HeaderCrudDumb';

interface IProductBase {
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase {
  id: number,
  price: number
}

interface Props {
  saveEvent: any,
  deleteEvent: any,
  admin: boolean,
  title: string,
}

function HeaderSmart({ saveEvent, deleteEvent, admin, title }: Props) {

  let handleSave = (): void => {
    saveEvent();
    // history.push('/');
  }

  let handleDelete = (): void => {
    deleteEvent();
  }

  return (
    <>
      <HeaderDumb admin={admin} title={title} handleDelete={handleDelete} handleSave={handleSave}/>
    </>
  );
}

export default HeaderSmart;
