/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? 'updateMyPassword' : 'updateMe'; 
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/${url}`,
            data
        });

        if(res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully`);
            window.setTimeout(() => location.reload(), 1000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}