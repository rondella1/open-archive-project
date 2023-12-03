import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchResults = () => {
    const navigate = useNavigate();
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const count = searchResults.length

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch (`http://localhost:3000/guest/search/${query}`);
                const result = await response.json();
                setSearchResults(result.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [query]);

    const goToRecordPage = (recordId) => {
        navigate(`/records/${recordId}`)
    }

    
    return (
        <>
        <SearchBar/>
        <ResultsTitle> {count} search results for: {query}</ResultsTitle>
        <Wrapper>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ResultsBox>
                {searchResults.map((record) => {
                    return (
                        <>
                        <Return key={record._id} onClick={() => goToRecordPage(record._id)}>
                            File [{record._id}] {record.title}, {record.fondsName}
                        </Return>
                        </>
                    )
                })}
            </ResultsBox>
            )}
        </Wrapper>
        </>
    )
};

const ResultsTitle = styled.h2`
    margin-left: 30px;
    padding-top: 20px;
`

const Wrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`

const ResultsBox = styled.ul`
`;

const Return = styled.button`
    margin-bottom: 10px;
    text-decoration: none;
    color: slategray;

    &:hover {
        color: darkslategray;
    }
`;


export default SearchResults; 