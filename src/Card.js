import React from 'react';
import './Card.css';
import {Link } from 'react-router-dom';
import Home from './pages/Home';
import Supplier from "./pages/Supplier";
import Contractor from "./pages/Contractor";

function Card() {
    return (
        <div>
               <section class="cards">
    <article class="card card--1">
      <div class="card__info-hover">
        <svg class="card__like"  viewBox="0 0 24 24">
        
    </svg>
       
         
        
      </div>
      <div class="card__img"></div>
      <a href="https://google.com" class="card_link">
         <div class="card__img--hover"></div>
       </a>
      <div class="card__info">
        <span class="card__category"> GOOGLE</span>
        <h3 class="card__title">CLICK TO VISIT GOOGLE</h3>
        <span class="card__by"> <a href="#" class="card__author" title="author"></a></span>
      </div>
    </article>
      
      
    <article class="card card--3">
      <div class="card__info-hover">
        <svg class="card__like"  viewBox="0 0 24 24">
       
    </svg>
         
        
      </div>
      <div class="card__img"></div>
      <a href="#" >
      <Link to="/Supplier" class="card_link">
         <div class="card__img--hover"></div>
      </Link></a >
      <div class="card__info">
        <span class="card__category"> SUPPLIERS </span>
        <h3 class="card__title">VIEW SUPPLIER DATA</h3>
        <span class="card__by"> 
        <Link to="/Supplier" class="card__author" title="author"></Link>
        <a href="" class="card__author" title="author"></a></span>
      </div>
    </article>  
      
      
    <article class="card card--2">
      <div class="card__info-hover">
        <svg class="card__like"  viewBox="0 0 24 24">
       
    </svg>
         
        
      </div>
      <div class="card__img"></div>
      <Link to="/Contractor" class="card_link">
         <div class="card__img--hover"></div>
      </Link>
      <div class="card__info">
        <span class="card__category"> CONTRACTORS</span>
        <h3 class="card__title">VIEW CONTRACTOR DATA</h3>
        <span class="card__by"> <a href="#" class="card__author" title="author"></a></span>
      </div>
    </article>  
      
      
      </section>
        </div>
    )
}

export default Card
