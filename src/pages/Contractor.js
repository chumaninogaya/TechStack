import '../Table.css';
import React, { useState,useEffect } from "react";
import axios from 'axios';
import BootstrapTable  from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import useFullPageLoader from "../useFullPageLoader";
const Contractor = () => {
   
    // const [percontract, setPercontract] = useState([]);
    const [contractors, setContractor] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
      const[modalInfo, setModalInfo] = useState([]);
      const [showModal, setShowModal] = useState(false);

      const[show,setShow]= useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const getContractorData= async () => {
        showLoader();
        try{
            const data=await axios.get(
                "https://dskapi.azurewebsites.net/api/GetContractMasterDatas"
            );
          
            setContractor(data.data)
            hideLoader();
    }catch (e) {
        console.log(e);
    }
        
    };
   

    useEffect(() => {
        getContractorData();
    },[]);

    const columns =[ 
        {dataField: "contractDataID",text: "contractDataID Name "},
        {dataField: "department",text: "Contract Term"},
        {dataField: "buyer",text: "Contractor Description"},
        {dataField: "documentNo",text: "contractDataID Name "},
        {dataField: "zfsCode",text: "Contract Term"},
        {dataField: "commodity",text: "Contractor Description"},
    
    ];


    const rowEvents ={
      onClick: (e,row)=> {
        console.log(row);
        setModalInfo(row)
        toggleTrueFalse()
      },
    };

    const toggleTrueFalse= () => {
      setShowModal(handleShow);
    };

 
    const ModalContent = () => {
     
    //   const getContractor= async () => {
    //     try{
    //     const res = await axios.get('https://dskapi.azurewebsites.net/api/GetAllContractCaputredData', {
    //       params: {
    //         contractDataID: modalInfo.contractDataID
    //       }
    //    });
    //    setPercontract(res.data)
    //   }catch (e) {
    //     console.log(e);
    // }
        
      

    
    //   };
    //   useEffect(() => {
    //     getContractor();
    // },[]);

      return (
        
        <Modal show= {show} onHide ={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.department}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <center>
           <h1> Contractor </h1>
           <label>department code</label> &nbsp;  &nbsp;  &nbsp; 
           <input type="text" value={modalInfo.department}></input>
           <br/> <label>Buyer</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <input type="text" value={modalInfo.buyer}></input>
          <br></br>
            <label>Commodity</label> &nbsp; 
            <input type="text" value={modalInfo.commodity}></input>
           </center>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
             {show ? <ModalContent/> : null}
             {loader}
        </div>
    );
};
export default Contractor;
