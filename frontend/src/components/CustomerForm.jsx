import React, { useState,useEffect} from 'react';

function CustomerForm() {

  const [state, setStatus] = useState("Medical");
  const [gender, setGender] = useState("MALE");

  const indistry_list=[
    "Medical",
    "It",
    "Engineering"]

    const gender_list=[
      "MALE",
      "FEMALE"
      ]
  
    // Tenor
    // Status
    // Customer Age
    // Customer Industry
    // Gender
    // Average Karatage
    // Pawning Reason

  return (

        <div style={{ marginTop: '100px', marginBottom: '100px', marginLeft: '200px', marginRight: '200px' }}>

          <div className="row mt-5">
            <div className="col-6">

              <label>Customer Industry</label>

            </div>

            <div className="col-6">

              <div className="btn-group ">
                      <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {state} 
                      </button>
                        <div className="dropdown-menu dropdown-menu-right"  style={{
                                      height: 'auto',
                                      maxHeight: '200px',
                                      overflowX: 'hidden',
                                      zIndex: 9999,
                                      top: '20%'
                                      
                            }}>
                              {indistry_list.map((item, index) => (
                                            <button  className="dropdown-item" type="button" onClick={() => setStatus(item)}>{item}</button>
                                            ))
                                }
                        </div>
                  </div>
              
            </div>


          </div>

          <div className="row mt-5">
            <div className="col-6">

              <label>Gender</label>

            </div>

            <div className="col-6">

              <div className="btn-group ">
                      <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {gender} 
                      </button>
                        <div className="dropdown-menu dropdown-menu-right"  style={{
                                      height: 'auto',
                                      maxHeight: '200px',
                                      overflowX: 'hidden',
                                      zIndex: 9999,
                                      top: '20%'
                                      
                            }}>
                              {gender_list.map((item, index) => (
                                            <button  className="dropdown-item" type="button" onClick={() => setGender(item)}>{item}</button>
                                            ))
                                }
                        </div>
                  </div>
              
            </div>

          </div>

          <div className="row mt-5">
            <div className="col-6">

              <label>Pawning Reason</label>

            </div>

            <div className="col-6">

              <div className="btn-group ">
                      <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {state} 
                      </button>
                        <div className="dropdown-menu dropdown-menu-right"  style={{
                                      height: 'auto',
                                      maxHeight: '200px',
                                      overflowX: 'hidden',
                                      zIndex: 9999,
                                      top: '20%'
                                      
                            }}>
                              {indistry_list.map((item, index) => (
                                            <button  className="dropdown-item" type="button" onClick={() => setStatus(item)}>{item}</button>
                                            ))
                                }
                        </div>
                  </div>
              
            </div>

          </div>

          

            {/* <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
            </form> */}

    </div>

   
   
  )
}

export default CustomerForm