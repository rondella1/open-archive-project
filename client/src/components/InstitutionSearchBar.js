import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import searchImage from "../assets/magnifying-glass-icon.png";
import { Link } from "react-router-dom";

const InstitutionSearchBar = () => {
    const { institutionName } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = async () => {
        try {
            if (searchTerm.trim() === "") {
                return;
            }

            const response = await fetch (`http://localhost:3000/${institutionName}/search/${searchTerm}`);
            const result = await response.json();
            setSearchResults(result.data);
            navigate(`/${institutionName}/search-results/${searchTerm}`)
        } catch (error) {
            console.error("Error fetching search results", error);
            setSearchResults([]);
        }
    };

    return (
        <>
            <StyledSearchBar>
                <StyledInput
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <SearchLink to="#" onClick={handleSearch}>
                    <SearchLogo src={searchImage} alt="Search" />
                </SearchLink>
            </StyledSearchBar>
        </>
    )
};

const StyledSearchBar = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 25px;
`;

const StyledInput = styled.input`
    font-size: 1.1em;
    color: gray;
    width: 200px;
`;

const SearchLink = styled(Link)`
`;

const SearchLogo = styled.img`
    width: 25px; 
    padding-left: 5px;
`;


export default InstitutionSearchBar;

