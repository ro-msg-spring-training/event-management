import React from 'react';
import HeaderDumb from './HeaderDumbSaveAndDelete';

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
    // console.log("Save");
    //TODO verifica daca e save pentru NEW Product sau save pentru EDIT Product => poti in EvendDetails la save sa verifici cu newEvent
    //TODO mai fa o data verificari cand dai save
    //TODO fa request ca sa primesti url-urile unde vor fi stocate imaginile------!!!!!!!
    //TODO fa save la ce trebe
    
    // const product: IProductDetailsReady = { id: 51, name: "TEST TEST", category: "mock", price: 0, image: "mock", description: "mock" };
    saveEvent();
    // alert("Header save good hopefully");
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
