import React, { useState } from "react";
import AddServiceForm from "./AddServiceForm";
import DisplayServices from "./DisplayServices";

export const SERVICES = [
  { id:'1', name: "split Ac check up", cost: 250 },
  { id:'2', name: "AC Gas Charging upto 1 ton", cost: 1500 },
  { id:'3', name: "Ac Relocation", cost: 3000 },
  { id:'4', name: "Split ac install + un-install on same address", cost: 2200 },
  { id:'5', name: "Window AC Check-up", cost: 300 },
];

const Services = () => {
  const [serviceInfo, setServiceInfo] = useState(SERVICES);

  const AddService = (serviceName, serviceCost) => {      // Add services
    setServiceInfo((prevServices) => {
      return [
        ...prevServices, {id: Math.floor(Math.random() * 100), name: serviceName, cost: serviceCost}];
    });
  };

  const DeleteService = (id) => {
    setServiceInfo((prevServices) => {
      return prevServices.filter((service) => service.id!==id)
    });
  }


  return (
    <div class="container-fluid">
      <div className="row ">
        <h2 className="text-center mb-3">Add AC Services provided to the Customer</h2>
        <div className="d-flex col-md-6">
          <AddServiceForm addService={AddService} />
        </div>
        <div className="d-flex col-md-6">
          <DisplayServices services={serviceInfo} deleteService={DeleteService}/>
        </div>
      </div>
    </div>
  );
};

export default Services;
