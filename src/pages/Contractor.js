import '../Table.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button, ToggleButton } from "react-bootstrap";
import useFullPageLoader from "../useFullPageLoader";

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const Contractor = () => {

  const [contractors, setContractor] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contractorModal,setContractorModal]=useState([]);
  const [contractorCapturedData,setContractorCapturedData]=useState([]);
  const[contractorCapturedDataId, setContractorCapturedDataId]= useState();
  const[divisionalHead, setDivisionalHead]= useState();

   const[contractCaptureDataID, setContractCaptureDataID]=useState();
   const[captureData, setCaptureData] = useState();
   const[comment, setComment] = useState();
   const[ledSplit, setLedSplit] = useState();
   const[plantRelavent, setPlantRelavent] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getContractorData = async () => {
    showLoader();
    try {
      const data = await axios.get(
        "https://dskapi.azurewebsites.net/api/GetContractMasterDatas"
      );

      setContractor(data.data)
      hideLoader();
      console.log(data)
    } catch (e) {
      console.log(e);
    }
    

  };


  useEffect(() => {
    getContractorData();
  }, []);




  const columns = [
    { dataField: "contractDataID", text: "contractDataID Name " },
    { dataField: "department", text: "Contract Term" },
    { dataField: "buyer", text: "Contractor Description" },
    { dataField: "documentNo", text: "contractDataID Name " },
    { dataField: "commodity", text: "Commodity" },
    { dataField: "zfsCode", text: "Contract Term" },
    { dataField: "supplier", text: "Supplier" },
    { dataField: "approvalDate", text: "Approval Date" },
    { dataField: "creationDate", text: "Creation Date" },
    { dataField: "purchContTitle", text: "Purchase Content Title" },
    { dataField: "volumeNewActEuro", text: "Volume" },
    { dataField: "estRands", text: "East Rands" },
    { dataField: "beginMonth", text: "Begin Month" },
    { dataField: "endMonth", text: "End Month" },
    { dataField: "monthEnding", text: "Month Ending" },
    { dataField: "endYear", text: "End Year" },
    { dataField: "numberOfMonths", text: "Number of Months" },
    { dataField: "statusValidity", text: "Status Validity" },
    { dataField: "compBid", text: "CompBid" },
    { dataField: "sapPurchaseOrderNo", text: "SAAPurchase Order No" },


  ];


  const getContractorCapturedData = (capId) => {
    let contractorCapturedArray =contractors.map(function(contrCapture)
    {
      if(contrCapture.contractDataID===capId) {
        return contrCapture
      }
    })  
  

  let  contractor=contractorCapturedArray.filter(function (e) {return e!=null})
  return contractor[0] ["captureData"] [0]
}




  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      let capturedata = getContractorCapturedData(row.contractDataID)
      setContractCaptureDataID(capturedata["contractCaptureDataID"])
      setContractorCapturedData(capturedata)
      setLedSplit(capturedata["ledSplit"])
      setPlantRelavent(capturedata["plantRelevant"])
      setComment(capturedata["comment"])
      setModalInfo(row)
      toggleTrueFalse()
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };


  const ModalContent = () => {

    
    return (

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.department}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <h1> Contractor </h1>
            <br/>   
            <label>LED Split
              </label>     
              <select defaultValue={ledSplit && ledSplit} >
                <option value="MBSA">MBSA</option>
                <option value="DTBSA">DTBSA</option>
                <option value="MBFS">MBFS</option>
                <option value="Trucks">Trucks</option>
                <option value="Vans">Vans</option>
                <option value="SMH">SMH</option>
              </select>
              <br>
              </br>
              <label>Comment</label>
              <input type="text" value={comment && comment}></input>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

  }

  return (
    <div className="Contractor">
      <center>
        <h1>Contractor Data</h1>
      </center>

      <BootstrapTable

        keyField="name"
        data={contractors}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}

      />
      {show ? <ModalContent
      
      
      /> : null}
      {loader}
    </div>
  );
};
export default Contractor;
