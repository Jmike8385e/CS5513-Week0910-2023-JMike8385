import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addBday } from "../api/bday";
const AddBday = () => {
    const [name, setName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [attendance, setAttendance] = React.useState("not attending");
    const [isLoading, setIsLoading] = React.useState(false);

    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleBdayCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a birthday",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const bday = {
            name,
            birthday,
            attendance,
            userId: user.uid,
        };
        await addBday(bday);
        setIsLoading(false);

        setName("");
        setBirthday("");
        setAttendance("pending");

        toast({ title: "Birthday created successfully", status: "success" });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="Birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <Select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
                    <option
                        value={"not attending"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                        Not Attending 🫥
                    </option>
                    <option
                        value={"attending"}
                        style={{ color: "green", fontWeight: "bold" }}
                    >
                        Attending 🥳
                    </option>
                </Select>

                <Button
                    onClick={() => handleBdayCreate()}
                    disabled={name.length < 1 || birthday.length < 1 || isLoading}
                    variantColor="teal"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddBday;