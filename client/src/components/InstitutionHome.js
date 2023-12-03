import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InstitutionSearchBar from "./InstitutionSearchBar";
import SearchBar from "./SearchBar";

//this component returns a logged in institution's details based on its name 

const InstitutionHome = () => {
    const { institutionName } = useParams();
    const [institutionData, setInstitutionData] = useState(null);
    const isLoggedIn = localStorage.getItem("institutionName");

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    useEffect(() => {
        fetch (`http://localhost:3000/${institutionName}`)
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
        <LogOutAndSearchContainer>
            {isLoggedIn ? 
            <InstitutionSearchBar/> 
            : 
            <SearchBar/>
            }
            {isLoggedIn && (
              <StyledLink to="/" onClick={handleLogOut}>
                Log Out
              </StyledLink>
            )}
        </LogOutAndSearchContainer>
        <InstitutionWrapper>
          <Box>
          <InstitutionName>{institutionData.name}</InstitutionName>
          <DetailsBox>
            <DetailsDescription>{institutionData.description}</DetailsDescription>
            <p>{institutionData.address}</p>
            <p>contact person: {institutionData.archivist}</p>
            <p>{institutionData.email}</p>
            <p>{institutionData.telephone}</p>
          </DetailsBox>
          {isLoggedIn && (
            <HoldingsBox>
              <BrowseHoldings>
                <BrowseLinks to={`/${institutionData.name}/fonds`}>Browse Fonds</BrowseLinks>
                <BrowseLinks to={`/${institutionData.name}/records`}>Browse Records</BrowseLinks>
              </BrowseHoldings>
              <AddHoldings>
                {isLoggedIn && (
                <AddLinks to={`/${institutionData.name}/upload-fonds`}>Add Fonds</AddLinks>
                )}
                {isLoggedIn && (
                  <AddLinks to={`/${institutionData.name}/upload-record`}>Add Records</AddLinks>
                )}
              </AddHoldings>
            </HoldingsBox>
          )}
          </Box>
        </InstitutionWrapper>
      </>
    );
}

const LogOutAndSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  margin-left: auto;
  padding-right: 20px;
  margin-top: 2px;
  text-decoration: none;
  color: darkslategray;
    &:hover{
      color: slategray
    }
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

const InstitutionName = styled.h1`
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

const HoldingsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BrowseHoldings = styled.div`
  margin-bottom: 20px;
`;

const BrowseLinks = styled(Link)`
   margin-right: 20px;
   margin-left: 20px;
   text-decoration: none;
    color: slategray;
        &:hover{
          color: darkslategray
        }
`;

const AddHoldings = styled.div`
`;

const AddLinks = styled(Link)`
  margin-left: 20px;
  margin-right: 20px;
  text-decoration: none;
  color: slategray;
    &:hover{
      color: darkslategray
    }
`;

const Loading = styled.p`
  padding: 20px;
  margin: 20px;
`;

export default InstitutionHome;