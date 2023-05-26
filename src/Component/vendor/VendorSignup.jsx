import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/logo.png';
// import VendorSign from '../../assets/login-img.svg';
import signup from '../../assets/sign1.webp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { API } from '../../config/Api';
import Signup from '../SignUp';

function VendorSignup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState('')
    const [urlError, setUrlError] = useState('');
    const [shopifyUrl, setShopifyUrl] = useState('')
    const [instagramUrl, setInstagramUrl] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUserBlank,setisUserBlank]=useState(false);
    const [isEmailBlank,setisEmailBlank]=useState(false);
    const [isPassBlank,setisPassBlank]=useState(false);
    const [isCpassBlank,setisCpassBlank]=useState(false);
    const [isShopifyBlank,setisShopifyBlank]=useState(false);
    const [isInstaBlank,setisInstaBlank]=useState(false);
    const [confirmType, setConfirmType] = useState(false);
    const navigate = useNavigate();
    

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword,setShowCPassword]=useState(false)

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmVisibility = () => {
        setConfirmType(!confirmType);
    };

    console.log("Selected File", selectedFile)

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleShopify = (event) => {
        const url = event.target.value;
        setShopifyUrl(url);
      
        if (url === '') {
          setUrlError('');
          return;
        }

        const urlPattern = /^[\w.-]+\.[a-zA-Z]{2,}$/;
        if (!urlPattern.test(url)) {
          setUrlError('Invalid URL');
        } else {
          setUrlError('');
        }
    };

    const handleInstagram = (event) => {
        setInstagramUrl(event.target.value);
    }

    const createVendor = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',selectedFile);
        formData.append('username', name);
        formData.append('category', category);
        formData.append('instagram_url', instagramUrl);
        formData.append('email', email);
        formData.append('shopify_url', shopifyUrl);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('type','normal');
        console.log(formData);
        setisUserBlank(false);
        setisEmailBlank(false);
        setisPassBlank(false);
        setisCpassBlank(false);
        setisShopifyBlank(false);
        setisInstaBlank(false);
        if(name.length>30){
            setisUserBlank(true);
            return toast.warn("Username should not be more than 30 characters.");
        }
        if(email.length>30){
            setisEmailBlank(true);
            return toast.warn("Email should not be more than 30 characters.");
        }
        if(password.length>30){
            setisPassBlank(true);
            return toast.warn("Password should not be more than 30 characters.");
        }
       
        if(shopifyUrl.length>30){
            setisShopifyBlank(true);
            return toast.warn("Shopify url should not be more than 30 characters.");
        }
        if(instagramUrl.length>30){
            setisInstaBlank(true);
            return toast.warn("Instagram url should not be more than 30 characters.");
        }
      
        
        axios.post(API.BASE_URL + 'campaign/vendor/register/',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then(function (response) {
            console.log("Created New Vendor", response);
            toast.success("Signup Successfully!");
            navigate('/vendor-signin');
        })
          .catch(function (error) {
            console.log(error);
             if(error.response.data.username) {
                setisUserBlank(true)
                toast.warn("Username may not be blank.");
            }
            else if(error.response.data.email== "user with this email already exists.") {
                toast.warn("User with this email already exists.");
            }
            else if(error.response.data.email == "This field may not be blank.") {
                setisEmailBlank(true)
                toast.warn("Email may not be blank.");
            }
            else if(error.response.data.email == "Enter a valid email address.") {
                toast.warn("Enter a valid email address");
            }
            else if(error.response.data.password == "Password must be more than 8 character.") {
                toast.warn("Password must be more than 8 character.");
            }
            else if(error.response.data.password == "This field may not be blank.") {
                setisPassBlank(true)
                toast.warn("Password may not be blank.");
            }
            else if(error.response.data.confirm_password == "This field may not be blank.") {
                setisCpassBlank(true)
                toast.warn("Confirm Password may not be blank.");
            }
            else if(error.response.data.shopify_url == "Shopify_url cannot be empty") {
                setisShopifyBlank(true)
                toast.warn("Shopify url cannot be empty");
            }
            else if(error.response.data.shopify_url == "user with this shopify url already exists.") {
                toast.warn("User with this shopify url already exists.");
            }
            else if(error.response.data.instagram_url == "instagram_url cannot be empty") {
                setisInstaBlank(true)
                toast.warn("Instagram url cannot be empty");
            }
            else if(error.response.data.non_field_errors == "Password fields did not match.") {
                toast.warn("Passwords did not match");
            }else if(error.response.data.email== "user with this email already exists.") {
                toast.warn("User with this email already exists.");
            }
          })
    }

    
  return (
    <div className="margin-outer-signup vendor-sign" >
        <div className="vendor-sign-container d-md-flex">
            <div className="vendor-sign-img col-md-6 p-0" >
                <div className='col-md-6 left-desktop w-100'>
                <img src={signup} alt="vendor-signup"  />
                </div>
            </div>
            <div className="vendor-sign-content col-md-6 px-3 px-lg-5 d-flex flex-column align-items-center justify-content-center">
                <h3 className='mb-4'>Merchant Sign Up</h3>
                <form className='d-flex flex-wrap justify-content-between align-items-center w-100'>
                <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Username<strong style={{color: 'red'}}>*</strong></label>
                        <input type="text" className='mb-0' maxLength='30' value={name} onChange={handleName} />
                    </div>
                    
                    <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Email<strong style={{color: 'red'}}>*</strong></label>
                        <input type="email" maxLength='35' className='mb-0' value={email} onChange={handleEmail} />
                    </div>
                    
                    <div className="input-field position-relative">
                        <label className='text-start w-100 mb-2 text-dark'>Password<strong style={{color: 'red'}}>*</strong></label>
                        <input type={showPassword ? 'text' : 'password'} maxLength='30' className='mb-0' value={password} onChange={handlePassword} />
                        <FontAwesomeIcon
                            icon={faEye}
                            style={{
                                color: "#1032bb",
                                width: "20px",
                                height: "20px",
                            }}
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                    
                    <div className="input-field position-relative">
                        <label className='text-start w-100 mb-2 text-dark'>Confirm Password<strong style={{color: 'red'}}>*</strong></label>
                        <input type={confirmType ? 'text' : 'password'} className='mb-0' value={confirmPassword} onChange={handleConfirmPassword} />
                        <FontAwesomeIcon
                            icon={faEye}
                            style={{
                                color: "#1032bb",
                                width: "20px",
                                height: "20px",
                            }}
                            onClick={toggleConfirmVisibility}
                        />
                    </div>
                    
                    <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Upload Profile Image</label>
                        <input type="file" className='mb-0' onChange={onFileChange} accept="image/*" />
                    </div>
                    
                    <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Select Category</label>
                        <input type="text" className='mb-0' maxLength='30' value={category} onChange={handleCategory} />
                    </div>

                    <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Shopify URL<strong style={{color: 'red'}}>*</strong></label>
                        <div className="input-container w-100 d-flex mb-0">
                            <label htmlFor="">https://</label>
                            <input type="url" className='mb-0' pattern="https?://.*" placeholder='shopify URL' value= {shopifyUrl} onChange={handleShopify} />
                            {urlError && <p className="error mb-0">{urlError}</p>}
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <label className='text-start w-100 mb-2 text-dark'>Instagram Handle</label>
                        <input type="url" className='mb-0' value={instagramUrl} onChange={handleInstagram} />
                    </div>
                </form>
                <div className="links d-flex align-items-center mt-4 pb-4">
                    <button className='buttonfx angleindouble color-1 Signup' onClick={createVendor} disabled={!!urlError}>Signup</button>
                    <p className='mb-0 ms-3'>Or <Link to='/vendor-signin'> Sign In</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorSignup