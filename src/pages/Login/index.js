import React , {useState} from 'react'
import { InputText, InputPassword,Button,FormControl,Card,LayoutOne } from "upkit";
import { useForm } from "react-hook-form";
import { useHistory,Redirect, Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import StoreLogo from '../../components/StoreLogo';
import { userLogin } from "../../features/Auth/actions";
import { rules } from "./validation";
import { login } from "../../api/auth";


const statuslist = {
    idle : 'idle',
    process : 'process',
    success : 'success',
    error : 'error'
}

export default function Login() {

    const { register, handleSubmit, errors,setError} = useForm();
    const [status, setStatus] = useState(statuslist.idle);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async ({email, password}) =>{

        setStatus(statuslist.process);

        //kirim data ke helper login
        let { data } = await login(email, password);

        //cek apa server balikin error gak 

        if (data.error) {
            
            // tangani error tipenya InvalidCredential
            setError('password', {type :'invalidCredential', message : data.message});

            setStatus(statuslist.error)
        } else {

            // ambil data user dan token 
            let {user , token } = data

            //dispatch ke redux store soalnya ada action userLogin dengan data user dan token 
            dispatch(userLogin(user, token));

            history.push('/')
        }

        setStatus(statuslist.success)
    }

    return (
        <LayoutOne size="small">
           <Card color="white">
               <div className="text-center mb-5">
                    <StoreLogo />
               </div>
                <form onSubmit={handleSubmit(onSubmit)}> 
                   

                    <FormControl errorMessage={errors.email?.message}>
                        <InputText 
                            name="email"
                            placeholder="Email"
                            fitContainer
                            ref={register(rules.email)}
                        />
                    </FormControl>

                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword 
                            name="password"
                            placeholder="Password"
                            fitContainer
                            ref={register(rules.password)}
                        />
                    </FormControl>

                
                   
                   <Button
                        size="large"
                        fitContainer
                        disabled={status === statuslist.process}
                    >
                     Login
                   </Button>
                </form>

                <div className="text-center mt-2">
                    Belum punya Akun ? <Link to="/register"><b>Dafter Sekarang</b></Link>
                </div>
           </Card>
        </LayoutOne>
    )
}
