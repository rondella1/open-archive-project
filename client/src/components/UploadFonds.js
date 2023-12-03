import styled from "styled-components";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import InstitutionSearchBar from "./InstitutionSearchBar";
import { ToastContainer, toast } from "react-toastify";

//Component that allows logged in users to upload a fonds to their institutional repository, and add the fonds to the database upon upload

const UploadFonds = () => {
    const { institutionName } = useParams();
    const [fondsId, setFondsId] = useState('');
    const [name, setName] = useState('');
    const [contents, setContents] = useState('');
    const [biosketch, setBiosketch] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [language, setLanguage] = useState('');
    const [repository, setRepository] = useState('');
    const isLoggedIn = localStorage.getItem("institutionName");
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

            const formData = {
                fondsId,
                name,
                contents,
                biosketch,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                language: language.split(',').map(lang => lang.trim()),
                repository,
            };

            await fetch(`http://localhost:3000/${institutionName}/upload-fonds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            setFondsId('');
            setName('');
            setContents('');
            setBiosketch('');
            setDescription('');
            setTags('');
            setLanguage('');
            setRepository('');

            toast.success("Fonds added")

        } catch (error) {
            toast.error("Error submitting new fonds. Please try again.")
            console.error("Error submitting new fonds", error);
        };
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
        <FormBox>
        <PageTitle>Add a Fonds</PageTitle>
            <AddFondsForm onSubmit={handleFormSubmit}>
                <FormGroup>
                    <StyledLabel>Fonds Name</StyledLabel>
                    <StyledInput type="text" value={name} onChange={(event) => setName(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Fonds Identifier</StyledLabel>
                    <StyledInput type="text" value={fondsId} onChange={(event) => setFondsId(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Repository</StyledLabel>
                    <StyledInput type="text" value={repository} onChange={(event) => setRepository(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Contents</StyledLabel>
                    <ContentsInput type="text" value={contents} onChange={(event) => setContents(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Description</StyledLabel>
                    <DescriptionInput type="text" value={description} onChange={(event) => setDescription(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Biographical Sketch</StyledLabel>
                    <BioInput type="text" value={biosketch} onChange={(event) => setBiosketch(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Language <Comma> comma-separated</Comma></StyledLabel>
                    <StyledInput type="text" value={language} onChange={(event) => setLanguage(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Access Points <Comma> comma-separated</Comma></StyledLabel>
                    <StyledInput type="text" value={tags} onChange={(event) => setTags(event.target.value)} required/>
                </FormGroup>
                <StyledSubmit type="submit">Submit</StyledSubmit>
                <GoToFonds to={`/${institutionName}/fonds`}>Return to Fonds</GoToFonds>
            </AddFondsForm>
        </FormBox>
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
    &:hover{
      color: slategray
    }
`;

const FormBox = styled.div`
    margin-left: 300px;
    margin-right: 300px;
    border: 1px solid grey;
    border-radius: 1%;
    background-color: white;
`;

const PageTitle = styled.h2`
    text-align: center;
    margin-top: 15px;
`;

const AddFondsForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px;
    align-items:center;
`;

const FormGroup = styled.div`
`;

const StyledLabel = styled.label`
    margin-bottom: 3px;
    display: flex;
    text-align: right;
`;

const StyledInput = styled.input`
    width: 500px;
    margin-bottom: 10px;
    font-size: 1em;
`;

const ContentsInput = styled.textarea`
    width: 500px;
    height: 100px;
    margin-bottom: 10px;
    font-size: 1em;
`;

const BioInput = styled.textarea`
    width: 500px;
    height: 100px;
    margin-bottom: 10px;
    font-size: 1em;
`;

const DescriptionInput = styled.textarea`
    width: 500px;
    height: 100px;
    margin-bottom: 10px;
    font-size: 1em;
`;

const StyledSubmit = styled.button`
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const Comma = styled.span`
    font-style: italic;
    margin-left: 6px;
    font-size: 0.9em;
`;

const GoToFonds = styled(Link)`
    margin-top: 10px;
    text-decoration: none;
    color: slategray;
        &:hover{
        color: darkslategray
        }
`;

export default UploadFonds;