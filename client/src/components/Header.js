import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from "../assets/oa-logo.png"

const Header = () => { 
    const institutionName = localStorage.getItem('institutionName');

    return (
        <HeaderContainer>       
            <StyleLink to={institutionName ? `/${institutionName}` : "/"}>
                <LogoImage src={logo} alt="Open Archive logo"/>
                <OpenArchiveTitle>
                    <SpanO>O</SpanO>
                    <SpanA>A</SpanA>
                </OpenArchiveTitle>
            </StyleLink>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
`;

const LogoImage = styled.img`
    height: 100px;
    margin-top: 10px;
`;

const OpenArchiveTitle = styled.h1`
    margin-top: 22px;
    margin-left: -10px;
`;

const StyleLink = styled(Link)`
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const SpanO = styled.span`
    font-size: 1.9em;
    color: darkslategray;
`

const SpanA = styled.span`
    margin-left: -9px;
    font-size: 1.9em;
    color: darkslategray;
`

export default Header;