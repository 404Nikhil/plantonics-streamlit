import streamlit as st
from gradio_client import Client
import base64
import os
import tempfile


class_to_label = {
    0: 'Apple Scab',
    1: 'Apple_Black Rot',
    2: 'Bacterial Spot_Pepper',
    3: 'Bacterial Spot_peach',
    4: 'Bacterial Spot_tmt',
    5: 'Black Rot_grape',
    6: 'Cedar Apple Rust',
    7: 'Cercospora Leaf Spot_corn',
    8: 'Common Rust_corn',
    9: 'Early Blight_potato',
    10: 'Early Blight_tmt',
    11: 'Esca (Black Measles)_grape',
    12: 'Healthy_Apple',
    13: 'Healthy_Pepper',
    14: 'Healthy_cherry',
    15: 'Healthy_corn',
    16: 'Healthy_grape',
    17: 'Healthy_peach',
    18: 'Healthy_potato',
    19: 'Healthy_strb',
    20: 'Healthy_tmt',
    21: 'Late Blight_potato',
    22: 'Late Blight_tmt',
    23: 'Leaf Blight_grape',
    24: 'Leaf Scorch_strb',
    25: 'Northern Leaf Blight_corn',
    26: 'Powdery Mildew_cherry',
    27: 'Septoria Leaf Spot_tmt',
    28: 'Yellow Leaf Curl Virus_tmt'
}


def main():
    st.title("Plant Disease Detection")

    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png", "webp"])

    if uploaded_file is not None:
        st.image(uploaded_file, caption='Uploaded Image.', use_column_width=True)

        temp_file = tempfile.NamedTemporaryFile(delete=False)
        temp_file.write(uploaded_file.read())
        temp_file.close()

        client = Client("SurajJha21/plantdiseasemodel2")

        result = client.predict(temp_file.name, api_name="/predict")
        predicted_label = class_to_label[result]
        st.subheader("Prediction Result")
        st.write("Predicted Disease:", predicted_label)

        os.unlink(temp_file.name)

if __name__ == "__main__":
    main()
