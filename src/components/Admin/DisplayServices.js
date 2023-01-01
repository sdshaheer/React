import React  from "react";
import { MdDelete } from "react-icons/md";
import background from './Services.module.css'
//import { TiEdit } from "react-icons/ti";

const DislayServices = (props) => {

  //const [service,clickedService] = useState({id:null});

  const handleDelete = (id) =>{
    props.deleteService(id);
  }
  
  return (
    <div className="container md mt-5 ">
      {props.services.map((service) => (
        <div className={`row mb-3 p-4 rounded-3 shadow-sm ${background['services-background']}`} key={service.id}>
          <div className="col-md-8 justify-content-start">
            <div className="row">
              <div className="col-md-10 mr-3 justify-content-start">
                <b>{service.name}</b>
              </div> 
              <div className="col-md-2 justify-content-end float-end">
                <b className='text-white d-flex justify-content-end'>₹ {service.cost}</b>
              </div>
            </div>
          </div>
          <div className="d-flex col-md-4 justify-content-end">
            <span>
              <MdDelete size="1.25rem" onClick = {() => handleDelete(service.id)}/>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DislayServices;
