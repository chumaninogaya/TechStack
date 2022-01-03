
import React, { useState,useEffect } from "react";
import axios from 'axios';
import BootstrapTable  from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
const Contractor = () => {
   
    const [contractors, setContractor] = useState([]);
   
      const[modalInfo, setModalInfo] = useState([]);
      const [showModal, setShowModal] = useState(false);

      const[show,setShow]= useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const getContractorData= async () => {
        try{
            const data=await axios.get(
                "https://nba-players.herokuapp.com/players-stats"
            );
            setContractor(data.data)
    }catch (e) {
        console.log(e);
    }
        
    };

    useEffect(() => {
        getContractorData();
    },[]);

    const columns =[ 
        {dataField: "name",text: "Contractor Name "},
        {dataField: "points_per_game",text: "Contract Term"},
        {dataField: "team_name",text: "Contractor Description"},
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
      return (
        <Modal show= {show} onHide ={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <center>
           <h1> Contractor </h1>
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
        </div>
    );
};
export default Contractor;
