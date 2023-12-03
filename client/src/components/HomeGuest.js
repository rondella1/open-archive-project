import styled from "styled-components";
import { Link } from "react-router-dom";
import OALogo from "../assets/oa-logo.png";
import SearchBar from "./SearchBar";

const HomeGuest = () => {

    return (
        <>
        <Wrapper>
            <SearchBar/>
        </Wrapper>
        <BrowseBox>
            <OABox>
                <Logo src={OALogo} alt="OpenArchive Logo"/>
                <OpenArchive>OpenArchive</OpenArchive>
            </OABox>
            <BrowseLinks>
                <Connecting>Connecting the arts</Connecting>
                <InstitutionsLink to="/institutions">Browse institutions</InstitutionsLink>
                <FondsLink to="/fonds">Browse fonds</FondsLink>
                <RecordsLink to="/records">Browse records</RecordsLink>
            </BrowseLinks>
        </BrowseBox>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-right: 20px;

`;

const BrowseBox = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    padding-bottom: 100px;
    margin-top: 60px;
    margin-left: 20px;
    margin-right: 20px;
    border: solid 1px grey;
    border-radius: 1%;
    background-color: white;
    margin-bottom: 60px;
`;

const OABox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: -170px;
`

const Logo = styled.img`
    height: 400px;
`

const OpenArchive = styled.h1`
    display: flex;
    font-size: 6em;
    margin-left: -40px;
    align-items: center;
    margin-top: -80px;
`;

const BrowseLinks = styled.div`
    margin-top: -150px;
    margin-left: auto;
    margin-right: 30px;
`;

const Connecting = styled.div`
    margin-left: 320px;
    margin-top: -45px;
    font-size: 1.1em;
    font-style: italic;
    margin-bottom: 60px;
`;

const InstitutionsLink = styled(Link)`
    font-size: 1.3em;
    padding-right: 80px;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const FondsLink = styled(Link)`
    padding-right: 100px;
    font-size: 1.3em;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const RecordsLink = styled(Link)`
    font-size: 1.3em;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;


export default HomeGuest;