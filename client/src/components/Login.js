import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

//Log In page that sets local storage if log in is successful

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, 
                    password,
                }),
            });

            const institutionCredentials = await response.json();

            if (institutionCredentials.status === 200) {
                const institutionName = institutionCredentials.data.name;
                localStorage.setItem('institutionName', institutionName)
                navigate(`/${institutionName}`);
            } else {
                console.log("Invalid credentials");
                setLoginError(true);
            }

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

const handleGuest = () => {
    navigate('/')
}    

    return (
        <Wrapper>
            <FormBox>
                <LoginHeader>Sign in to your account</LoginHeader>
                {loginError && <ErrorMessage>Sign in was unsuccessful. Please try again.</ErrorMessage>}
                <StyledForm>
                    <StyledInput type="text" value={email} placeholder="email" onChange={(event) => setEmail(event.target.value)}/>
                    <StyledInput type="password" value={password} placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
                    <LoginButton type="button" onClick={handleLogin}>Login</LoginButton>
                </StyledForm>
            </FormBox>
            <Divider />
            <GuestBox>
                <GuestHeader>Continue as a guest</GuestHeader>
                <GuestButton type="button" onClick={handleGuest}>Browse the collections</GuestButton>
            </GuestBox>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 180px;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 90px;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 20px;
    font-size: 1em;
`;

const Divider = styled.div`
    height: 300px;
    margin-top: -30px;
`;

const GuestBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 90px;
`;

const LoginHeader = styled.h1`
    margin-bottom: 20px;
`;

const GuestHeader = styled.h1`
    margin-bottom: 30px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    width: 200px;
    height: 15px;
    margin-bottom: 10px;
`;

const LoginButton = styled.button`
    width: 60px;
    height: 20px;
    margin-top: 20px;
    margin-left: 70px;
    text-decoration: none;
    color: darkslategray;
        &:hover{
            color: slategrey;
        }
    
`;

const GuestButton = styled.button`
    text-decoration: none;
    color: darkslategray;
        &:hover{
            color: slategrey;
        }
`;

export default Login;