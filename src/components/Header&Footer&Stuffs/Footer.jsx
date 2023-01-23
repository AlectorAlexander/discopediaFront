import React from 'react';
import {
    CDBBtn, CDBBox, CDBModalFooter,
} from 'cdbreact';

import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

export default function Footer() {
    return (
        <CDBModalFooter className="brazilian_colors shadow footer mt-5 py-3">
            <CDBBox
                display="flex"
                justifyContent="between"
                alignItems="center"
                className="mx-auto py-4 flex-wrap"
                style={{ width: '80%', color: 'white' }}
            >
                <CDBBox display="flex" alignItems="center">
                    <a href="/" className="d-flex align-items-center p-0 text-dark">
                        <span style={{ color: 'white' }} className="ml-3 h5 font-weight-bold">Discopedia</span>
                    </a>

                </CDBBox>
                <CDBBox>
                    <small style={{ color: 'white' }} className="ml-2">&copy; Devwares, 2022. All rights reserved.</small>
                </CDBBox>
                <CDBBox display="flex">
                    <CDBBtn flat color="dark" className="p-2">
                        <BsFacebook />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="mx-3 p-2">
                        <BsTwitter />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="p-2">
                        <BsInstagram />
                    </CDBBtn>
                </CDBBox>
            </CDBBox>
        </CDBModalFooter>
    );
}