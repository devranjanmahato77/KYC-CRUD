import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", pan: "", gst: "" , account: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    const finalValues = { username: "", pan: "", gst: "" , account: ""};
    setFormValues(finalValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    
    const errors = {};
    const regexPAN = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    // TEST GST ID: 05ABDCE1234F1Z2
    const regexGST = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    // const regexACC = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    
    if (!values.username) {
      errors.username = "Name is required!";
    }
    
    if (!values.pan) {
      errors.pan = "PAN Number is required!";
    } else if (!regexPAN.test(values.pan)) {
      errors.pan = "This is not a valid PAN Number!";
    }
    
    if (!values.gst) {
      errors.gst = "GST ID is required";
    } else if (!regexGST.test(values.gst)) {
      errors.gst = "This is not a valid GST ID!";
    }

    if (!values.account) {
      errors.account = "GST ID is required";
    } else if (values.account.length <= 9 || values.account.length >= 18) {
      errors.account = "This is not a valid Account Number!";
    }
    
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Submitted successfully</div>
      ) : (
        // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <h3 style={{color: "white"}}>Please fill the form for verification</h3>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Mediology KYC 2022</h1>
        
        <div className="ui divider"></div>
        <div className="ui form">
          
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          
          <div className="field">
            <label>PAN Number</label>
            <input
              type="text"
              name="pan"
              placeholder="PAN Number"
              value={formValues.pan}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.pan}</p>
          
          <div className="field">
            <label>GST ID</label>
            <input
              type="text"
              name="gst"
              placeholder="GST ID"
              value={formValues.gst}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.gst}</p>
          
          <div className="field">
            <label>Bank Account Number</label>
            <input
              type="text"
              name="account"
              placeholder="Account Number"
              value={formValues.account}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.account}</p>

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
