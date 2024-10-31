import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const getOrder = createAsyncThunk(
    "order/get",
    async ({ number }: { number: number }) => {
        return api.getOrder(number)
    }
);