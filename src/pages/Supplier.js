import '../Table.css';
import React, { useState,useEffect } from "react";
import axios from 'axios';
import BootstrapTable  from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import useFullPageLoader from "../useFullPageLoader";
const Supplier = () => {
   
    const [suppliers, setSuppliers] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
      const[modalInfo, setModalInfo] = useState([]);
      const [showModal, setShowModal] = useState(false);

      const[show,setShow]= useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      // const params = JSON.stringify({
      //   "month":8,
      //   "year":2019
      // });
      const getSupplierData= async () => {
        showLoader();
        try{
            const data=await axios.get(
              // "https://swapi.dev/api/people"
              // "https://nba-players.herokuapp.com/players-stats"
               "https://dskapi.azurewebsites.net/api/GetSupplierMasterDatas",{
                   dataYear:2019,
                   dataMonth:8
                 
               }
            );
                
            setSuppliers(data.data)
            hideLoader();
    }catch (e) {
        console.log(e);
    }
        
    };

    useEffect(() => {
        getSupplierData();
    },[]);

    const columns =[ 
      // {dataField: "games_played",text: "Supplier ID "},
      // {dataField: "team_name",text: "Supplier Name"},
      // {dataField: "field_goals_made_per_game",text: "Products"},
      // {dataField: "three_point_made_per_game",text: "yearDiff"},
       
        {dataField: "supplierDataID",text: "dataYear"},
         {dataField: "dataYear",text: "dataYear "},
        // {dataField: "certusYear",text: "Cerus Year"},
        // {dataField: "buyerComment",text: "Comment"},
        // {dataField: "blackDesignatedGroupSupplier",text: "Group Supplier"},
     ];


    const rowEvents ={
      onClick: (e,row)=> {
        console.log(row);
        setModalInfo(row)
        toggleTrueFalse()
      },
    };
    const searchResults =() =>{
      //code to retrieve the api with parameter
    }

    const toggleTrueFalse= () => {
      setShowModal(handleShow);
    };

    const ModalContent = () => {
      return (
        <Modal show= {show} onHide ={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.team_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <center>
           <h1> Supplier </h1>
           
           <label>supplier name</label> &nbsp;  &nbsp;  &nbsp; 
           <input type="text" value={modalInfo.team_name}></input>
           <br/> <label>Products</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <input type="text" value={modalInfo.field_goals_made_per_game}></input>
          <br></br>
            <label>Black designated group</label> &nbsp; 
            <input type="text" value={modalInfo.name}></input>
          </center>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );

    }

    return (
        <div className="supplier">
            <center>
            <h1>Supplier Reports</h1>
            </center>

            <label for="month"> Month:</label>
            <select name="month" id="month">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
              
            </select>
            &nbsp;&nbsp;
            <label for="year"> Year:</label>
            <select name="year" id="year">
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            </select>
            &nbsp;&nbsp;
            <Button onClick={searchResults}>
              Search
            </Button>
            
             <BootstrapTable
             
             keyField="name"
             data={suppliers}
             columns={columns}
             pagination={paginationFactory()}
              rowEvents={rowEvents}

             />
             {show ? <ModalContent/> : null}
             {loader}
        </div>
    );
};
export default Supplier;
