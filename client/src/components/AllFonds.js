import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const AllFonds = () => {
    const navigate = useNavigate();
    const [allFonds, setAllFonds] = useState([]);
    // const isLoggedIn = localStorage.getItem('institutionName');

    useEffect(() => {
        fetch("http://localhost:3000/fonds")
        .then(response => response.json())
        .then(fondsData => setAllFonds(fondsData.data))
        .catch(error => console.error(error))
    }, [])

    if (!allFonds) {
        return <ErrorMessage>No Fonds Found.</ErrorMessage>
    }

    return (
            <>
            <SearchBar/>
            <Title>Fonds</Title>
            <Wrapper>
            {allFonds.map((fonds) => {
                return (
                    <FondsBox key={fonds._id}>
                        <FondsLink to ={`/fonds/${fonds.name}`}> Fonds {fonds._id} - {fonds.name}</FondsLink>
                        <p>Repository: <RepoLink to={`/institutions/${fonds.repository}`}>{fonds.repository}</RepoLink></p>                       
                        <Description>{fonds.description}</Description>
                        <RelatedLinks to={`/related-records/${fonds._id}`}>
                            <RelatedRecords>Related records</RelatedRecords>
                        </RelatedLinks>
                    </FondsBox>
                )
            })}
            </Wrapper>
            </>
    )
}

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const Title = styled.h2`
    margin-top: 20px;
    padding-left: 30px;
`

const FondsBox = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
`;

const FondsLink = styled(Link)`
    color: slategrey;
    text-decoration: none;

    &:hover{
        color: darkslategray
    }
`;

const Description = styled.p`
    margin-top: 10px;
`;

const RepoLink = styled(Link)`
    color: slategrey;
    text-decoration: none;

    &:hover{
        color: darkslategray
    }
`;

const RelatedLinks = styled(Link)`
    color: slategrey;
    text-decoration: none;

    &:hover{
        color: darkslategray
    }
`;

const RelatedRecords = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
`;

export default AllFonds;