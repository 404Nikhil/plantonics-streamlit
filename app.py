import streamlit as st
from gradio_client import Client
import base64
import os
import tempfile


class_to_label = {
    0: {'label': 'Apple Scab', 'remedy': 'Prune infected areas, apply fungicides such as sulfur or copper-based sprays.', 'fertilizer': 'Apply balanced fertilizers containing nitrogen, phosphorus, and potassium.'},
    1: {'label': 'Apple_Black Rot', 'remedy': 'Remove infected fruits and branches, apply fungicides containing captan or thiophanate-methyl.', 'fertilizer': 'Use balanced fertilizers with extra potassium for better fruit quality.'},
    2: {'label': 'Bacterial Spot_Pepper', 'remedy': 'Remove infected plants, avoid overhead watering, apply copper-based fungicides.', 'fertilizer': 'Apply nitrogen-rich fertilizers to boost plant growth.'},
    3: {'label': 'Bacterial Spot_peach', 'remedy': 'Prune infected branches, apply copper-based fungicides during dormant season.', 'fertilizer': 'Apply fertilizers with a higher ratio of nitrogen to promote tree vigor.'},
    4: {'label': 'Bacterial Spot_tmt', 'remedy': 'Remove infected leaves, avoid overhead watering, apply copper-based fungicides.', 'fertilizer': 'Apply balanced fertilizers with extra calcium to improve fruit quality.'},
    5: {'label': 'Black Rot_grape', 'remedy': 'Remove infected fruits and leaves, apply fungicides containing captan or copper-based sprays.', 'fertilizer': 'Use balanced fertilizers with extra potassium and magnesium for grapevines.'},
    6: {'label': 'Cedar Apple Rust', 'remedy': 'Prune infected branches, apply fungicides containing mancozeb or myclobutanil.', 'fertilizer': 'Apply fertilizers with a balanced ratio of nitrogen, phosphorus, and potassium.'},
    7: {'label': 'Cercospora Leaf Spot_corn', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or azoxystrobin.', 'fertilizer': 'Apply nitrogen-rich fertilizers to promote corn growth.'},
    8: {'label': 'Common Rust_corn', 'remedy': 'Remove infected leaves, apply fungicides containing propiconazole or triadimefon.', 'fertilizer': 'Use balanced fertilizers with extra nitrogen for improved corn yield.'},
    9: {'label': 'Early Blight_potato', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Apply fertilizers with a balanced ratio of nitrogen, phosphorus, and potassium for healthy potato growth.'},
    10: {'label': 'Early Blight_tmt', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Use balanced fertilizers with extra potassium for better tomato yield.'},
    11: {'label': 'Esca (Black Measles)_grape', 'remedy': 'Prune infected branches, apply fungicides containing fosetyl-al or thiophanate-methyl.', 'fertilizer': 'Apply fertilizers with extra potassium and magnesium to improve grapevine health.'},
    12: {'label': 'Healthy_Apple', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    13: {'label': 'Healthy_Pepper', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    14: {'label': 'Healthy_cherry', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    15: {'label': 'Healthy_corn', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    16: {'label': 'Healthy_grape', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    17: {'label': 'Healthy_peach', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    18: {'label': 'Healthy_potato', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    19: {'label': 'Healthy_strb', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    20: {'label': 'Healthy_tmt', 'remedy': 'No remedy needed', 'fertilizer': 'Standard fertilizer'},
    21: {'label': 'Late Blight_potato', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Apply balanced fertilizers with extra potassium for healthy potato growth.'},
    22: {'label': 'Late Blight_tmt', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Use balanced fertilizers with extra potassium for better tomato yield.'},
    23: {'label': 'Leaf Blight_grape', 'remedy': 'Prune infected leaves, apply fungicides containing captan or mancozeb.', 'fertilizer': 'Apply balanced fertilizers with extra potassium and magnesium for grapevine health.'},
    24: {'label': 'Leaf Scorch_strb', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Use balanced fertilizers with extra potassium and phosphorus for strawberry growth.'},
    25: {'label': 'Northern Leaf Blight_corn', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or azoxystrobin.', 'fertilizer': 'Apply nitrogen-rich fertilizers to promote corn growth.'},
    26: {'label': 'Powdery Mildew_cherry', 'remedy': 'Remove infected leaves, apply fungicides containing sulfur or potassium bicarbonate.', 'fertilizer': 'Use balanced fertilizers with extra potassium for better cherry yield.'},
    27: {'label': 'Septoria Leaf Spot_tmt', 'remedy': 'Remove infected leaves, apply fungicides containing chlorothalonil or copper-based sprays.', 'fertilizer': 'Apply balanced fertilizers with extra potassium for better tomato yield.'},
    28: {'label': 'Yellow Leaf Curl Virus_tmt', 'remedy': 'Remove infected plants, control whiteflies with insecticides or traps.', 'fertilizer': 'Use balanced fertilizers with extra potassium for better tomato yield.'}
}


def main():
    st.set_page_config(page_title="Plant Disease Detection", page_icon=":herb:")

    # Center the title
    st.markdown("<h1 style='text-align: center;'>Plant Disease Detection</h1>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center;'>AI engine to assist farmers</h3>", unsafe_allow_html=True)

    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png", "webp"])

    if uploaded_file is not None:
        st.image(uploaded_file, caption='Uploaded Image.', use_column_width=True)

        temp_file = tempfile.NamedTemporaryFile(delete=False)
        temp_file.write(uploaded_file.read())
        temp_file.close()

        client = Client("SurajJha21/plantdiseasemodel2")

        result = client.predict(temp_file.name, api_name="/predict")
        predicted_label_info = class_to_label.get(result, {'label': 'Unknown', 'remedy': 'No remedy found', 'fertilizer': 'No fertilizer found'})
        predicted_label = predicted_label_info['label']
        remedy = predicted_label_info['remedy']
        fertilizer = predicted_label_info['fertilizer']
        
        # Beautify the display of the prediction result
        st.subheader("Prediction Result")
        st.write("Predicted Disease:")
        st.success(predicted_label)
        
        st.subheader("Remedy:")
        st.write(remedy)
        
        st.subheader("Fertilizer Suggestion:")
        st.write(fertilizer)

        os.unlink(temp_file.name)

if __name__ == "__main__":
    main()
