import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";

//Search results page of search query made by logged in users  

const InstitutionSearchResults = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("institutionName");
    const { query, institutionName } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch (`http://localhost:3000/${institutionName}/search/${query}`);
                const result = await response.json();
                setSearchResults(result.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [query])

    const goToRecordPage = (recordId) => {
        navigate(`/${institutionName}/records/${recordId}`)
    }

    if (!searchResults) {
        return <Loading>Loading...</Loading>
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
        <ResultsWrapper>
            <PageTitle>Search Results for: {query}</PageTitle>
            {searchResults.length === 0 ? (
                <Loading>Loading...</Loading>
            ) : (
                <ResultsBox>
                {searchResults.map((record) => {
                    return (
                        <ResultsTitles key={record._id} onClick={() => goToRecordPage(record._id)}>
                            File [{record._id}] {record.title}, {record.fondsName}
                        </ResultsTitles>
                    )
                })}
            </ResultsBox>
            )}
        </ResultsWrapper>
        </>
    )
};

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
    &:hover {
        color: slategray;
    }
`;

const ResultsWrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const PageTitle = styled.h2`
    margin-bottom: 20px;
`;

const ResultsBox = styled.div`
`;

const ResultsTitles = styled.button`
    margin-bottom: 10px;
    text-decoration: none;
    color: slategray;

    &:hover {
        color: darkslategray;
    }
`;

const Loading = styled.p`
    padding: 20px;
    margin: 20px;
`;

export default InstitutionSearchResults;