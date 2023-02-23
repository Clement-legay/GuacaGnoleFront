import {Grid, Input} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useContext, useState} from "react";
import {MainContext} from "../../../Context/MainContext";

const ImageField = ({initialValue, setFieldValue, FieldValue, alt}) => {
    const { postImage } = useContext(MainContext)
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (setFieldValue) => {
        setLoading(true);

        const file = document.getElementById("image").files[0];

        const imgRender = document.getElementById("imageRender");
        imgRender.src = URL.createObjectURL(file);

        const formData = new FormData();
        formData.append("image", file);
        const response = await postImage(formData);
        setFieldValue(FieldValue, response);

        setLoading(false);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container={true} spacing={2} p={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <div style={{
                            width: "150px",
                            height: "150px",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img
                                id="imageRender"
                                src={initialValue !== "" ? initialValue : "https://via.placeholder.com/150"}
                                alt={alt}
                                style={{
                                    width: "auto",
                                    height: "100%",
                                    borderRadius: "5px",
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Input
                    fullWidth
                    id="image"
                    name="imageUrl"
                    label="Image"
                    type="file"
                    sx={{display: "none"}}
                    inputProps={{ accept: 'image/*' }}
                    onChange={() => handleImageUpload(setFieldValue)}
                />
                <label htmlFor="image">
                    <LoadingButton
                        fullWidth
                        component="span"
                        variant="contained"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Image
                    </LoadingButton>
                </label>
            </Grid>
        </Grid>
    )
}

export default ImageField;