import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
import os
import datetime
from tqdm import tqdm


# TODO: Setup dataset of image (database)
def connectToFirebase():
    cred = credentials.Certificate("./env.json")
    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": "https://socks-matching-dev-default-rtdb.firebaseio.com/",
            "storageBucket": "socks-matching-dev.appspot.com",
        },
    )


def uploadImageToFirebase(imgPath):
    # Upload image to firebase storage
    uploadPath = imgPath.split("/")[-1]
    uploadPath = "lost-socks/" + uploadPath

    bucket = storage.bucket()
    blob = bucket.blob(uploadPath)
    blob.upload_from_filename(imgPath)

    url = blob.public_url

    return url


def uplodAllPreprocessedImages(path):
    # Check if path is valid
    if not os.path.isdir(path):
        print("Invalid path")
        return

    for imgFolder in tqdm(os.listdir(path)):
        folderPath = os.path.join(path, imgFolder)

        imagePublicURLs = []
        for img in os.listdir(folderPath):
            imgPath = os.path.join(folderPath, img)

            img_public_url = uploadImageToFirebase(imgPath)

            imagePublicURLs.append(img_public_url)

        # Add image to firebase database
        ref = db.reference("lost-socks")
        ref.push(
            {
                "url": imagePublicURLs,
                "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "type": "lost",
            }
        )


if __name__ == "__main__":
    connectToFirebase()
    uplodAllPreprocessedImages(
        "../../socks-matching/1Data-Collection/Manual/Socks_Organized/centered"
    )
