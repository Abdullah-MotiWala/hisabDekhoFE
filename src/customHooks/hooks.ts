import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { API_INTERFACE } from '@/app';
import store, { AppDispatch, RootState } from '@/store';
import Swal from 'sweetalert2';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useApi = async ({
  isSecure,
  method,
  url,
  body,
  query
}: API_INTERFACE): Promise<any> => {
  try {
    const state =  store.getState()
    let token = state.user.token

    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset=utf-8");
    if (isSecure && token) {
      headers.append("token", `Bearer ${token}`);
    }

    const init = {
      method,
      headers,
      query,
      body: JSON.stringify(body)
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`,
      init
    );
    const result = await response.json();
    if(result.error){
      const {error,message} = result
      Swal.fire({
        title:error,
        text: message || "Error",
        icon:"error"
      })
    }
    return result;
  } catch (err) {
    console.log(err,"catch")
    return err;
  }
};



