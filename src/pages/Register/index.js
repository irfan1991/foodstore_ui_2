import React from 'react'
import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from "upkit";
import { useForm } from "react-hook-form";

export default function Register() {

    // mengeluarkan fungsi register, handleSubmit, error dari useForm
    let {register, handleSubmit, errors, setError} = useForm();

    // fungsi menangani form submit 
    const onSubmit = async FormData => {
        alert(JSON.stringify(FormData))
    };

    return (
        <LayoutOne size="small">
           <Card color="white">
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <FormControl>
                        <InputText 
                            name="full_name"
                            placeholder="Nama Lengkap"
                            fitContainer
                            ref={register}
                        />
                    </FormControl>

                    <FormControl>
                        <InputText 
                            name="email"
                            placeholder="Email"
                            fitContainer
                            ref={register}
                        />
                    </FormControl>

                    <FormControl>
                        <InputPassword 
                            name="password"
                            placeholder="Password"
                            fitContainer
                            ref={register}
                        />
                    </FormControl>

                    <FormControl>
                        <InputPassword 
                            name="password_confirmation"
                            placeholder="Konfirmasi Password"
                            fitContainer
                            ref={register}
                        />
                    </FormControl>
                   
                   <Button
                        size="large"
                        fitContainer
                    >
                       Mendaftar
                   </Button>
                </form>
           </Card>
        </LayoutOne>
    )
}
