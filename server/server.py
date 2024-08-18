from flask import Flask, Response, jsonify
import cv2 as cv
import mediapipe as mp
import numpy as np
from flask_cors import CORS

app = Flask(__name__)



mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence = 0.5, min_tracking_confidence = 0.5)
CORS(app)

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "This is actually so freaking cool lmao",
        'people': ["yang", "name", "another name"]
    })

def generate_frames():
    camera = cv.VideoCapture(0)

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # recorloring to RGB
            image = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
            image.flags.writeable = False
            
            # make the detection
            results = pose.process(image)
            
            # recolroing back into the normal amazing spectacular BGR
            image.flags.writeable = True
            image = cv.cvtColor(image, cv.COLOR_RGB2BGR)
            
            
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            
            ret, buffer = cv.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True, port=8080)