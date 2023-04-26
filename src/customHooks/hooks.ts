import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { API_INTERFACE } from '@/app';
import { AppDispatch, RootState } from '@/store';
import swal from 'sweetalert';
// import { AppDispatch, RootState } from '@/store';



export const useApi = async ({
  isSecure,
  method,
  url,
  body,
  query
}: API_INTERFACE): Promise<any> => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset=utf-8");
    if (isSecure) {
      headers.append("token", "token");
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
      swal({
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



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector