// note from Ethan: import '@/' not working properly in replit workspaces

import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddBday from "../components/AddBday";

export default function AddBirthday() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddBday />
        </Container>
    );
}