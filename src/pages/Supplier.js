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
    const[supplierModal, setSupplierModal]=useState();
    const[year, setYear] = useState("");
    const[month, setMonth] = useState("");

    const[supplierCapturedDataId, setSupplierCapturedDataId]= useState();
    const[supplierCapturedData, setSupplierCapturedDate] = useState([]);
    const[cerYear, setCerYear] = useState();
    const[buyerCom, setBuyerCom] = useState(); 
    const[designGroupSupp, setDesignGroupSupp] = useState();


//let month = 1;
//let year = 2015;

      const[show,setShow]= useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);



   const getSupplierData = async () => {
    showLoader();
    let data = JSON.stringify({
      // "month": 8,
      // "year": 2019
      "month": Number(`${month}`),
      "year": Number(`${year}`)
    });
    var config = {
      method: 'post',
      url: 'https://dskapi.azurewebsites.net/api/GetSupplierMasterDatas',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try {
      const data = await axios(config );
      setSuppliers(data.data)
      hideLoader();
    console.log(data)
    } catch (e) {
      console.log(e);
    }
  };


    useEffect(() => {
        getSupplierData();
    },[]);

    const columns =[ 
     
        // {dataField: "supplierDataID",text: "supplierDataID"},
        {dataField: "dataYear",text: "Year "},
        {dataField: "dataMonth",text: "Month"},
        {dataField: "zfsCode",text: "ZFS Code"},
        {dataField: "localSupplierCode",text: "Local Supplier Code "},
        {dataField: "supplier",text: "Supplier"},
        {dataField: "buyer",text: "Buyer"},
        {dataField: "bbbeeLevel",text: "Bbbee Level"},
        {dataField: "levelScore",text: "Level Score"},
        {dataField: "bbbeeCertFrom",text: "Cert From "},
        {dataField: "bbbeeCertTo",text: "Cert To"},
        {dataField: "globusYear",text: "Globus Year"},
        {dataField: "valid",text: "Valid"},
        {dataField: "bbbeeType",text: "Type"},
        {dataField: "bbbVoBEuro",text: "BbbVoB eURO"},
        {dataField: "blackOwnedPercentage",text: "Black Owned Percentage "},
        {dataField: "blackWomenOwnedPercentage",text: "Black Women owned"},
        {dataField: "valueAddingSupplier",text: "Value Addidng supplier"},
         
        {dataField: "nation",text: "Nation"},
        {dataField: "department",text: "Department"},
        {dataField: "voBEuro",text: "VoBEuro"},
        {dataField: "certValidty",text: "Cert Validity"},



     ];


    //  const getSupplierModalData = async () => {
    //   var config = {
    //     method: 'get',
    //     url: 'https://dskapi.azurewebsites.net/api/GetSupplierCapturedData',
    //     headers: { 
    //       'Content-Type': 'application/json'
    //     },
    //     params :{ "supplierDataID" :'8e08aac5-de4c-4a15-b735-7a67d5e67ed9',
    //     },
    //   };
    //   try {
    //     const modaldata = await axios(config );
    //     setSupplierModal(modaldata.data)
       
    //   console.log(modaldata)
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    


    const rowEvents ={
      onClick: (e,row)=> {
        
        console.log(row);
        let capturedata = getSupplierCapturedData(row.supplierDataID)
        setSupplierCapturedDate(capturedata)
        setSupplierCapturedDataId(capturedata["supplierCaptureDataID"])
        setCerYear(capturedata["certusYear"])
        setDesignGroupSupp(capturedata["blackDesignatedGroupSupplier"])
        setBuyerCom(capturedata["buyerComment"])
        setModalInfo(row)
        toggleTrueFalse()
      },
    };
 
     function searchResults(){
  
    getSupplierData();
     };
  
    const toggleTrueFalse= () => {
      setShowModal(handleShow);
    };
    const getSupplierCapturedData = (capId) =>{
      let supplierCapturedArray = suppliers.map(function (suppCapture){
        if(suppCapture.supplierDataID === capId){
          return suppCapture
        }
      })
      let supplier = supplierCapturedArray.filter(function (e) {return e != null;})
    
      return supplier[0]["captureData"][0]

    }


    const SaveCapturedData = () =>{

      let data = JSON.stringify({
        "buyerComment":buyerCom,
        "blackDesignatedGroupSupplier":designGroupSupp,
        "certusYear":cerYear
      });
      // const response = await axios.put(`https://dskapi.azurewebsites.net/api/PutSupplierCapturedData/${supplierCapturedDataId}`, data)
      // .then(response => this.setState({ updatedAt: response.data.updatedAt }))
      // .catch(error => {
      //     this.setState({ errorMessage: error.message });
      //     console.error('There was an error!', error);
      // });
    }



    const ModalContent = () => {
    //  const getSupplierCapturedData = (capId) =>{
    //   let supplierCapturedArray = suppliers.map(function (suppCapture){
    //     if(suppCapture.supplierDataID === id){
    //       return suppCapture
    //     }
    //   })

    
  
     
      return (
        <Modal show= {show} onHide ={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalInfo.supplier}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <center>
         {/* <input type="text" value={supplierCapturedDataId}></input> */}
           <br/> <label>Black Designated Group</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
           <select defaultValue={designGroupSupp} onChange={(e) => setDesignGroupSupp(e.target.value)} >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
          <br></br>
            <label>Buyer Comment</label> &nbsp; 
            <input type="text" value={buyerCom && buyerCom} onChange={(e) => setBuyerCom(e.target.value)}></input>
           <br></br> <label>Cert Year</label> &nbsp; 
            <input type="number" value={cerYear} onChange={(e) => setCerYear(e.target.value)}></input>
          </center>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={SaveCapturedData}>
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
            <select  id="selectMonth" onChange={(e) => setMonth(e.target.value)}>
      
            {/* <select  onChange={monthChange}> */}
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep </option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
              
            </select>
            &nbsp;&nbsp;
       
            <label for="year"> Year:</label>
            <select id="selectYear" onChange={(e) => setYear(e.target.value)} >
            
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            </select>
            &nbsp;&nbsp;
            <Button onClick={() => searchResults()}>
            {/* <Button> */}
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
