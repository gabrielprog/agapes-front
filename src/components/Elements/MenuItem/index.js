/* eslint-disable react/prop-types */
import React from "react";
import {
    Card, Nav
} from "react-bootstrap";
import { Link } from "react-router-dom";


function MenuItem({ children }) {
  return (
    <Card className="bg-transparent color-white border-bottom border-top rounded-0">
        
        {children}
    </Card>
  );
}

export default MenuItem;

export function NavItem({ children, to }) {
    return (
        <Nav>
            <Link to={to}>
                <NavItem className="bg-transparent color-white border-bottom border-top rounded-0">
                    {children}
                </NavItem>
            </Link>
        </Nav>
    );
}