import React , {useEffect}from 'react'
import { rules } from "./validations";
import { LayoutOne, InputText, FormControl, Textarea, Button } from "upkit";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import TopBar from '../../components/TopBar';
import SelectWilayah from '../../components/SelectWilayah';
import { createAddress } from "../../api/delievery-address";

export default function UserAddressAdd() {

    let history = useHistory();
    let { handleSubmit, register, errors, setValue, watch, getValues} = useForm();

    // mendengarkan perubahab field 
    let allFields = watch();

    useEffect(() => {
      register({name:'provinsi'}, rules.provinsi);
      register({name:'kabupaten'}, rules.kabupaten);
      register({name:'kecamatan'}, rules.kecamatan);
      register({name:'kelurahan'}, rules.kelurahan);
    }, [register])

    useEffect(() => {
        setValue('kabupaten',null);
        setValue('kecamatan',null);
        setValue('kelurahan',null);
    }, [allFields.provinsi, setValue])

    useEffect(() => {
        setValue('kecamatan',null);
        setValue('kelurahan',null);
    }, [allFields.kabupaten, setValue])

    useEffect(() => {
        setValue('kelurahan',null);
    }, [allFields.kecamatan, setValue])

    const updateValue = (field, value ) => setValue(field, value, {shouldValidate:true, shouldDirty : true})
    const onSubmit = async formData => {
            let payload = {
                nama : formData.nama_alamat,
                detail : formData.detail_alamat,
                provinsi : formData.provinsi.label,
                kabupaten : formData.kabupaten.label,      
                kecamatan : formData.kecamatan.label,
                kelurahan : formData.kelurahan.label
            }

            let { data } = await createAddress(payload);

            if(data.error) return ;
            history.push('/alamat-pengirim')
    }

    return (
        <LayoutOne>
            <TopBar />
            <br />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl label="Nama Alamat " errorMessage={errors.nama_alamat?.message} color="black">
                        <InputText 
                            placeholder="Nama Alamat"
                            fitContainer
                            name="nama_alamat"
                            ref={register(rules.nama_alamat)}
                        />
                    </FormControl>

                    <FormControl label="Provinsi" errorMessage={errors.provinsi?.message} color="black">
                        <SelectWilayah 
                            onChange={option => updateValue('provinsi', option)}
                            name="provinsi"
                            value={getValues().provinsi}
                        />
                    </FormControl>

                    <FormControl label="Kabupaten/Kota" errorMessage={errors.kabupaten?.message} color="black">
                        <SelectWilayah 
                            tingkat="kabupaten"
                            onChange={option => updateValue('kabupaten', option)}
                            value={getValues().kabupaten}
                            kodeInduk={getValues().provinsi?.value}
                        />
                    </FormControl>

                    <FormControl label="Kecamatan" errorMessage={errors.kecamatan?.message} color="black">
                        <SelectWilayah 
                            tingkat="kecamatan"
                            onChange={option => updateValue('kecamatan', option)}
                            value={getValues().kecamatan}
                            kodeInduk={getValues().kabupaten?.value}
                        />
                    </FormControl>

                    <FormControl label="Kelurahan" errorMessage={errors.kelurahan?.message} color="black">
                        <SelectWilayah 
                            tingkat="desa"
                            onChange={option => updateValue('kelurahan', option)}
                            value={getValues().kelurahan}
                            kodeInduk={getValues().kecamatan?.value}
                        />
                    </FormControl>

                    <FormControl label="Detail Alamat " errorMessage={errors.detail_alamat?.message} color="black">
                        <Textarea
                            placeholder="Detaill Alamat"
                            fitContainer
                            name="detail_alamat"
                            ref={register(rules.detail_alamat)}
                        />
                    </FormControl>

                    <Button fitContainer>
                        Simpan
                    </Button>
                </form>
            </div>
        </LayoutOne>
    )
}
