import { envConfig } from "@/config/env.config";
import { Menu } from "@/models/menu.model";
import { ApiResponse } from "@/models/response.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuService = createApi({
  reducerPath: "api-menu",
  tagTypes: ["list-menus", "list-parents"],
  baseQuery: fetchBaseQuery({ baseUrl: `${envConfig.API_BASE_URL}/menus` }),
  endpoints: (builder) => ({
    getListMenus: builder.query<ApiResponse<Menu[]>, { menuId?: string }>({
      query: (params) => ({ url: "list", params }),
      providesTags: (_result, _error, arg) => [
        { type: "list-menus", id: arg.menuId },
      ],
    }),
    getListMenusParent: builder.query<ApiResponse<Menu[]>, void>({
      query: () => ({ url: "list-parent" }),
      providesTags: ["list-parents"],
    }),
    createMenu: builder.mutation<
      ApiResponse,
      { name: string; parentId?: string }
    >({
      query: (body) => ({ url: "create", body, method: "POST" }),
      invalidatesTags: [{ type: "list-menus" }],
    }),
    updateMenu: builder.mutation<ApiResponse, { id: string; name: string }>({
      query: (body) => ({ url: "update", body, method: "PUT" }),
      invalidatesTags: [{ type: "list-menus" }],
    }),
    deleteMenu: builder.mutation<ApiResponse, { id: string }>({
      query: (params) => ({ url: "delete", params, method: "DELETE" }),
      invalidatesTags: [{ type: "list-menus" }],
    }),
  }),
});

export const {
  useGetListMenusQuery,
  useGetListMenusParentQuery,
  useCreateMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} = menuService;
