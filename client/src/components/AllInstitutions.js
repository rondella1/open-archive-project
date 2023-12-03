import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

//this component retrieves all the registered institutions in the database 

const AllInstitutions = () => {
    const [allInstitutions, setAllInstitutions] = useState([]);

    useEffect(()=> {
        fetch ("http://localhost:3000/institutions")
        .then(response => response.json())
        .then(institutionData => setAllInstitutions(institutionData.data))
        .catch(error => console.error(error))
    }, [])

    if(!allInstitutions) {
        return <ErrorMessage>No Instiutions found</ErrorMessage>
    }

    return (
        <>
            <SearchBar/>
            <Title>Institutions</Title>
            <Wrapper>
            {allInstitutions.map((institution) => {
                return (
                    <DetailsBox key={institution._id}>
                        <Name><NameLink to={`/institutions/${institution.name}`}>{institution.name}</NameLink></Name>
                        <Description>{institution.description}</Description>  
                    </DetailsBox>
                )
            })}
            </Wrapper>
        </>
    )
};

const Title = styled.h2`
    margin-top: 20px;
    padding-left: 30px;
`;

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const DetailsBox = styled.div`
    margin-bottom: 20px;
`;

const Name = styled.h3`
    margin-bottom: 8px;
`;

const Description = styled.p`
    font-style: italic;
    margin-bottom: 10px;
`;

const NameLink = styled(Link)`
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

export default AllInstitutions; 