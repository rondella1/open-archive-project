import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";

//This component retrieves all the fonds of a logged in institution

const AllFondsLoggedIn = () => {
    const { institutionName } = useParams();
    const [allFonds, setAllFonds] = useState([]);
    const isLoggedIn = localStorage.getItem('institutionName');
    const [expandDescription, setExpandDescription] = useState([]); 
    const [expandBiosketch, setExpandBiosketch] = useState([]);


    //this function expands the Description section upon click 
    const handleExpandDescription = (fondsId) => {
        setExpandDescription((prev) =>
            prev.includes(fondsId) ? prev.filter((id) => id !== fondsId) : [...prev, fondsId]
        );
    };


    //this function clears local storage when the user logs out
    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    //this useEffect retrieves a given institution's fonds
    useEffect(() => {
        fetch(`http://localhost:3000/${institutionName}/fonds`)
        .then(response => response.json())
        .then(fondsData => setAllFonds(fondsData.data))
        .catch(error => console.error(error))
   }, [])

   //this http request deletes a fonds on click 
   const handleDelete = async (fondsName) => {
        fetch (`http://localhost:3000/${institutionName}/fonds`, {
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: fondsName})
        })
        .then(() => {
            setAllFonds((prevFonds) => prevFonds.filter((fond) => fond.name !== fondsName));
        })
        .catch((error) => console.error(error));
   };

   if (!allFonds) {
        return ("No fonds found.")
   }

    return (
        <>
        <LogOutAndSearchContainer>
            <InstitutionSearchBar/>
            {isLoggedIn && (
              <StyledLink to="/" onClick={handleLogOut}>
                Log Out
              </StyledLink>
            )}
        </LogOutAndSearchContainer>
        <TitlePage> {institutionName} Fonds</TitlePage>
        {isLoggedIn && (
            <AddFondsLink to={`/${institutionName}/upload-fonds`}>Add a fonds</AddFondsLink>
        )}
        <FondsWrapper>
            {allFonds.map((fonds) => {
                const isDescriptionExpanded = expandDescription.includes(fonds._id);
                const isBiosketchExpanded = expandBiosketch.includes(fonds._id);
                return (
                    <FondsBox key={fonds._id}>
                        <FondsLink to={`/${fonds.repository}/fonds/${fonds.name}`}>Fonds {fonds._id} - {fonds.name}</FondsLink>
                        <DescriptionContainer>
                            <p>
                            {' '}
                            {isDescriptionExpanded 
                                ? fonds.description 
                                : fonds.description.slice(0, 200)}
                            {fonds.description.length > 200 && (
                            <ReadMoreButton onClick={() => handleExpandDescription(fonds._id)}>
                            {isDescriptionExpanded ? <ReadLess>Read Less</ReadLess> : <ReadMore>Read More</ReadMore>}
                            </ReadMoreButton>)}    
                            </p>
                        </DescriptionContainer>
                        <p><RepoLink to={`/${fonds.repository}`}>{fonds.repository}</RepoLink></p>
                        <Contents>Contents: {fonds.contents}</Contents>
                        <p>Access Points: {fonds.tags.join(", ")}</p>
                        <DeleteBox onClick={() => handleDelete(fonds.name)}>
                            <DeleteButton>Delete</DeleteButton>
                        </DeleteBox>
                    </FondsBox>
                )
            })}
        </FondsWrapper>
        </>
    )
};

const FondsLink = styled(Link)`
    color: slategrey;
    text-decoration: none;
        &:hover{
        color: darkslategrey;
}
`;

const RepoLink = styled(Link)`
    color: slategrey;
    text-decoration: none;
    &:hover{
        color: darkslategrey;
    }
`;

const LogOutAndSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
    margin-left: auto;
    padding-right: 20px;
    margin-top: 2px;
    color: darkslategrey;
    text-decoration: none;
    &:hover{
        color: slategrey;
    }
`;

const TitlePage = styled.h2`
    padding-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const AddFondsLink = styled(Link)`
    text-align: right;
    text-decoration: none;
    padding-left: 30px;
    color: slategrey;
    text-decoration: none;
    &:hover{
        color: darkslategrey;
    }
`;

const FondsWrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const FondsBox = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
`;

const DescriptionContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const Contents = styled.p`
    margin-top: 5px;
    margin-bottom: 5px;
`

const ReadMoreButton = styled.button`
`;

const ReadMore = styled.p`
    padding-left: 6px;
    font-style: italic;
    &:hover{
        color: grey;
    }
`;

const ReadLess = styled.p`
    padding-left: 6px;
    font-style: italic;
    &:hover{
        color: grey;
    }
`;

const DeleteBox = styled.div`
    margin-top: 10px;
`;

const DeleteButton = styled.button`
    margin-top: 20px;
    margin-bottom: 20px;
    color: slategrey;
    text-decoration: none;
    &:hover{
        color: darkslategrey;
    }
`;


export default AllFondsLoggedIn;