import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import "./Auth.css";

interface FormData {
  first_name: string;
  last_name: string;
  sid: string;
  phone_number: string;
  address: string;
  postal_code: string;
  password: string;
}

async function RegisterReq({
  first_name,
  last_name,
  sid,
  phone_number,
  address,
  postal_code,
  password,
}: FormData): Promise<any> {
  const req = {
    first_name,
    last_name,
    sid,
    phone_number,
    address,
    postal_code,
    password,
  };
  console.log(req);

  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function Register() {
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        sid: "",
        phone_number: "",
        address: "",
        postal_code: "",
        password: "",
    });
    const [tryAgain, setTryAgain] = useState("")
    const navigate = useNavigate();
    
    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await RegisterReq(formData);
            console.log(response);

            if (response.status) {
                alert(response.result)
                navigate('/login')
            } else {
                setTryAgain(response.result)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div className="register-page">
      <Link to="/" className="back-link">
        Back
      </Link>
      <div className="bulbee">Bulbee</div>
      <div className="auth-title">Create an Account</div>
      <form onSubmit={handleSubmit}>
        <div className="form-card">
          <div>
            <label htmlFor="first_name" className="auth-text-field-label">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
              placeholder="Enter your first name"
              className="auth-text-field"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="auth-text-field-label">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
              placeholder="Enter your last name"
              className="auth-text-field"
              required
            />
          </div>
          <div>
            <label htmlFor="sid" className="auth-text-field-label">
              Student ID
            </label>
            <input
              type="text"
              name="sid"
              value={formData.sid}
              onChange={handleFormChange}
              className="auth-text-field"
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="auth-text-field-label">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleFormChange}
              className="auth-text-field"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="auth-text-field-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              className="auth-text-field"
              required
              // style={height: 300px}
            />
          </div>
          <div>
            <label htmlFor="postal_code" className="auth-text-field-label">
              Postal Code
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleFormChange}
              className="auth-text-field"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="auth-text-field-label">
              Password
            </label>
            <input
              type="password" // "password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="auth-text-field"
              required
            />
          </div>
          <div className='not-auth-text'>
                {tryAgain}
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
          <Link to="/login" className="redirect-text">
            Already have an account? Log in here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
