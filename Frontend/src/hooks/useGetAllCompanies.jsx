import { setCompanies } from "@/store/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/api";

const useGetAllCompanies = () => { 

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchCompanies = async () => {

            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,
                });

                if(response.data.success){
                    dispatch(setCompanies(response.data.companies));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();

    }, [dispatch]); // ✅ Fixed: added dependency array to prevent infinite loop

}

export default useGetAllCompanies;