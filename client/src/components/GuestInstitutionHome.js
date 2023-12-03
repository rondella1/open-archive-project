import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";

//this component is the homepage of a given institution 

const GuestInstitutionHome = () => {
    const { institutionName } = useParams();
    const [institutionData, setInstitutionData] = useState(null);

    useEffect(() => {
        fetch (`http://localhost:3000/institutions/${institutionName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error ("Institution not found");
            }
            return response.json();
        })
        .then ((fetchedInstitution) => {
            setInstitutionData(fetchedInstitution.data);
        })
        .catch ((error) => {
            console.error(error);
        })
    }, [institutionName]);

    if (!institutionData) {
        return <Loading>Loading...</Loading>
    }

    return (
        <>
        <SearchBar/>
        <InstitutionWrapper>
            <Box>
                <InstitutionName>{institutionData.name}</InstitutionName>
                <DetailsBox>
                    <DetailsDescription>{institutionData.description}</DetailsDescription>
                    <p>{institutionData.address}</p>
                    <p>contact archivist: {institutionData.archivist}</p>
                    <p>{institutionData.email}</p>
                    <p>{institutionData.telephone}</p>
                </DetailsBox>
                <BrowseBox>
                    <BrowseLink to={`/fonds`}>Browse {institutionData.name} Fonds</BrowseLink>
                    <BrowseLink to={`/records`}>Browse {institutionData.name} Records</BrowseLink>
                </BrowseBox>
            </Box>
        </InstitutionWrapper>
        </>
    )
};

const Loading = styled.p`
    padding: 20px;
    margin: 20px;
`;

const InstitutionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Box = styled.div`
    padding: 80px;
    margin-top: 100px;
    border: solid 1px grey;
    border-radius: 1%;
    background-color: white;
`;

const InstitutionName = styled.h2`
    text-align: center;
    margin-bottom: 5px;
`;

const DetailsBox = styled.div`
    margin-bottom: 40px;
`;

const DetailsDescription = styled.p`
    margin-bottom: 30px;
    text-align: center;
    font-style: italic;
`;

const BrowseBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const BrowseLink = styled(Link)`
    margin-right: 20px;
    margin-left: 20px;
    text-decoration: none;
    color: slategray;

        &:hover{
            color: darkslategray
        }
`;

export default GuestInstitutionHome;