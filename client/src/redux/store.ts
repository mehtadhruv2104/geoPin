import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit"
import rootReducer from "./reducer"
import { LocationApi } from "../services/mapService"


export default function ConfigureStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(LocationApi.middleware),
      } as ConfigureStoreOptions)
    return store
}

export type RootState = ReturnType<typeof rootReducer>;