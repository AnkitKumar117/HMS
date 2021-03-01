import React from 'react';
import './SignUp.css';
class SignUp extends React.Component {
    render() {
        return (
            <div className="ui container">
            <form className="ui form">
                <div className="inline fields">
                    <div className="eight wide field">
                        <label>Name</label>
                        <input type="text" placeholder="First Name" />
                    </div>
                    <div className="three wide field">
                        <input type="text" placeholder="Middle Name" />
                    </div>
                    <div className="five wide field">
                        <input type="text" placeholder="Last Name" />
                    </div>
                </div>
                <div className="field">
                    <label>Address</label>
                    <div className="fields">
                        <div className="twelve wide field">
                            <input type="text" name="shipping[address]" placeholder="Street Address" />
                        </div>
                        <div className="four wide field">
                            <input type="text" name="shipping[address-2]" placeholder="Pincode" />
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" className="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            </div>
                
                
        );
    };
};

export default SignUp;