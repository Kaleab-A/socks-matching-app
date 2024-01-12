from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from tensorflow.keras.models import load_model
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
import datetime

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/predict", methods=["POST"])
def predict():
    # Loading image
    if "image" not in request.files:
        print(request.files)
        return jsonify({"result": "image not found"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"result": "image not selected"}), 400

    image.save(f"uploads/{image.filename}")

    # Upload image to firebase storage
    bucket = storage.bucket()
    blob = bucket.blob(image.filename)
    blob.upload_from_filename(f"uploads/{image.filename}")

    url = blob.public_url
    print(url)

    # Add image to firebase database
    ref = db.reference("socks")
    ref.push(
        {
            "url": url,
            "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "type": "searching",
        }
    )

    # TODO: Setup dataset of image (database)

    # TODO: Preprocess images functions
    # TODO: Try making prediction with 2 images

    return jsonify({"result": "success"}), 200


def downloadModel():
    res = requests.get(
        "https://firebasestorage.googleapis.com/v0/b/socks-matching-dev.appspot.com/o/numLayers-2_numUnits-256_dropout-0.5_optimizer-adam_activation-relu_lr-0.0011704313741.h5?alt=media&token=97200f8b-d1a4-4e87-bfec-2bc024da8fa0"
    )

    with open("model.h5", "wb") as f:
        f.write(res.content)

    return load_model("model.h5")


def connectToFirebase():
    cred = credentials.Certificate("./env.json")
    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": "https://socks-matching-dev-default-rtdb.firebaseio.com/",
            "storageBucket": "socks-matching-dev.appspot.com",
        },
    )


def getDataset():
    ref = db.reference("lost-socks")
    return ref.get()


if __name__ == "__main__":
    connectToFirebase()
    app.run(debug=True)
