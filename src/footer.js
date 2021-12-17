import React from 'react';
import './footer.css';

function footer() {
    return (
        <div>
            <br/>
            <div className='footer-dark'>
                <footer>
                    <div class='container'>
                        <div class='row'>
                        <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                      
                        </ul>
                    </div>
                  
                    <div class="col item social"><a href="https://www.facebook.com"><i class="icon ion-social-facebook"></i></a><a href="https://twitter.com"><i class="icon ion-social-twitter"></i></a><a href="https://www.instagram.com"><i class="icon ion-social-instagram"></i></a></div>
               
                        </div>
                        <p class="copyright">Tech Stack © 2021</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default footer
