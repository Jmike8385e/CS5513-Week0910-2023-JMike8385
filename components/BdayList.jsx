import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteBday, toggleAttendanceStatus } from "../api/bday";
const BdayList = () => {
    const [bdays, setBdays] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setBdays([]);
            return;
        }
        const q = query(collection(db, "bday"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setBdays(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleBdayDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this birthday?")) {
            deleteBday(id);
            toast({ title: "Birthday deleted successfully", status: "success" });
        }
    };
    const handleToggle = async (id, attendance) => {
        const newAttendance = attendance == "attending" ? "not attending" : "attending";
        await toggleAttendanceStatus({ docId: id, attendance: newAttendance });
        toast({
            title: `Birthday marked ${newAttendance}`,
            status: newAttendance == "attending" ? "success" : "warning",
        });
    };
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {bdays &&
                    bdays.map((todo) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {todo.name}{" "}
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleBdayDelete(todo.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Badge
                                    color={todo.attendance == "not attending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(todo.id, todo.attendance)}
                                >
                                    {todo.attendance == "not attending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge
                                    float="right"
                                    opacity="0.8"
                                    bg={todo.attendance == "not attending" ? "yellow.500" : "green.500"}
                                >
                                    {todo.attendance}
                                </Badge>
                            </Heading>
                            <Text>{todo.birthday}</Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default BdayList;