import styled from "styled-components";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InstitutionSearchBar from "./InstitutionSearchBar";

//Component that allows logged in users to upload a record to their institutional repository, and add the record to the database upon upload

const UploadRecord = () => {
    const { institutionName } = useParams();
    const [title, setTitle] = useState('');
    const [recordUniqueId, setRecordUniqueId] = useState('');
    const [date, setDate] = useState('');
    const [format, setFormat] = useState('');
    const [tags, setTags] = useState('');
    const [repository, setRepository] = useState('');
    const [fondsId, setFondsId] = useState('');
    const [fondsName, setFondsName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
    const isLoggedIn = localStorage.getItem("institutionName");
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleLogOut = () => {
        localStorage.removeItem('institutionName');
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

            const formData = {
                recordUniqueId, 
                title, 
                date, 
                format, 
                tags: tags.split(',').map(tag => tag.trim()),
                repository, 
                fondsId,
                notes,
                fondsName,
                image,
            };

            await fetch (`http://localhost:3000/${institutionName}/upload-record`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            setRecordUniqueId('');
            setTitle('');
            setDate('');
            setFormat('');
            setTags('');
            setRepository('');
            setFondsId('');
            setNotes('');
            setFondsName('');
            setImage(null);

            toast.success("Record added")

        } catch (error) {
            toast.error("Error submitting record. Please try again")
            console.error("Error submitting new record:", error);
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
        <PageTitle>Add a Record</PageTitle>
            <AddRecordForm onSubmit={handleFormSubmit}>
                <FormGroup>
                    <StyledLabel>File Number</StyledLabel>
                    <StyledInput type="text" value={recordUniqueId} onChange={(event) => setRecordUniqueId(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Title</StyledLabel>
                    <StyledInput type="text" value={title} onChange={(event) => setTitle(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Date</StyledLabel>
                    <StyledInput type="text" value={date} onChange={(event) => setDate(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Format</StyledLabel>
                    <StyledInput type="text" value={format} onChange={(event) => setFormat(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Notes</StyledLabel>
                    <StyledNotes type="text" value={notes} onChange={(event) => setNotes(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Fonds Name</StyledLabel>
                    <StyledInput type="text" value={fondsName} onChange={(event) => setFondsName(event.target.value)} required/>
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
                    <StyledLabel>Access Points <Comma>comma-separated</Comma></StyledLabel>
                    <StyledInput type="text" value={tags} onChange={(event) => setTags(event.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <StyledLabel>Attach File</StyledLabel>
                    <StyledInput type="file" accept="image/*" onChange={handleImageChange} required/>
                </FormGroup>
                
                <SubmitButton type="submit">Submit</SubmitButton>
                <GoToRecord to={`/${institutionName}/records`}>Return to Records</GoToRecord>
        </AddRecordForm>
        </FormBox>
        </>
    );
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
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const PageTitle = styled.h2`
    text-align: center;
    margin-top: 15px;
`;

const AddRecordForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px;
    align-items:center;
`;

const FormBox = styled.div`
    border: 1px solid grey;
    border-radius: 1%;
    margin-left: 300px;
    margin-right: 300px;
    background-color: white;
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

const StyledNotes = styled.textarea`
    width: 500px;
    height: 100px;
    margin-bottom: 10px;
    font-size: 1em;
`;

const Comma = styled.span`
    font-style: italic;
    margin-left: 6px;
    font-size: 0.9em;
`;

const SubmitButton = styled.button`
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

const GoToRecord = styled(Link)`
    margin-top: 10px;
    text-decoration: none;
    color: slategray;
        &:hover{
            color: darkslategray
        }
`;

export default UploadRecord;