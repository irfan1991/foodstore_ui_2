import React , {useState} from 'react'
import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from "upkit";
import { useForm } from "react-hook-form";
import { rules } from "./validation";
import { registerUser } from "../../api/auth";
import { useHistory , Link} from "react-router-dom";
import StoreLogo from '../../components/StoreLogo'

const statuslist = {
    idle : 'idle',
    process : 'process',
    success : 'success',
    error : 'error'
}


export default function Register() {

    // mengeluarkan fungsi register, handleSubmit, error dari useForm
    let {register, handleSubmit, errors, setError} = useForm();

    // state status dengan nilai default 'statuslist.idle
    const [status, setStatus] = useState(statuslist.idle);

    let history = useHistory();

    // fungsi menangani form submit 
    const onSubmit = async FormData => {
        let {password, password_confirmation} = FormData;

        // cek equality pass vs pass comf
        if (password !== password_confirmation) {
            
            return setError('password_confirmation', {type : 'equality',
            message : 'Konfirmasi password harus sama dengan password'
        })
        }

        // set status = process
        setStatus(statuslist.process);

        let { data } = await registerUser(FormData);
      
        // cek apakah ada error
        if (data.error) {
            
            // dapatkan fields terkait jika error
            let fields = Object.keys(data.fields);

            // untuk masing masing field kita terapkan error dan tangkap pesan error
            fields.forEach(field => {
                setError(field, {type:'server', message: data.fields[field]?.message})
            })

            // set status = error
            setStatus(statuslist.error);
            return 
        }

        //set status = success
        setStatus(statuslist.success)

        //redirect ke register/berhasil
        history.push('/register/berhasil');
    };

    return (
        <LayoutOne size="small">
           <Card color="white">
               <div className="text-center mb-5">
                    <StoreLogo />
               </div>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <FormControl errorMessage={errors.full_name?.message}>
                        <InputText 
                            name="full_name"
                            placeholder="Nama Lengkap"
                            fitContainer
                            ref={register(rules.full_name)}
                        />
                    </FormControl>

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

                    <FormControl errorMessage={errors.password_confirmation?.message}>
                        <InputPassword 
                            name="password_confirmation"
                            placeholder="Konfirmasi Password"
                            fitContainer
                            ref={register(rules.password_confirmation)}
                        />
                    </FormControl>
                   
                   <Button
                        size="large"
                        fitContainer
                        disabled={status === statuslist.process}
                    >
                       {status === statuslist.process ? "Sedang Memperoses" : "Mendaftar"}
                   </Button>
                </form>

                <div className="text-center mt-2">
                    Sudahkah Anda punya Akun ? <Link to="/login"><b>Masuk Sekarang</b></Link>
                </div>
           </Card>
        </LayoutOne>
    )
}
