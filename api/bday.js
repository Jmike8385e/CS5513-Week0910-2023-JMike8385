import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addBday = async ({ userId, name, birthday, attendance }) => {
    try {
        await addDoc(collection(db, "bday"), {
            user: userId,
            name: name,
            birthday: birthday,
            attendance: attendance,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleAttendanceStatus = async ({ docId, attendance }) => {
    try {
        const bdayRef = doc(db, "bday", docId);
        await updateDoc(bdayRef, {
            attendance,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteBday = async (docId) => {
    try {
        const bdayRef = doc(db, "bday", docId);
        await deleteDoc(bdayRef);
    } catch (err) {
        console.log(err);
    }
};
export { addBday, toggleAttendanceStatus, deleteBday };