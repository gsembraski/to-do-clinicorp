import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, /*query, where,*/ getDoc } from 'firebase/firestore/lite';
import { DataBase } from './ApiConfig';

const COLLECTION_NAME = "WorkList";
const db = DataBase;

export async function getWorkListById(id) {
    try {
        // const workListQuery = query(workListCollection, where(x => x.id == id));
        const workListSnapshot = await getDoc(doc(db, COLLECTION_NAME, id), id);
        if (workListSnapshot.exists())
            return { id: workListSnapshot.id, ...workListSnapshot.data() }

        return null;
    } catch (error) {
        console.error(`Error getting all ${COLLECTION_NAME}:`, error);
        return {};
    }
};

export async function getAllWorkLists() {
    try {
        const workListCollection = collection(db, COLLECTION_NAME);
        const workListSnapshot = await getDocs(workListCollection);
        const workLists = workListSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });

        return workLists;
    } catch (error) {
        console.error(`Error getting all ${COLLECTION_NAME}:`, error);
        return [];
    }
};

export async function addWorkList(item) {
    try {
        const workListCollection = collection(db, COLLECTION_NAME);
        const workListSnapshot = await addDoc(workListCollection, item);
        return workListSnapshot.id;
    } catch (error) {
        console.error(`Error adding ${COLLECTION_NAME}:`, error);
        return null;
    }
};

export async function updateWorkList(id, item) {
    try {
        await updateDoc(doc(db, COLLECTION_NAME, id), item);

        return { id: id, ...item }
    } catch (error) {
        console.error(`Error updating ${COLLECTION_NAME}:`, error);
        return null;
    }
};

export async function deleteWorkList(id) {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return true;
    } catch (error) {
        console.error(`Error deleting ${COLLECTION_NAME}:`, error);
        return false;
    }
};