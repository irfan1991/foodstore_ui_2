import React from 'react'
import { LayoutOne , Card, Text, Button} from "upkit";
import { Link } from 'react-router-dom'

export default function RegisterSuccess() {
    return (
        <LayoutOne size="small">
            <Card color="white">
                <div className="text-center">
                    <Text as="h3">
                        Pendaftaran Berhasil
                    </Text>
                    <Text>
                        Silahkan masuk ke apliasi
                    </Text>

                    <br />
                    <Link to="/login">
                        <Button fitContainer>
                            Masuk
                        </Button>
                    </Link>

                </div>
            </Card>
        </LayoutOne>
    )
}
