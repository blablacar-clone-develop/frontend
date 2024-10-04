import {Navbar} from "react-bootstrap";
import React from "react";

const PanelLogo: React.FC = ()=>
{
    return(
        <Navbar className="myNavBar" expand="lg">
            <div className="d-flex justify-content-center " style={{flex: '1'}}>
                <div className="myIconImage5"/>
            </div>
        </Navbar>
    );

}
export default PanelLogo;