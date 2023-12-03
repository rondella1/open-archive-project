import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import searchImage from "../assets/magnifying-glass-icon.png";
import { Link } from "react-router-dom";
import bookmark from "../assets/bookmark-purple.svg"

//Guest search bar

const SearchBar = () => {
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

            const response = await fetch (`http://localhost:3000/guest/search/${searchTerm}`);
            const result = await response.json();
            setSearchResults(result.data);
            navigate(`/search-results/${searchTerm}`)
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };
    
    return (
        <Wrapper>
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
                    <SearchImage src={searchImage} alt="Search"/>
                </SearchLink>
            </StyledSearchBar>
            <StarLink to="/saved-items">
                <BookmarkLogo src={bookmark} alt="Bookmark Logo" title="Bookmarked Items"></BookmarkLogo>
            </StarLink>
            <LoginButton to={'/login'}>Login</LoginButton>
        </Wrapper>
    )
};


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledSearchBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 25px;
`;

const StyledInput = styled.input`
    font-size: 1.1em;
    width: 200px;
    color: gray;
`;

const SearchLink = styled(Link)`
`;

const SearchImage = styled.img`
    width: 25px;
    padding-left: 5px;
`;

const StarLink = styled(Link)`
    height: 20px;
    margin-left: auto;
`;

const BookmarkLogo = styled.img`
    height: 25px;
`

const LoginButton = styled(Link)`
    margin-right: 20px;
    margin-left: 25px;
    text-decoration: none;
    color: darkslategray;
        &:hover{
            color: slategray
        }
`;

export default SearchBar;