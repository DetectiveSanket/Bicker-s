import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";
import { RATING_API_END_POINT } from "@/utils/api";
import { fetchRatings } from "@/store/ratingSlice";

const useFetchRatting = (productId) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!productId) return;

        dispatch(fetchRatings(productId));

    }, [dispatch, productId]);
   
}

export default useFetchRatting;
