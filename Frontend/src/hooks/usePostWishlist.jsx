import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToWishList } from "@/store/wishListSlice";
import { WISHLIST_API_END_POINT } from "@/utils/api";

const usePostAllWishlist = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`${WISHLIST_API_END_POINT}/get`, {
                    withCredentials: true
                });

                if(response.data.success){
                    dispatch(addToWishList(response.data.wishlist));
                }

            } catch (error) {
                console.error('Error fetching wishlist:', error);
                toast.error("Failed to load wishlist", {
                    style: {
                        color: '#ef4444',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#ef4444',
                        padding: '10px 20px'
                    }
                });
            }
        };

        fetchWishlist();
    }, [dispatch]); // ✅ Fixed: added dependency array
}


export default usePostAllWishlist;