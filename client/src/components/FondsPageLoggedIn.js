import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";

const FondsPageLoggedIn = () => {
    const { institutionName, fondsName} = useParams();
    const [fonds, setFonds] = useState(null);
    const [records, setRecords] = useState([]);
    const isLoggedIn = localStorage.getItem('institutionName');

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    useEffect(() => {
        fetch(`http://localhost:3000/${institutionName}/fonds/${fondsName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error ("Fonds not found");
            }
            return response.json();
        })
        .then((fondsData) => {
            setFonds(fondsData.data);
        })
        .catch((error) => {
            console.error("There was an error retrieving this fonds", error);
            return("Fonds not found")
        })
    }, [fondsName])


    useEffect(() => {
        fetch(`http://localhost:3000/${institutionName}/records`)
        .then(response => response.json())
        .then(recordsData => setRecords(recordsData.data))
        .catch(error => console.log(error))
    }, []);

    const handleDelete = async (fondsName) => {
        fetch (`http://localhost:3000/${institutionName}/fonds/${fondsName}`, {
            method: "DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: fondsName})
        })
        .then(() => {
            setFonds(null);
            navigate(`/${institutionName}/fonds`)
        })
        .catch((error) => console.error(error));
   };

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
        <FondsWrapper>
            {fonds ? (
                <>
                <FondsDetails>
                <FondsTitle>Fonds {fonds._id} - {fonds.name}</FondsTitle>
                <h3>Fonds ID:</h3>
                <p>{fonds._id}</p>
                <Repo>Repository:</Repo>
                <p><FondsLink to={`/${fonds.repository}`}>{fonds.repository}</FondsLink></p>
                <Description>Description</Description>
                <p>{fonds.description}</p>
                <Bio>Biographical sketch:</Bio>
                <p>{fonds.biosketch}</p>
                <Contents>Contents:</Contents>
                <p>{fonds.contents}</p>
                <Lang>Languages: </Lang>
                <p>{fonds.language.join(", ")}</p>
                <Access>Access points: </Access>
                <p>{fonds.tags.join(", ")}</p>
                </FondsDetails>
                <RelatedRecordsBox>
                    <h3>Related Records:</h3>
                {records.map((record) => 
                    record.fondsName === fonds.name ? (
                            <RelatedRecords>
                                <RelatedLink to={`/${institutionName}/records/${record._id}`}>- File [{record._id}] {record.title}</RelatedLink>
                            </RelatedRecords>
                    ) : null 
                    )}
                </RelatedRecordsBox>
                <DeleteButton onClick={() => handleDelete(fonds.name)}>Delete</DeleteButton>
                </>
            ) : (
                <p>Loading...</p>
            )}  
        </FondsWrapper>
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
    color: darkslategray;
    text-decoration: none;
     &:hover{
        color:slategray;
     }
`;

const FondsLink = styled(Link)`
    color: slategray;
    text-decoration: none;
     &:hover{
        color:darkslategray;
     }
`;

const FondsWrapper = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const FondsDetails = styled.div`
    margin-bottom: 20px;
`;

const FondsTitle = styled.h2`
    margin-bottom: 20px;
`;

const Repo = styled.h3`
    margin-top: 10px;
`

const Description = styled.h3`
    margin-top: 10px;
`

const Bio = styled.h3`
    margin-top: 10px;
`

const Contents = styled.h3`
    margin-top: 10px;
`
const Lang = styled.h3`
    margin-top: 10px;
`

const Access = styled.h3`
    margin-top: 10px;
`

const RelatedRecordsBox = styled.div`
    
`;

const RelatedRecords = styled.ul`
    margin-bottom: 5px;
`;

const RelatedLink = styled(Link)`
    color: slategray;
    text-decoration: none;
    margin-left: 15px;
     &:hover{
        color:darkslategray;
     }
`;

const DeleteButton = styled.button`
    margin-top: 30px;
    color: slategray;
    text-decoration: none;
     &:hover{
        color:darkslategray;
     }
`;

export default FondsPageLoggedIn;